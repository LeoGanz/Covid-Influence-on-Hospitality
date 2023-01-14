<template>
  <svg 
    id="map_container"
    :width="map.width"
    :height="map.height"
    :viewBox="[0, 0, map.width, map.height]"
  >      
  </svg>
  <div v-if="covidCasesStore1.loading">Loading covid data...</div>
  <div v-else v-for="val in this.data">
    <p>Values: {{ val }}</p>
  </div>
</template>

 <!-- As a basis for the map component we took: https://observablehq.com/@ch-bu/map-of-germany-unemployment-rate -->
<script>
import * as d3 from "d3";
import * as topojson from "topojson-client";
import germany from "./germany.json";

import { useCovidCasesStore } from "@/stores/covidCases";
import { useHospitalityStore } from "@/stores/hospitality";
import { germanyKey, regions } from "@/data/dataKeys";


const d_germany = topojson.feature(germany, germany.objects.states)
const mesh = topojson.mesh(germany, germany.objects.states, (a, b) => a !== b);

var projection1 = d3.geoConicConformal()
   .fitSize([800, 500], mesh);



// var data = new Map(this.covidCasesStore)



// import { color } from "d3";

export default {
  name: "vue-map",
  components: { },  
  data() {

    const covidCasesStore1 = useCovidCasesStore();
    const hospitalityStore1 = useHospitalityStore();
    var currentDay = "2021-06-15"; // TODO: this date should be adjusted according to the current slider position.
    
    return {
      covidCasesStore1: covidCasesStore1,
      hospitalityStore1: hospitalityStore1,
      currentDay: currentDay,
      regions: regions,
      map: {
        width: 600, // outer width, in pixels
        height: 300, // outer height, in pixels
      },
    }
  }, 
  // setup() {
  //   const covidCasesStore = useCovidCasesStore();
  //   const hospitalityStore = useHospitalityStore();
  //   var currentDay = "2020-12-11"; // TODO: this date should be adjusted according to the current slider position.

  //   return { covidCasesStore, hospitalityStore };
  // }, 
  async mounted() {
    await this.covidCasesStore1.initValues();
    await this.hospitalityStore1.initValues();
    this.plotData();
    this.renderChart();
    console.log(d_germany.features);
  },
  computed: {
    data() {
      var data = {};
        for (var state in this.covidCasesStore1.cases) {
          if (state != germanyKey) {
            const v = this.covidCasesStore1.cases[state].filter(element => element.day == this.currentDay).map((value) => {
              console.log(value.value);
              return value.value;
            });
            data[state] = v;

            // data.push(
            //   ... this.covidCasesStore1.cases[state].filter(element => element.day == this.currentDay).map((value) => {
            //     value.day = new Date(value.day).getTime();
            //     value.category = this.regions.find(
            //       (region) => region.key == state
            //     ).covid;
            //     return value;
            //   })
            // );
          }
        }
        return data;
    },
  },
  methods: {
    renderChart() {
      d3.select("#map_container")
        .append("path")
        .datum(d_germany)
          .attr("fill", "none")
          .attr("stroke", "#fff")
          .attr("stroke-linejoin", "round")   
          .attr("d", d3.geoPath().projection(projection1))
          .attr("transform", "translate(-100, -85)");
    },

    plotData() {

      // var color = d3.scaleQuantize([0, 7.5], d3.schemeBlues[6])

      var myColor = d3.scaleLinear().domain([1,16])  

      console.log(this.data)

      const a = {
        'bavaria': "#008080",
        'berlin':"#ffffff"
      }


      d3.select("#map_container")
      .append("g")
      .selectAll("path")
      .data(d_germany.features)
      .join("path")
      .attr("fill", d => a[d.properties.nameEN])
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