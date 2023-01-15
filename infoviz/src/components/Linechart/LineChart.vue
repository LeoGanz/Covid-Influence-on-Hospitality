<template>
  <div v-if="!covidCasesStore.initialized">Loading...</div>
  <svg
    id="svg"
    :width="chart.width"
    :height="chart.height"
    :viewBox="[0, 0, chart.width, chart.height]"
    @pointerenter="pointerentered"
    @pointermove="pointermoved"
    @pointerleave="pointerleft"
    @touchstart="(event) => event.preventDefault()"
    v-else
  >
    <g
      id="xaxis"
      :transform="`translate(0,${chart.height - chart.marginBottom})`"
    ></g>
    <g id="yaxis" :transform="`translate(${chart.marginLeft},0)`"></g>
    <g
      id="paths"
      fill="none"
      :stroke="typeof chart.color === 'string' ? chart.color : null"
      :stroke-linecap="chart.strokeLinecap"
      :stroke-linejoin="chart.strokeLinejoin"
      :stroke-width="chart.strokeWidth"
      :stroke-opacity="chart.strokeOpacity"
    ></g>
    <g id="dot" display="none">
      <circle r="2.5"></circle>
      <text
        font-size="15"
        text-anchor="middle"
        text-color="black"
        y="-8"
      ></text>
    </g>
  </svg>
</template>

<script>
// we took this link: https://observablehq.com/@d3/multi-line-chart and transformed to be usable with Vue
import * as d3 from "d3";
import { useCovidCasesStore } from "@/stores/covidCases.js";
import { germanyKey, regions } from "@/data/dataKeys";
export default {
  name: "vue-line-chart",
  components: {},
  data() {
    const covidCasesStore = useCovidCasesStore();

    return {
      covidCasesStore: covidCasesStore,
    regions: regions,
    d3: d3,
    chart: {
      x: (d) => d.day,
      y: (d) => d.value,
      z: (d) => d.category,
      //x: d => d., // given d in data, returns the (temporal) x-value
      //y: ([, y]) => y, // given d in data, returns the (quantitative) y-value
      //z: () => 1, // given d in data, returns the (categorical) z-value
      title: undefined, // given d in data, returns the title text
      defined: undefined, // for gaps in data
      curve: d3.curveLinear, // method of interpolation between points
      marginTop: 20, // top margin, in pixels
      marginRight: 30, // right margin, in pixels
      marginBottom: 30, // bottom margin, in pixels
      marginLeft: 60, // left margin, in pixels
      width: 600, // outer width, in pixels
      height: 300, // outer height, in pixels
      xType: d3.scaleUtc, // type of x-scale
      xDomain: undefined, // [xmin, xmax]
      xRange: undefined, // [left, right]
      yType: d3.scaleLinear, // type of y-scale
      yDomain: undefined, // [ymin, ymax]
      yRange: undefined, // [bottom, top]
      yFormat: undefined, // a format specifier string for the y-axis
      yLabel: "Incidence", // a label for the y-axis
      zDomain: undefined, // array of z-values
      color: "currentColor", // stroke color of line, as a constant or a function of *z*
      strokeLinecap: undefined, // stroke line cap of line
      strokeLinejoin: undefined, // stroke line join of line
      strokeWidth: 1.5, // stroke width of line
      strokeOpacity: undefined, // stroke opacity of line
      mixBlendMode: "multiply", // blend mode of lines
    },
  };
},
async mounted() {
  await this.covidCasesStore.initValues();
  console.log("Covid data: ");
  console.log(this.covidCasesStore);
  this.renderChart();
},
computed: {
  data() {
    const data = [];
    for (var state in this.covidCasesStore.cases) {
      if (state != germanyKey) {
        data.push(
            ...this.covidCasesStore.cases[state].map((value) => {
              value.day = new Date(value.day).getTime();
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
  getColorId() {
    return d3
        .scaleOrdinal()
        .domain(this.Z)
        .range(d3.range(0, this.regions.length));
  },
  getColor() {
    return d3.scaleLinear().domain([0, this.regions.length]).range([0, 1]);
  },
  // // Compute values.
  //  const X = d3.map(data, x);
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
  //  const Z = d3.map(data, z);
  Z() {
    return d3.map(this.data, this.chart.z);
  },
  //  const O = d3.map(data, (d) => d);
  O() {
    return d3.map(this.data, (d) => d);
  },
  defined() {
    if (this.chart.defined === undefined) {
      return (d, i) => !isNaN(this.X[i]) && !isNaN(this.Y[i]);
    }
    return this.chart.defined;
  },
  D() {
    return d3.map(this.data, this.defined);
  },
  //  if (defined === undefined)
  //    defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
  //  const D = d3.map(data, defined);
  //
  //  // Compute default domains, and unique the z-domain.
  //  if (xDomain === undefined) xDomain = d3.extent(X);
  xDomain() {
    return d3.extent(this.X);
  },
  //  if (yDomain === undefined)
  //    yDomain = [0, d3.max(Y, (d) => (typeof d === "string" ? +d : d))];
  yDomain() {
    return [0, d3.max(this.Y, (d) => (typeof d === "string" ? +d : d))];
  },
  //  if (zDomain === undefined) zDomain = Z;
  //  zDomain = new d3.InternSet(zDomain);
  zDomain() {
    return new d3.InternSet(this.Z);
  },
  //
  //  // Omit any data not present in the z-domain.
  //  const I = d3.range(X.length).filter((i) => zDomain.has(Z[i]));
  I() {
    return d3.range(this.X.length).filter((i) => this.zDomain.has(this.Z[i]));
  },
  //
  //  // Construct scales and axes.
  //  const xScale = xType(xDomain, xRange);
    xScale() {
      return this.chart.xType(this.xDomain, this.xRange);
    },
    //  const yScale = yType(yDomain, yRange);
    yScale() {
      return this.chart.yType(this.yDomain, this.yRange);
    },
    //  const xAxis = d3
    //    .axisBottom(xScale)
    //    .ticks(width / 80)
    //    .tickSizeOuter(0);
    xAxis() {
      return d3
        .axisBottom(this.xScale)
        .ticks(this.chart.width / 80)
        .tickSizeOuter(0);
    },
    //  const yAxis = d3.axisLeft(yScale).ticks(height / 60, yFormat);
    yAxis() {
      return d3
        .axisLeft(this.yScale)
        .ticks(this.chart.height / 60, this.chart.yFormat);
    },
    //
    //  // Compute titles.
    //  const T =
    //    title === undefined ? Z : title === null ? null : d3.map(data, title);
    T() {
      return this.chart.title === undefined
        ? this.Z
        : this.chart.title === null
        ? null
        : d3.map(this.data, this.chart.title);
    },
    //  // Construct a line generator.
    //  const line = d3
    //    .line()
    //    .defined((i) => D[i])
    //    .curve(curve)
    //    .x((i) => xScale(X[i]))
    //    .y((i) => yScale(Y[i]));
    line() {
      return d3
        .line()
        .defined((i) => this.D[i])
        .curve(this.chart.curve)
        .x((i) => this.xScale(this.X[i]))
        .y((i) => this.yScale(this.Y[i]));
    },
  },
  methods: {
    renderChart() {
      d3.select("#xaxis").call(this.xAxis);
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
      d3.select("#paths")
        .selectAll("path")
        .data(d3.group(this.I, (i) => this.Z[i]))
        .join("path")
        .style("mix-blend-mode", this.chart.mixBlendMode)
        .attr(
          "stroke",
          typeof this.chart.color === "function"
            ? ([z]) => this.chart.color(z)
            : ([z]) => d3.interpolateTurbo(this.getColor(this.getColorId(z)))
        )
        .attr("d", ([, I]) => this.line(I));
    },
    pointermoved(event) {
      const [xm, ym] = d3.pointer(event);
      const i = d3.least(this.I, (i) =>
        Math.hypot(this.xScale(this.X[i]) - xm, this.yScale(this.Y[i]) - ym)
      ); // closest point
      d3.select("#paths")
        .selectAll("path")
        .style("stroke", ([z]) => (this.Z[i] === z ? null : "#ddd"))
        .filter(([z]) => this.Z[i] === z)
        .raise();
      d3.select("#dot")
        .attr(
          "transform",
          `translate(${this.xScale(this.X[i])},${this.yScale(this.Y[i])})`
        )
        .attr("display", "block");
      d3.select("#dot")
        .select("text")
        .text(this.T[i] + " - " + Math.round(this.Y[i]));
      d3.select("#svg")
        .property("value", this.O[i])
        .dispatch("input", { bubbles: true });
    },
    pointerentered() {
      d3.select("#paths")
        .selectAll("path")
        .style("mix-blend-mode", null)
        .style("stroke", "#ddd");
      d3.select("#dot").attr("display", null);
    },
    pointerleft() {
      d3.select("#paths")
        .selectAll("path")
        .style("mix-blend-mode", this.chart.mixBlendMode)
        .style("stroke", null);
      d3.select("#dot").attr("display", "none");
      d3.select("#svg").value = null;
      d3.select("#svg").dispatch("input", { bubbles: true });
    },
  },
};
</script>

<style>
path {
  color: #000;
  mix-blend-mode: multiply;
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
