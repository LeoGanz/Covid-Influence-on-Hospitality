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

import { useCovidCasesStore } from "@/stores/covidCases";
import { germanyKey, regions } from "@/data/dataKeys";

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

    const covidCasesStore1 = useCovidCasesStore();
    var currentDay = "2022-03-28"; // TODO: this date should be adjusted according to the current slider position.
    
    return {
      covidCasesStore1: covidCasesStore1,
      currentDay: currentDay,
      regions: regions,
      map: {
        width: 600, // outer width, in pixels
        height: 300, // outer height, in pixels
      },
    }
  }, 
  async mounted() {
    await this.covidCasesStore1.initValues();

    this.plotMapData();
    this.renderMap();
  },
  computed: {
    // function to detect max value of incidence over time, as a reference value
    // TODO: determine reference values
    retrieveMaxIncidence() {
      var maxIncidences = [];

      for (var state in this.covidCasesStore1.cases) {
        if (state != germanyKey) {

          var stateIncidence = [];

          stateIncidence.push(
            ...this.covidCasesStore1.cases[state].map((value) => {
              return value.value;
            }));
        
          maxIncidences.push(Math.max(...stateIncidence));

        }
      };

      return Math.max(...maxIncidences);

    },
    dataIncidence() {
      // load current incidence value per state per day (currentDay)
      var data = {};

        for (var state in this.covidCasesStore1.cases) {
          if (state != germanyKey) {
            const v = this.covidCasesStore1.cases[state].filter(element => element.day == new Date(this.currentDay).getTime()).map((value) => {
              return value.value;
            });
            data[state] = v;
          }
        }
        return data;
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
          .attr("transform", "translate(-50, 0)")
    },

    plotMapData() {
      // chose filling
      var myColor = d3.scaleQuantize([0, this.retrieveMaxIncidence], d3.schemePurples[6]);
    
      d3.select("#map_container")
      .append("g")
      .selectAll("path")
      .data(mapDataGermany.features)
      .join("path")
      .attr("fill", d => myColor(this.dataIncidence[d.properties.nameEN]))   
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