<template>
  <svg
    id="hospitality_container"
    :width="map.width"
    :height="map.height"
    :viewBox="[0, 0, map.width, map.height]"
  ></svg>
  <svg id="legend_hospitality" height="300" width="450" color="green"></svg>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson-client";
import germany from "./germany.json";

import { useHospitalityStore } from "@/stores/hospitality";
import { useMeasuresStore } from "@/stores/politicalMeasures";
import { regions } from "@/data/dataKeys";
import { useDateStore } from "@/stores/date";
import { useCurrentRegionStore } from "@/stores/currentRegion";

// loading map data based on https://observablehq.com/@ch-bu/map-of-germany-unemployment-rate
const mapDataGermany = topojson.feature(germany, germany.objects.states);
const mesh = topojson.mesh(germany, germany.objects.states, (a, b) => a !== b);

// project and scale map
var projection1 = d3.geoConicConformal().fitSize([650, 325], mesh);
var trouble = true;


export default {
  name: "vue-map",
  components: {},
  data() {
    const hospitalityStore = useHospitalityStore();
    const politicalMeasures = useMeasuresStore();
    const dateStore = useDateStore();
    const currentRegion = useCurrentRegionStore();
    return {
      hospitalityStore,
      politicalMeasures,
      dateStore,
      regions: regions,
      currentRegion: currentRegion,
      map: {
        width: 600, // outer width, in pixels
        height: 300, // outer height, in pixels
      },
    };
  },
  async mounted() {
    await this.hospitalityStore.initValues();
    await this.politicalMeasures.initValues();

    console.log(this.currentRegion.currentRegionName)


    this.plotMapData();
    this.renderMap();


    if (this.currentRegion.currentRegionName != "Germany") {

                d3.select("#" + this.currentRegion.currentRegionName )
                  .attr("stroke-width", "3")
                  .attr("stroke", "black");
              }


  },
  computed: {
    dataHospitality() {
      return this.hospitalityStore.getRegionsByMonth(
        this.dateStore.currentMonth
      ).real.original;
    },
    maxValue(){
    }
  },
  watch: {
    dataHospitality: function () {

      if (trouble) {
        trouble = false
      } else {
        d3.select("#hospitality_container").selectAll("g").remove();

        this.plotMapData();

        if (this.currentRegion.currentRegionName != "Germany") {
          d3.select("#" + this.currentRegion.currentRegionName )
            .attr("stroke-width", "3")
            .attr("stroke", "black");
          }
      }

    },
  },
  methods: {
    renderMap() {
      d3.select("#hospitality_container")
        .append("path")
        .datum(mapDataGermany)
        .attr("fill", "none")
        .attr("stroke", "#101010")
        .attr("stroke-linejoin", "round")
        .attr("d", d3.geoPath().projection(projection1))
        .attr("transform", "translate(-50, 0)")
        .attr("id", "test");

      // create legend for map
      var legendColor = d3.select("#hospitality_container");
      var missingValueColor = d3.select("#hospitality_container");
      var myColor = d3
        .scaleLinear()
        .domain([5, 110])
        .range(["white", "orange"], 8);
      var keys = [0, 25, 50, 75, 100, 125, 150, 175];
      var rectSize = 20;

      // rects to display color values in legend
      legendColor
        .selectAll("legendRect")
        .data(keys)
        .enter()
        .append("rect")
        .attr("x", 50)
        .attr("y", function (d, i) {
          return 100 + i * rectSize;
        })
        .attr("width", rectSize)
        .attr("height", rectSize)
        .style("fill", function (d) {
          return myColor(d);
        })
        .attr("transform", "translate(400, -100)");

      // text for each color
      legendColor
        .selectAll("legendLabels")
        .data(keys)
        .enter()
        .append("text")
        .attr("x", 50 + rectSize * 1.2)
        .attr("y", function (d, i) {
          return 100 + i * rectSize + rectSize / 2;
        })
        .style("fill", "black")
        .text(function (d) {
          return d;
        })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .attr("transform", "translate(400, -100)");

      // customized rect for not available data
      missingValueColor.selectAll("legendValueMissing");
      legendColor
        .selectAll("legendRect")
        .data(keys)
        .enter()
        .append("rect")
        .attr("x", 50)
        .attr("y", 100)
        .attr("width", rectSize)
        .attr("height", rectSize)
        .style("fill", "#686464")
        .attr("transform", "translate(400, -130)");

      // customized text for not available data
      missingValueColor.selectAll("legendValueMissing");
      legendColor
        .selectAll("legendLabels")
        .data(keys)
        .enter()
        .append("text")
        .attr("x", 50 + rectSize * 1.2)
        .attr("y", 110)
        .style("fill", "black")
        .text("Data not available")
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .attr("transform", "translate(400, -130)");
    },

    plotMapData() {
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

      d3.select("#hospitality_container")
        .append("g")
        // try to add hatch
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
        .attr("id", (d) => d.properties.name)
        //

        // visually display clicked region
        .on(
          "click",
          (function (regionStore) {
            return function () {

              const lastClickedRegion = regionStore.currentRegionName;

              // reset
              if (lastClickedRegion != "Germany" || lastClickedRegion != this.id) {              
                d3.select("#" + lastClickedRegion)
                  .attr("stroke", "#101010")
                  .attr("stroke-width", "0.5");
              }

              if (lastClickedRegion != this.id) {
                d3.select("#" + this.id)
                  .attr("stroke-width", "3")
                  .attr("stroke", "black");

                const region_after = mapDataGermany.features.filter((feature) => feature.properties.name == this.id)
                regionStore.updateRegion(region_after[0].properties.nameEN)
              } else {
                regionStore.updateRegion("germany")
              }
            };
          })(this.currentRegion)
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
