<template>
  <svg 
    id="map_container"
    :width="map.width"
    :height="map.height"
    :viewBox="[0, 0, map.width, map.height]"
  >


      
  </svg>
</template>

 <!-- As a basis for the map component we took: https://observablehq.com/@ch-bu/map-of-germany-unemployment-rate -->
<script>
import * as d3 from "d3";
import * as topojson from "topojson-client";
import germany from "./germany.json";
// import ar from "./arbeitslosigkeit2.csv"

// import FileAttachment from "d3";

var color = d3.scaleQuantize([0, 7.5], d3.schemeBlues[6]);
var path = d3.geoPath().projection(projection2);
var projection = d3.geoConicConformal()
.scale(3500)
.center([14.02, 51.02]);
var projection2 = d3.geoAlbers()
.scale(1000)
.center([10.02, 51.12]);
// var data = d3.csv("./arbeitslosigkeit2.csv");

export default {
  name: "vue-map",
  components: { },  
  data() {
    return {
      map: {
        width: 600, // outer width, in pixels
        height: 300, // outer height, in pixels
      },
    }
  },  
  async mounted() {
    this.renderChart();
  },

  methods: {
    renderChart() {
      // d3.select("#fill")
      //   .selectAll("path")
      //   .data(topojson.feature(germany, germany.objects.states).features)
      //   .join("path")
      //   .attr('fill', d => color(data.get(d.properties.name)))
      //   .attr('fill-opacity', 0.7)
      //   .attr('d', path);
      // d3.select("#stroke")
      //   .data(topojson.mesh(germany, germany.objects.states, (a, b) => a !== b))
      //   .attr("fill", "none")
      //   .attr("stroke", "#fff")
      //   .attr("stroke-linejoin", "round")
      // d3.select("#map_container")
      //   .append('g')
      //   .selectAll('path')
      //   .data(topojson.feature(germany, germany.objects.states).features)
      //   .join('path')
      //     .attr('fill', d => color(data.get(d.properties.name)))
      //     .attr('fill-opacity', 0.7)
      //     .attr('d', path);

      d3.select("#map_container")
        .append("path")
        .datum(topojson.mesh(germany, germany.objects.states, (a, b) => a !== b))
          .attr("fill", "none")
          .attr("stroke", "#000")
          .attr("stroke-linejoin", "round")   
          .attr("d", path)
          .attr("transform", "translate(0, -200)");
      ;

     
        // .append("circle")
        // .attr("cx", 200)
        // .attr("cy", 50)
        // .attr("r", 20)
        // .attr("fill", "lightgreen")
    
    },
  },
}
</script>

<style>
path {
  color: #000;
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
  color: #000;
}
</style>