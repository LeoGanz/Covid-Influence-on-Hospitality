<template>
  <div v-if="!covidCasesStore.initialized">Loading...</div>
  <svg
      id="svg"
      :width="chart.width"
      :height="chart.height"
      :viewBox="[0, 0, chart.width, chart.height]"
      v-else
  >
    <g id="yaxis" :transform="`translate(${chart.marginLeft},0)`"></g>
    <g id="rect" fill="colour"></g>
    <g id="xaxis" :transform="`translate(0,${chart.height - chart.marginBottom})`"></g>
  </svg>
</template>





<script>
// source: https://observablehq.com/@d3/bar-chart
import * as d3 from "d3";
import { useCovidCasesStore } from "@/stores/covidCases.js";
import { germanyKey, regions } from "@/data/dataKeys";
export default {
  name: "vue-bar-chart",
  components: {},
  data() {
    const covidCasesStore = useCovidCasesStore();
    return {
      covidCasesStore: covidCasesStore,
      regions: regions,
      d3: d3,
      chart: {
        x: (d) => d.regions,
        y: (d) => d.value,
        //x = (d, i) => i, // given d in data, returns the (ordinal) x-value
        //y = d => d, // given d in data, returns the (quantitative) y-value
        //title: undefined, // given d in data, returns the title text
        marginTop: 20, // the top margin, in pixels
        marginRight: 0, // the right margin, in pixels
        marginBottom: 30, // the bottom margin, in pixels
        marginLeft: 40, // the left margin, in pixels
        width: 640, // the outer width of the chart, in pixels
        height: 400, // the outer height of the chart, in pixels
        xDomain: undefined, // an array of (ordinal) x-values
        xRange: undefined, // [left, right]
        yType: d3.scaleLinear, // y-scale type
        yDomain: undefined, // [ymin, ymax]
        yRange: undefined, // [bottom, top]
        xPadding: 0.1, // amount of x-range to reserve to separate bars
        yFormat: undefined, // a format specifier string for the y-axis
        yLabel: "Incidence ( will be revenue in the future)", // a label for the y-axis
        color: "currentColor" // bar fill color
      },
    };
  },
  async mounted() {
    await this.covidCasesStore.initValues();
    this.renderChart();
  },
  computed: {
    data() {
      const data = [];
      for (var state in this.covidCasesStore.cases) {
        if (state != germanyKey) {
          data.push(
              ...this.covidCasesStore.cases[state].map((value) => {
                value.category = this.regions.find(
                    (region) => region.key == state
                ).covid;
                return value;
              })
          );
        }
      }

      return data;
    },

    xRange() {
      if (this.chart.xRange === undefined) {
        return [
          this.chart.marginLeft,
          this.chart.width - this.chart.marginRight,
        ];
      }
      return this.chart.xRange;
    },
    yRange() {
      if (this.chart.yRange === undefined) {
        return [
          this.chart.height - this.chart.marginBottom,
          this.chart.marginTop,
        ];
      }
      return this.chart.yRange;
    },
    X() {
      return d3.map(this.data, this.chart.x);
    },
    //  const Y = d3.map(data, y);
    Y() {
      return d3.map(this.data, this.chart.y);
    },
    xDomain() {
      return d3.extent(this.X);
    },
    //  if (yDomain === undefined)
    //    yDomain = [0, d3.max(Y, (d) => (typeof d === "string" ? +d : d))];
    yDomain() {
      return [0, d3.max(this.Y, (d) => (typeof d === "string" ? +d : d))];
    },
    xScale() {
      return d3
          .scaleBand(this.xDomain, this.xRange)
          .padding(this.xPadding)
    },
    //  const yScale = yType(yDomain, yRange);
    yScale() {
      return this.chart.yType(this.yDomain, this.yRange);
    },
    xAxis() {
      return d3
          .axisBottom(this.xScale)
          .tickSizeOuter(0);
    },
    //  const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);
    yAxis() {
      return d3
          .axisLeft(this.yScale)
          .ticks(this.chart.height / 40, this.chart.yFormat);
    },
//TODO: Compute Titles

  },
  methods: {
    renderChart() {
      d3.select("#yaxis")
          .call(this.yAxis)
          .call((g) => g.select(".domain").remove())
          .call((g) =>
              g
                  .selectAll(".tick line")
                  .clone()
                  .attr(
                      "x2",
                      this.chart.width - this.chart.marginLeft - this.chart.marginRight
                  )
                  .attr("stroke-opacity", 0.1)
          )
          .call((g) =>
              g
                  .append("text")
                  .attr("x", -this.chart.marginLeft)
                  .attr("y", 10)
                  .attr("fill", "currentColor")
                  .attr("text-anchor", "start")
                  .text(this.chart.yLabel)
          );
      d3.select("#rect")
          .selectAll("rect")
          .join("rect")
          .attr("x", (i) => this.xScale(this.X[i]))
          .attr("y", (i) => this.yScale(this.Y[i]))
          .attr("height", (i) => this.yScale(0) - this.yScale(this.Y[i]))
          .attr("width", this.xScale.bandwidth());
    },
  },
};




</script>


<style>
path {
  color: #213fd5;
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