<template>
  <svg
    id="incidence_container"
    :width="map.width"
    :height="map.height"
    :viewBox="[0, 0, map.width, map.height]"
  ></svg>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson-client";
import germany from "./germany.json";

import { useCovidCasesStore } from "@/stores/covidCases";
import { germanyKey, regions } from "@/data/dataKeys";
import { useDateStore } from "@/stores/date";
import { useCurrentRegionStore } from "@/stores/currentRegion";
import { useMeasuresStore } from "@/stores/politicalMeasures";

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
    const covidCasesStore = useCovidCasesStore();
    const dateStore = useDateStore();
    const currentRegion = useCurrentRegionStore();
    const politicalMeasures = useMeasuresStore();
    return {
      covidCasesStore,
      regions: regions,
      dateStore,
      politicalMeasures,
      currentRegion: currentRegion,
      map: {
        width: 600, // outer width, in pixels
        height: 300, // outer height, in pixels
      },
    };
  },
  async mounted() {
    await this.covidCasesStore.initValues();
    await this.politicalMeasures.initValues();

    this.plotMapData();
    this.renderMap();

    if (this.currentRegion.currentRegionName != "Germany") {
      d3.select("#" + this.currentRegion.currentRegionName)
        .attr("stroke-width", "2")
        .attr("stroke", "black");
    }
  },
  computed: {
    retrieveMaxIncidence() {
      var maxIncidences = [];

      for (var state in this.covidCasesStore.cases) {
        if (state != germanyKey) {
          var stateIncidence = [];

          stateIncidence.push(
            ...this.covidCasesStore.cases[state].map((value) => {
              return value.value;
            })
          );

          maxIncidences.push(Math.max(...stateIncidence));
        }
      }

      return Math.max(...maxIncidences);
    },
    dataIncidence() {
      // load current incidence value per state per day (currentDay)
      var data = {};
      console.log(this.covidCasesStore.cases);
      for (var state in this.covidCasesStore.cases) {
        if (state != germanyKey) {

          const v = this.covidCasesStore.cases[state]
            .filter(
              (element) =>
                element.day == this.dateStore.currentDate ||
                element.day == new Date(this.dateStore.currentDate).getTime()
            )
            .map((value) => {
              return value.value;
            });
          data[state] = v;
        }
      }
      console.log(data);
      return data;
    },
  },
  watch: {
    dataIncidence: function () {
      if (firstLoad) {
        firstLoad = false;
      } else {
        console.log("jetzt");
        d3.select("#incidence_container").selectAll("g").remove();

        this.plotMapData();

        if (this.currentRegion.currentRegionName != "Germany") {
          d3.select("#" + this.currentRegion.currentRegionName)
            .attr("stroke-width", "2")
            .attr("stroke", "black");
        }
      }
    },
  },
  methods: {
    renderMap() {
      d3.select("#incidence_container")
        .append("path")
        .datum(mapDataGermany)
        .attr("fill", "none")
        .attr("stroke", "#999999")
        .attr("stroke-linejoin", "round")
        .attr("d", d3.geoPath().projection(projection1))
        .attr("transform", "translate(-80, 0)");

      // create legend for map
      var legendColor = d3.select("#incidence_container");
      var missingValueColor = d3.select("#incidence_container");
      var myColor = d3
        .scaleLinear()
        .domain([0, this.retrieveMaxIncidence])
        .range(["white", "orange"], 1);
      var colorKeys = [
        "Data not available",
        "Ongoing Lockdown*",
        "",
        "0",
        "250",
        "750",
        "1250",
        "1750",
        "2250",
        "2750",
      ];
      var keys = ["0", "250", "750", "1250", "1750", "2250", "2750"];
      var rectSize = 20;

      // rects to display color values in legend
      legendColor
        .selectAll("legendRect")
        .data(keys)
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
        .data(colorKeys)
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
      const lockdownData = this.politicalMeasures.lockdown[state].filter(
        (el) => el.day == this.dateStore.currentDate
      );
      if (lockdownData.length == 0) {
        return false;
      } else if (lockdownData[0].value > 0) {
        return true;
      } else {
        return false;
      }
    },

    plotMapData() {
      var myColor = d3
        .scaleLinear()
        .domain([0, this.retrieveMaxIncidence])
        .range(["white", "orange"], 250);

      d3.select("#incidence_container")
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

      d3.select("#incidence_container")
        .append("g")
        .selectAll("path")
        .data(mapDataGermany.features)
        .join("path")
        .style("fill", (d) =>
          this.isLockdown(d.properties.nameEN)
            ? "url(#diagonalHatch)"
            : "transparent"
        )
        .attr("fill-opacity", 1)
        .attr("d", d3.geoPath().projection(projection1))
        .attr("transform", "translate(-80, 0)");

      d3.select("#incidence_container")
        .append("g")
        .selectAll("path")
        .data(mapDataGermany.features)
        .join("path")
        .attr("fill", (d) => myColor(this.dataIncidence[d.properties.nameEN]))

        // filling for logarithmic scale
        .attr("fill-opacity", 1)
        .attr("d", d3.geoPath().projection(projection1))
        .attr("transform", "translate(-80, 0)")
        .attr("id", (d) => d.properties.name)
        // visually display clicked region
        .on(
          "click",
          (function (regionStore) {
            return function () {
              const lastClickedRegion = regionStore.currentRegionName;

              // reset
              if (
                lastClickedRegion != "Germany" ||
                lastClickedRegion != this.id
              ) {
                d3.select("#" + lastClickedRegion)
                  .attr("stroke", "#999999")
                  .attr("stroke-width", "0.5");
              }

              if (lastClickedRegion != this.id) {
                d3.select("#" + this.id)
                  .attr("stroke-width", "2")
                  .attr("stroke", "#222222");

                const region_after = mapDataGermany.features.filter(
                  (feature) => feature.properties.name == this.id
                );
                regionStore.updateRegion(region_after[0].properties.nameEN);
              } else {
                regionStore.updateRegion("germany");
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
