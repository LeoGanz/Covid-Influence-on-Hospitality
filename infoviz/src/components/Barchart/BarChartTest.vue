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

export default {
  name: "BarChart",
  props: {
    title: String,
    xKey: String,
    yKey: String,
    data: Array,
  },
  mounted() {
    console.log(this.data);
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
        .attr("transform", `translate(${80}, 0)`)
        .data(this.data)
        .transition()
        .delay((d, i) => {
          return i * 10;
        })
        .duration(500)
        .attr((d) => {
          return this.xScale(d[this.yKey]);
        })
        .attr("width", (d) => {
          return this.xScale(d[this.yKey]);
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
    clearXAxis() {
      select("#barchart")
        .select(".x-axis")
        .remove();
    },
    createXAxis() {
      var xAxis = axisBottom(this.xScale)
      select("#barchart")
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(80, ${this.svgHeight})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", ".6em")
        .attr("dy", ".5em")
        .attr("transform", function (d) {
          return "rotate(0)";
        });
    },
    clearYAxis() {
      select("#barchart")
        .select(".y-axis")
        .remove();
    },
    createYAxis() {
      const yAxis = axisLeft(this.yScale);
      select("#barchart")
        .append("g")
        .attr("class", "y-axis")
        .attr("transform", `translate(${80}, 0)`)
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
    yScale() {
      return scaleBand()
        .rangeRound([0, this.svgHeight])
        .padding(0.1)
        .domain(
          this.data.map((d) => {
            return d[this.xKey];
          })
        );
    },
    xScale() {
      return scaleLinear()
        .rangeRound([0,this.svgWidth-80])
        .domain([this.dataMin > 0 ? 0 : this.dataMin, 240]);
    },
    svgHeight() {
      return 240; // define height here
    },
  },
  watch: {
    data: function () {
      //this.d3.select('rect').selectAll('*').remove();

      let myThis = this;

      setTimeout(function(){
        console.log("data changed");
        myThis.clearXAxis();
        myThis.createXAxis();
        myThis.clearYAxis();
        myThis.createYAxis();
        myThis.AddResizeListener();
        myThis.AnimateLoad();
      }, 10);
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
  fill: #f8b527;
  transition: r 0.2s ease-in-out;
}

.bar-positive:hover {
  fill: #ff9100;
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

.y-axis path,
.y-axis line {
  fill: none;
  stroke: black;
  shape-rendering: crispEdges;
}
</style>