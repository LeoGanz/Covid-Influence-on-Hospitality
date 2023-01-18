<template>
  <div id="container" class="svg-container">
    <svg
      id="barchart"
      v-if="redrawToggle === true"
      :width="svgWidth"
      :height="svgHeight"
    >
      <g>
        <rect
          v-for="item in data"
          class="bar-positive"
          :key="item[xKey]"
          :x="xScale(item[xKey])"
          :y="yScale(0)"
          :width="xScale.bandwidth()"
          :height="0"
        ></rect>
      </g>
    </svg>
  </div>
</template>

<script>
import { scaleLinear, scaleBand } from "d3-scale";
import { max, min } from "d3-array";
import { select, selectAll } from "d3-selection";
import { transition } from "d3-transition";
import { axisBottom, axisLeft } from "d3-axis";

export default {
  name: "BarChart",
  props: {
    title: String,
    xKey: String,
    yKey: String,
    data: Array,
  },
  mounted() {
    this.svgWidth = document.getElementById("container").offsetWidth * 0.75;
    this.AddResizeListener();
    this.AnimateLoad();
    this.createXAxis();
    this.createYAxis();
  },
  data: () => ({
    svgWidth: 0,
    redrawToggle: true,
    margin: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40,
    },
  }),
  methods: {
    AnimateLoad() {
      select("#barchart")
        .selectAll("rect")
        .data(this.data)
        .transition()
        .delay((d, i) => {
          return i * 15;
        })
        .duration(500)
        .attr("y", (d) => {
          return this.yScale(d[this.yKey]);
        })
        .attr("height", (d) => {
          return this.svgHeight - this.yScale(d[this.yKey]);
        });
    },
    AddResizeListener() {
      // redraw the chart 300ms after the window has been resized
      window.addEventListener("resize", () => {
        this.$data.redrawToggle = false;
        setTimeout(() => {
          this.$data.redrawToggle = true;
          this.$data.svgWidth =
            document.getElementById("container").offsetWidth * 0.75;
          this.AnimateLoad();
        }, 300);
      });
    },
    createXAxis() {
      const xAxis = axisBottom(this.xScale);
      select("#barchart")
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${this.svgHeight})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", function (d) {
          return "rotate(-65)";
        });
    },
    createYAxis() {
      const yAxis = axisLeft(this.yScale);
      select("#barchart")
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${this.svgWidth + 20}, 0)`)
        .call(yAxis);
    },
  },
  computed: {
    dataMax() {
      return max(this.data, (d) => {
        return d[this.yKey];
      });
    },
    dataMin() {
      return min(this.data, (d) => {
        return d[this.yKey];
      });
    },
    xScale() {
      return scaleBand()
        .rangeRound([0, this.svgWidth])
        .padding(0.1)
        .domain(
          this.data.map((d) => {
            return d[this.xKey];
          })
        );
    },
    yScale() {
      return scaleLinear()
        .rangeRound([this.svgHeight, 0])
        .domain([this.dataMin > 0 ? 0 : this.dataMin, this.dataMax]);
    },
    svgHeight() {
      return 170; // define height here
    },
  },
  watch: {
    data: function () {
      this.AnimateLoad();
    },
  },
};
</script>

<style scoped>
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
  fill: steelblue;
  transition: r 0.2s ease-in-out;
}

.bar-positive:hover {
  fill: #345c7c;
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
  stroke: black;
  shape-rendering: crispEdges;
}

.y-axis path,
.y-axis line {
  fill: none;
  stroke: black;
  shape-rendering: crispEdges;
}
</style>
