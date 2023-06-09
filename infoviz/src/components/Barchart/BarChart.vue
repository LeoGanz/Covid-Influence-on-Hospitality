<template>
  <div id="container" class="svg-container">
    <div v-if="!hospitalityStore.initialized">Loading...</div>
    <svg id="barchart" v-else :width="svgWidth" :height="svgHeight">
      <g>
        <rect
          v-for="item in hospitalityData"
          class="bar-positive"
          :key="item[xKey]"
          :x="xScale(0)"
          :y="yScale(item[xKey])"
          :width="0"
          :height="yScale.bandwidth()"
        ></rect>
      </g>
    </svg>
  </div>
</template>

<script>
import { scaleLinear, scaleBand } from "d3-scale";
import { max, min } from "d3-array";
import { select } from "d3-selection";
import { axisBottom, axisLeft } from "d3-axis";
import { useCurrentRegionStore } from "@/stores/currentRegion.js";
import { useHospitalityStore } from "@/stores/hospitality.js";
import { useDateStore } from "@/stores/date.js";
import { useBarChartStore } from "@/stores/barChart";

export default {
  name: "BarChart",
  setup() {
    const hospitalityStore = useHospitalityStore();
    const dateStore = useDateStore();
    const currentRegionStore = useCurrentRegionStore();
    const barChartStore = useBarChartStore();
    return {
      currentRegionStore,
      hospitalityStore,
      dateStore,
      barChartStore,
    };
  },
  async mounted() {
    await this.hospitalityStore.initValues();
    this.svgWidth = document.getElementById("container").offsetWidth * 0.75;
    this.renderHundredLine();
    this.renderLegend();
    this.renderBars();
    this.createXAxis();
    this.createYAxis();
  },
  data() {
    return {
      svgWidth: 0,
      redrawToggle: true,
      margin: {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40,
      },
      xKey: "abbreviation",
      yKey: "value",
    };
  },
  created() {
    window.addEventListener("resize", this.redraw);
  },
  beforeUnmount() {
    window.addEventListener("resize", this.redraw);
  },
  methods: {
    renderHundredLine() {
      select("#barchart")
        .append("line")
        .attr("class", "hundredline")
        .attr("x1", this.xScale(100) + 110)
        .attr("y1", 0)
        .attr("x2", this.xScale(100) + 110)
        .attr("y2", this.svgHeight)
        .style("stroke", "grey");
    },
    renderLegend() {
      var colorKeys = ["Sub Category", "Main Category"];
      var keys = ["overcategories", "undercategories"];
      var rectSize = 20;
      const state = this.currentRegionStore.currentRegion;
      // text for each color
      select("#barchart")
        .selectAll("legend")
        .data(colorKeys)
        .enter()
        .append("text")
        .attr("id", "legendtext")
        .attr("text-rendering", "optimizeLegibility")
        .attr("x", this.xScale(172) + 110 + rectSize * 1.2)
        .attr("y", function (d, i) {
          return 35 - i * rectSize + rectSize / 2;
        })
        .text(function (d) {
          return d;
        });
      //.attr("text-anchor", "left")
      //.style("alignment-baseline", "middle")
      //.attr("transform", "translate(0, -60)");

      //legendColor.selectAll("legend");

      //.attr("transform", "translate(0, 92)");

      //legendColor.selectAll("legend");
      if (state === "germany") {
        select("#barchart")
          .selectAll("legend")
          .data(keys)
          .enter()
          .append("rect")
          .attr("id", "legendcolor")
          .attr("x", this.xScale(172))
          .attr("y", 10)
          //.attr("right", 32)
          .attr("width", 19)
          .attr("height", 19)
          .style("fill", "#8E7FF5");

        select("#barchart")
          .selectAll("legend")
          .data(keys)
          .enter()
          .append("rect")
          .attr("id", "legendcolor")
          .attr("x", this.xScale(172))
          .attr("y", 32)
          .attr("width", 19)
          .attr("height", 19)
          .style("fill", "#C2BAF5");
        //.attr("transform", "translate(371, 92)");
      } else if (state !== "germany") {
        select("#barchart")
          .selectAll("legend")
          .data(keys)
          .enter()
          .append("rect")
          .attr("x", this.xScale(172))
          .attr("y", 10)
          //.attr("right", 32)
          .attr("width", 19)
          .attr("height", 19)
          .style("fill", "#a6a6a6");

        select("#barchart")
          .selectAll("legend")
          .data(keys)
          .enter()
          .append("rect")
          .attr("x", this.xScale(172))
          .attr("y", 32)
          .attr("width", 19)
          .attr("height", 19)
          .style("fill", "#d0cece");
      }
    },
    renderBars() {
      const state = this.currentRegionStore.currentRegion;
      select("#barchart")
        .selectAll("rect")
        .attr("transform", `translate(${110}, 0)`)
        .data(this.hospitalityData)
        .transition()
        .delay((d, i) => {
          return i * 10;
        })
        .duration(200)
        .attr((d) => {
          return this.xScale(d[this.yKey]);
        })
        .attr("width", (d) => {
          return this.xScale(d[this.yKey]);
        });
      if (state === "germany") {
        select("#barchart")
          .selectAll("rect")
          .attr("transform", `translate(${110}, 0)`)
          .data(this.hospitalityData)
          .attr("class", (d, i) => {
            return i === 0 ? "bar-highlight" : "bar-positive";
          });
      } else if (state !== "germany") {
        select("#barchart")
          .selectAll("rect")
          .attr("transform", `translate(${110}, 0)`)
          .data(this.hospitalityData)
          .attr("class", (d, i) => {
            return i === 0 ? "bar-grey-highlight" : "bar-grey";
          });
      }
    },
    redraw() {
      this.redrawToggle = false;
      setTimeout(() => {
        this.redrawToggle = true;
        this.svgWidth = document.getElementById("container").offsetWidth * 0.75;

        this.clearXAxis();
        this.clearYAxis();
        this.clearLegend();
        this.renderHundredLine();
        this.renderLegend();
        this.renderBars();
        this.createXAxis();
        this.createYAxis();
      }, 300);
    },
    clearXAxis() {
      select("#barchart").select(".x-axis").remove();
    },
    clearLegend() {
      select("#barchart").selectAll("#legendtext").remove();
      select("#barchart").selectAll("#legendcolor").remove();
      select("#barchart").selectAll(".hundredline").remove();
    },
    createXAxis() {
      var xAxis = axisBottom(this.xScale);
      select("#barchart")
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(110, ${this.svgHeight})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .style("font-size", "125%")
        .attr("dx", ".6em")
        .attr("dy", ".5em")
        .attr("transform", function (d) {
          return "rotate(0)";
        });
    },
    clearYAxis() {
      select("#barchart").select(".y-axis").remove();
    },
    createYAxis() {
      const yAxis = axisLeft(this.yScale);
      select("#barchart")
        .append("g")
        .attr("class", "y-axis")
        .style("font-size", "90%")
        .attr("transform", `translate(${110}, 0)`)

        .call(yAxis);
    },
  },
  computed: {
    hospitalityData() {
      const _ = this.currentRegionStore.currentRegion;
      const data = [];
      const dataJson = this.hospitalityStore.getSectorsByMonth(
        this.dateStore.currentMonth
      ).real.original;

      const dataArray = Object.entries(dataJson);

      if (this.barChartStore.displayUpperCategory) {
        dataArray.forEach((entry) => {
          //console.log(entry);
          const region = entry[0];
          const value = entry[1][0];
          const abbreviation = entry[1][1];
          if (
            region === "hospitality" ||
            region === "accommodation" ||
            region === "gastronomy"
          ) {
            if (Number.isFinite(value)) {
              data.push({ region, value, abbreviation });
            } else {
              data.push({ region, value: 0, abbreviation });
            }
          }
        });
      } else if (this.barChartStore.displayLodging) {
        //console.log("lodging display");
        dataArray.forEach((entry) => {
          //console.log(entry);
          const region = entry[0];
          const value = entry[1][0];
          const abbreviation = entry[1][1];
          if (
            region === "accommodation" ||
            region === "hotelsInnsGuesthouses" ||
            region === "holidayAccommodation" ||
            region === "campingSites" ||
            region === "otherAccommodation"
          ) {
            if (Number.isFinite(value)) {
              data.push({ region, value, abbreviation });
            } else {
              data.push({ region, value: 0, abbreviation });
            }
          }
        });
      } else if (this.barChartStore.displayGastronomy) {
        dataArray.forEach((entry) => {
          //console.log(entry);
          const region = entry[0];
          const value = entry[1][0];
          const abbreviation = entry[1][1];
          if (
            region === "gastronomy" ||
            region === "restaurantsTavernsSnackbarsCafes" ||
            region === "catereing" ||
            region === "beverages" ||
            region === "restaurantBusiness"
          ) {
            if (Number.isFinite(value)) {
              data.push({ region, value, abbreviation });
            } else {
              data.push({ region, value: 0, abbreviation });
            }
          }
        });
      }

      return data;
    },
    dataMax() {
      return max(this.hospitalityData, (d) => {
        return d[this.yKey];
      });
    },
    dataMin() {
      return min(this.hospitalityData, (d) => {
        return d[this.yKey];
      });
    },
    yScale() {
      return scaleBand()
        .rangeRound([0, this.svgHeight])
        .padding(0.22)
        .domain(
          this.hospitalityData.map((d) => {
            return d[this.xKey];
          })
        );
    },
    xScale() {
      return scaleLinear()
        .rangeRound([0, this.svgWidth - 110])
        .domain([this.dataMin > 0 ? 0 : this.dataMin, 240]);
    },
    svgHeight() {
      return 170; // define height here
    },
  },
  watch: {
    hospitalityData: function () {
      //this.d3.select('rect').selectAll('*').remove();

      let myThis = this;

      setTimeout(function () {
        //console.log("data changed");
        myThis.clearLegend();
        myThis.clearXAxis();
        myThis.clearYAxis();
        myThis.createXAxis();
        myThis.createYAxis();
        myThis.renderHundredLine();
        myThis.renderLegend();
        myThis.renderBars();
      }, 100);
    },
  },
};
</script>

<style scoped>
.my-legend {
  margin: 32px;
}

.svg-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
}
.bar-positive {
  fill: #c2baf5;
  transition: r 0.2s ease-in-out;
}

.bar-highlight {
  fill: #8e7ff5;
}

.svg-container {
  display: inline-block;
  position: relative;
  width: 120%;
  padding-bottom: 1%;
  vertical-align: top;
  overflow: hidden;
}

.x-axis path,
.x-axis line {
  fill: none;
  stroke: #686464;
  shape-rendering: crispEdges;
}

.axis-highlight {
  fill: none;
  stroke: #dc8c13;
  shape-rendering: crispEdges;
}

.axis-standard {
  fill: none;
  stroke: #686464;
  shape-rendering: crispEdges;
}
.bar-grey-highlight {
  fill: #a6a6a6;
}
.bar-grey {
  fill: #d0cece;
}

.legendbar {
  fill: #ff0000 !important;
  font-size: 100%;
}

.y-axis path,
.y-axis line {
  fill: none;
  stroke: black;
  shape-rendering: crispEdges;
}
.legendrect {
  fill: #8e7ff5;
}
</style>
