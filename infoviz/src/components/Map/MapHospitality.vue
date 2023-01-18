<template>
  <svg
    id="map_container"
    :width="map.width"
    :height="map.height"
    :viewBox="[0, 0, map.width, map.height]"
    v-bind:dataHospitality="dataHospitality"
  ></svg>
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
const mapDataGermany = topojson.feature(germany, germany.objects.states);
const mesh = topojson.mesh(germany, germany.objects.states, (a, b) => a !== b);

// project and scale map
var projection1 = d3.geoConicConformal().fitSize([650, 325], mesh);

var lastClickedRegion = "";

export default {
  name: "vue-map",
  components: {},
  data() {
    const hospitalityStore = useHospitalityStore();
    const politicalMeasures = useMeasuresStore();
    const dateStore = useDateStore();

    return {
      hospitalityStore,
      politicalMeasures,
      dateStore,
      regions: regions,
      lastClickedRegion: lastClickedRegion,
      map: {
        width: 600, // outer width, in pixels
        height: 300, // outer height, in pixels
      },
    };
  },
  async mounted() {
    await this.hospitalityStore.initValues();
    await this.politicalMeasures.initValues();

    this.plotMapData();
    this.renderMap();
  },
  computed: {
    dataHospitality() {
      return this.hospitalityStore.getRegionsByMonth(
        this.dateStore.currentMonth
      ).real.original;
    },
  },
  watch: {
    dataHospitality: function () {
      d3.select("#map_container").selectAll("g").remove();

      this.plotMapData();
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
        .attr("id", "test");
    },
    plotMapData(lastClickedRegion) {
      // chose filling
      // var myColor = d3.scaleQuantize([0, 100], d3.schemeOranges[6]);

      // linear filling incremented in steps of 10
      var myColor = d3
        .scaleLinear()
        .domain([0, 100])
        .range(["white", "orange"], 10);

      // <!-- hatch for lockdowns based on https://jsfiddle.net/sqrz3/    -->
      // <defs>
      //   <pattern id="stripe" patternUnits="userSpaceOnUse" width="40" height="20">
      //     <line x1="10" y1="0" x2="30" y2="20" />
      //     <line x1="-10" y1="0" x2="10" y2="20" />
      //     <line x1="30" y1="0" x2="50" y2="20" />
      //   </pattern>
      //   <mask id="mask">
      //     <rect height="500" width="500" style="fill: url(#stripe)" />
      //   </mask>
      // </defs>

      d3.select("#map_container")
        .append("g")
        // .attr("id", "ha");
        // d3.select("#ha")
        // .append("defs");
        // d3.select("#ha")
        // .selectAll("defs")
        // .append("pattern")
        // .attr({"id": "stripe", patternUnits: "userSpaceOnUse", width:"40", height:"20"})
        // .append("rect")
        // .attr({x1:"10", y1:"0", x2:"30", y2:"20"})
        // .append("rect")
        // .attr({x1:"-10", y1:"0", x2:"10", y2:"20"})
        // .append("rect")
        // .attr({x1:"30", y1:"0", x2:"50", y2:"20"})
        .selectAll("path")
        .data(mapDataGermany.features)
        .join("path")
        .attr("fill", (d) =>
          isNaN(this.dataHospitality[d.properties.nameEN])
            ? "#686464"
            : myColor(this.dataHospitality[d.properties.nameEN])
        )
        // .attr("fill", "url(#stripe)")
        .attr("fill-opacity", 1)
        .attr("d", d3.geoPath().projection(projection1))
        .attr("transform", "translate(-50, 0)")
        .attr("id", (d) => d.properties.nameEN)
        //

        // visually display clicked region
        .on(
          "click",
          (function (lastClickedRegion) {
            return function () {
              // reset
              if (lastClickedRegion != "" || lastClickedRegion == this.id) {
                d3.select("#" + lastClickedRegion)
                  .attr("stroke", "#101010")
                  .attr("stroke-width", "0.5");
              }

              if (lastClickedRegion != this.id) {
                d3.select(this)
                  .attr("stroke-width", "3")
                  .attr("stroke", "black");

                lastClickedRegion = this.id;
              } else {
                lastClickedRegion = "";
              }
            };
          })(this.lastClickedRegion)
        );
    },
  },
};
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
