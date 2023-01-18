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
import { useDateStore } from "@/stores/selectedDate";

// loading map data based on https://observablehq.com/@ch-bu/map-of-germany-unemployment-rate
const mapDataGermany = topojson.feature(germany, germany.objects.states)
const mesh = topojson.mesh(germany, germany.objects.states, (a, b) => a !== b);

// project and scale map
var projection1 = d3.geoConicConformal()
.fitSize([650, 325], mesh);

export default {
  name: "vue-map",
  components: { },  
  data() {

    const covidCasesStore1 = useCovidCasesStore();
    var currentDay = "2020-01-07"; // TODO: this date should be adjusted according to the current slider position.
    
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

      // retrieve current time stamp
      const year = new Date(useDateStore().count * 1).getFullYear();
      var month = new Date(useDateStore().count * 1).getMonth() + 1;
      var day = new Date(useDateStore().count * 1).toLocaleDateString("en-US", {day: "numeric"});

      if (month < 10) {
        month = "0" + month;
      } else {
        month = "" + month;
      }

      if (day < 10) {
        day = "0" + day;
      } else {
        day = "" + day;
      }

      this.currentDay = "" + year + "-" + month + "-" + day;

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
  watch: {
    dataIncidence: function() {

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

     // create legend for map
    var legendColor = d3.select("#map_container")  
    var missingValueColor = d3.select("#map_container")
    var myColor =  d3.scaleLinear().domain([0, this.retrieveMaxIncidence]) 
            .range(["white", "blue"], 2);
    var keys = ["0",Math.round(this.retrieveMaxIncidence*0.25), Math.round(this.retrieveMaxIncidence*0.5), Math.round(this.retrieveMaxIncidence*0.75), Math.round(this.retrieveMaxIncidence)]
    var rectSize = 20

   // rects to display color values in legend
   legendColor.selectAll("legendRect")
    .data(keys)
    .enter()
    .append("rect")
      .attr("x", 50)
      .attr("y", function(d, i){ return 100 + i*(rectSize)})
      .attr("width", rectSize)
      .attr("height", rectSize)
      .style("fill", function(d){ return myColor(d)})
      .attr("transform", "translate(400, -100)")

    // text for each color
    legendColor.selectAll("legendLabels")
    .data(keys)
    .enter()
    .append("text")
    .attr("x", 50 + rectSize*1.2)
    .attr("y", function(d,i){ return 100 + i*(rectSize) + (rectSize/2)})
    .style("fill", "black")
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .attr("transform", "translate(400, -100)")

    // customized rect for not available data
    missingValueColor.selectAll("legendValueMissing")
    legendColor.selectAll("legendRect")
    .data(keys)
    .enter()
    .append("rect")
      .attr("x", 50)
      .attr("y", 100)
      .attr("width", rectSize)
      .attr("height", rectSize)
      .style("fill", "#686464")
      .attr("transform", "translate(400, -130)")

      // customized text for not available data
      missingValueColor.selectAll("legendValueMissing")
      legendColor.selectAll("legendLabels")
    .data(keys)
    .enter()
    .append("text")
    .attr("x", 50 + rectSize*1.2)
    .attr("y", 110) 
    .style("fill", "black")
    .text("Data not available")
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")
    .attr("transform", "translate(400, -130)")
    },

    plotMapData() {
      // continous filling
      //var myColor = d3.scaleQuantize([0, this.retrieveMaxIncidence], d3.schemePurples[6]);

      // log scale filling
      // var myColor = d3.scaleLinear().domain([1,Math.log(this.retrieveMaxIncidence)])
      //   .range(["white", "blue"]);

      // linear filling incremented in steps of 250
      var myColor =  d3.scaleLinear().domain([0, this.retrieveMaxIncidence]) 
        .range(["white", "blue"], 250);
    
      d3.select("#map_container")
      .append("g")
      .selectAll("path")
      .data(mapDataGermany.features)
      .join("path")
      .attr("fill", d => myColor(this.dataIncidence[d.properties.nameEN]))

      // filling for logarithmic scale
      //.attr("fill", d => myColor(Math.log(this.dataIncidence[d.properties.nameEN])))   
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