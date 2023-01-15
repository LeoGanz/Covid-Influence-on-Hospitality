<template>
  <svg 
    id="map_container"
    :width="map.width"
    :height="map.height"
    :viewBox="[0, 0, map.width, map.height]"
  >      
  </svg>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson-client";
import germany from "./germany.json";

import { useHospitalityStore } from "@/stores/hospitality";
import { germanyKey, regions } from "@/data/dataKeys";

// loading map data based on https://observablehq.com/@ch-bu/map-of-germany-unemployment-rate
const mapDataGermany = topojson.feature(germany, germany.objects.states)
const mesh = topojson.mesh(germany, germany.objects.states, (a, b) => a !== b);

// project and scale map
var projection1 = d3.geoConicConformal()
   .fitSize([800, 500], mesh);

export default {
  name: "vue-map",
  components: { },  
  data() {

    const hospitalityStore1 = useHospitalityStore();
    var currentMonth = "2022-03"; // TODO: this date should be adjusted according to the current slider position.
    
    return {
      hospitalityStore1: hospitalityStore1,
      currentMonth: currentMonth,
      regions: regions,
      map: {
        width: 600, // outer width, in pixels
        height: 300, // outer height, in pixels
      },
    }
  }, 
  async mounted() {
    await this.hospitalityStore1.initValues();

    this.plotMapData();
    this.renderMap();

  },
  computed: {

    dataHospitality() {
      return this.hospitalityStore1.getRegionsByMonth(this.currentMonth).real.original;
    },
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
          .attr("transform", "translate(-100, -85)");
    },

    plotMapData() {
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
      .attr("transform", "translate(-100, -85)");
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