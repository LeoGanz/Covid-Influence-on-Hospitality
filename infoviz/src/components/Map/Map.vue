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

const d_germany = topojson.feature(germany, germany.objects.states)
const mesh = topojson.mesh(germany, germany.objects.states, (a, b) => a !== b);

var color = d3.scaleQuantize([0, 7.5], d3.schemeBlues[6]);
var path = d3.geoPath().projection(projection2);
var projection1 = d3.geoConicConformal()
.fitSize([800, 500], mesh);

var projection2 = d3.geoAlbers()
.scale(1000)
.center([10.02, 51.12])
.fitSize([500, 200], mesh);
// var data = d3.csv("./arbeitslosigkeit2.csv");
var width=600;
var height=300;
var projection = d3.geoIdentity().reflectY(true).fitExtent([[width * 0.3, height * 0.1], [width * 1.3, height * 0.9]], germany);

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

      d3.select("#map_container")
        .append("path")
        .datum(d_germany)
          .attr("fill", "none")
          .attr("stroke", "#000")
          .attr("stroke-linejoin", "round")   
          .attr("d", d3.geoPath().projection(projection1))
          .attr("transform", "translate(-100, -85)");
    
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