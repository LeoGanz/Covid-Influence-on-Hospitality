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
var firstLoad = true;

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

    this.plotMapData();
    this.renderMap();


    if (this.currentRegion.currentRegionName != "Germany") {

                d3.select("#" + this.currentRegion.currentRegionName )
                  .attr("stroke-width", "2")
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
    },
  },
  watch: {
    dataHospitality: function () {


      if (firstLoad) {
        firstLoad = false
      } else {
        d3.select("#hospitality_container").selectAll("g").remove();

        this.plotMapData();

        if (this.currentRegion.currentRegionName != "Germany") {
d3.select("#" + this.currentRegion.currentRegionName )
            .attr("stroke-width", "2")
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
        .attr("stroke", "#999999")
        .attr("stroke-linejoin", "round")
        .attr("d", d3.geoPath().projection(projection1))
        .attr("transform", "translate(-80, 0)");

      // create legend for map
      var legendColor = d3.select("#hospitality_container");
      var missingValueColor = d3.select("#hospitality_container");
      var myColor = d3
        .scaleLinear()
        .domain([0, 100])
        .range(["white", "#9684d8"], 8);
      var keys = ["Data not available", "Ongoing Lockdown*", "", 5, 35, 65, 95, 125, 155, 185];
      var colorKeys = [5, 35, 65, 95, 125, 155, 185];
      var rectSize = 20;

      // rects to display color values in legend
      legendColor
        .selectAll("legendRect")
        .data(colorKeys)
        .enter()
        .append("rect")
        .attr("x", 50)
        .attr("y", function (d, i) {
          return 230 - i * rectSize;
        })
        .attr("width", rectSize)
        .attr("height", rectSize)
        .style("fill", function (d) {
          return myColor(d);
        })
        .attr("transform", "translate(370, -100)");

      // text for each color
      legendColor
        .selectAll("legendLabels")
        .data(keys)
        .enter()
        .append("text")
        .attr("x", 50 + rectSize * 1.2)
        .attr("y", function (d, i) {
          return 250 - i * rectSize + rectSize / 2;
        })
        .style("fill", "black")
        .text(function (d) {
          return d;
        })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .attr("transform", "translate(375, -60)");

      // customized rect for not available data
      missingValueColor.selectAll("legendValueMissing");
      legendColor
        .selectAll("legendRect")
        .data(keys)
        .enter()
        .append("rect")
        .attr("x", 50)
        .attr("y", 100)
        .attr("width", 19)
        .attr("height", 19)
        .style("fill", "#DADADA")
        .style("stroke", "#999999")
        .attr("transform", "translate(371, 92)");

       // customized rect for not available data
    missingValueColor.selectAll("legendLockdown");
      legendColor
        .selectAll("legendRect")
        .data(keys)
        .enter()
        .append("rect")
        .attr("x", 50)
        .attr("y", 100)
        .attr("width", 19)
        .attr("height", 19)
        .style("fill", "url(#diagonalHatch)")
        .attr("transform", "translate(371, 68)");

    },

    isLockdown(state) {
      const lockdownData = this.politicalMeasures.lockdown[state].filter((el) => el.day == this.dateStore.currentDate);
      if (lockdownData.length == 0) {
        return false
      } else if (lockdownData[0].value > 0) {
        return true
      } else {
        return false
      }
    },

    plotMapData() {
      // chose filling
      // var myColor = d3.scaleQuantize([0, 100], d3.schemeOranges[6]);

      // linear filling incremented in steps of 10
      var myColor = d3
        .scaleLinear()
        .domain([0, 100])
        .range(["white", "#9684d8"], 10);

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
          .append("defs")
          .append("pattern")
          .attr("id", "diagonalHatch")
          .attr("patternUnits", "userSpaceOnUse")
          .attr("width", 8)
          .attr("height", 8)
          .append("path")
          .attr("d", "M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2")
          .style("stroke", "#999999")
          .style("stroke-width", 1);

        d3.select("#hospitality_container")
        .append("g")
        .selectAll("path")
        .data(mapDataGermany.features)
        .join("path")
        .style("fill", (d) => this.isLockdown(d.properties.nameEN) ? "url(#diagonalHatch)" : "transparent")
        // .attr("fill", "url(#stripe)")
        .attr("fill-opacity", 1)
        .attr("d", d3.geoPath().projection(projection1))
        .attr("transform", "translate(-80, 0)");
        
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
        // .attr("fill", "blue")
        .attr("fill", (d) =>
          isNaN(this.dataHospitality[d.properties.nameEN])
            ? "#DADADA"
            : myColor(this.dataHospitality[d.properties.nameEN])
        )
        // .style("fill", "url(#diagonalHatch)")
        // .attr("fill", "url(#stripe)")
        .attr("fill-opacity", 1)
        .attr("d", d3.geoPath().projection(projection1))
        .attr("transform", "translate(-80, 0)")
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
                  .attr("stroke", "#999999")
                  .attr("stroke-width", "0.5");
              }

              if (lastClickedRegion != this.id) {
                console.log("291")
                d3.select("#" + this.id)
                  .attr("stroke-width", "2")
                  .attr("stroke", "#222222");

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
