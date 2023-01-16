<template>
  <svg 
    id="map_container"
    :width="map.width"
    :height="map.height"
    :viewBox="[0, 0, map.width, map.height]"
    v-bind:dataHospitality="dataHospitality"
  >      
  </svg>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson-client";
import germany from "./germany.json";

import { useHospitalityStore } from "@/stores/hospitality";
import { useMeasuresStore } from "@/stores/politicalMeasures";
import { regions } from "@/data/dataKeys";
import { useDateStore } from "@/stores/selectedDate";


// loading map data based on https://observablehq.com/@ch-bu/map-of-germany-unemployment-rate
const mapDataGermany = topojson.feature(germany, germany.objects.states)
const mesh = topojson.mesh(germany, germany.objects.states, (a, b) => a !== b);

// project and scale map
var projection1 = d3.geoConicConformal()
  .fitSize([650, 325], mesh);

var lastClickedRegion = "";

export default {
  name: "vue-map",
  components: { },  
  data() {

    const hospitalityStore1 = useHospitalityStore();
    const politicalMeasures = useMeasuresStore();
    var currentMonth = "2020-01"; // Start date
 

    return {

      hospitalityStore1: hospitalityStore1,
      politicalMeasures: politicalMeasures,
      currentMonth: currentMonth,
      regions: regions,
      lastClickedRegion: lastClickedRegion,
      map: {
        width: 600, // outer width, in pixels
        height: 300, // outer height, in pixels
      },
    }
  }, 
  async mounted() {

    await this.hospitalityStore1.initValues();
    await this.politicalMeasures.initValues();

    this.plotMapData();
    this.renderMap();

  },
  computed: {
    dataHospitality() {

      const year = new Date(useDateStore().count * 1).getFullYear();
      var month = new Date(useDateStore().count * 1).getMonth() + 1;

      if (month < 10) {
        month = "0" + month;
      } else {
        month = "" + month;
      }

      this.currentMonth = "" + year + "-" + month;

      return this.hospitalityStore1.getRegionsByMonth(this.currentMonth).real.original;
    },
  },
  watch: {
    dataHospitality: function() {

      d3.select("#map_container")
        .selectAll("g")
        .remove();

      this.plotMapData();
    }
  },
  methods: {
    renderMap() {
      d3.select("#map_container")
        .append("path")
        .datum(mapDataGermany)
          .attr("fill", "none")
          .attr("stroke", "#101010")
          .attr("stroke-linejoin", "round")   
          .attr("d", d3.geoPath().projection(projection1))
          .attr("transform", "translate(-50, 0)")
          .attr("id", "test");
    },
    plotMapData(lastClickedRegion) {
      // chose filling
      var myColor = d3.scaleQuantize([0, 100], d3.schemeOranges[6]);
    
      d3.select("#map_container")
      .append("g")
      .selectAll("path")
      .data(mapDataGermany.features)
      .join("path")
      .attr("fill", d => isNaN(this.dataHospitality[d.properties.nameEN]) ? "#686464" : myColor(this.dataHospitality[d.properties.nameEN]))   
      .attr("fill-opacity", 1)
      .attr("d", d3.geoPath().projection(projection1))
      .attr("transform", "translate(-50, 0)")
      .attr("id", d => d.properties.nameEN)
      // visually display clicked region
      .on("click", function(lastClickedRegion){
            return function(){ 
              // reset
              if (lastClickedRegion != "" || lastClickedRegion == this.id) {
                d3.select("#" + lastClickedRegion)
                  .attr("stroke", "#101010")
                  .attr("stroke-width", "0.5")
              };
             
              if (lastClickedRegion != this.id) {
                d3.select(this)
                  .attr("stroke-width", "3")
                  .attr("stroke", "black");

                lastClickedRegion = this.id;
              } else {
                lastClickedRegion = "";
              }
            }   
        }(this.lastClickedRegion));
    },
  },
}
</script>

<style>
path {
  mix-blend-mode: multiply;
  width: inherit;
  height: inherit;
  max-width: 100%;
  max-height: 100%;
}
svg {
  width: inherit;
  height: inherit;
  max-width: 100%;
  max-height: 100%;
  -webkit-tap-highlight-color: transparent;
}
</style>