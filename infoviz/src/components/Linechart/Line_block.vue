<template>
  <div>
    <div id="header">
      <h3 v-if="lineChart">Trend: Germany</h3>
      <h3 v-else>Sector Comparison: Germany</h3>
      <div id="radio_buttons">
        <input type="radio" @change="changeChart"
               value="line" name="lineChart" checked> Line Chart
        <input type="radio" @change="changeChart"
               value="bar" name="lineChart"> Bar Chart
      </div>
    </div>
    <LineChart v-if="lineChart" v-bind:class="[toggleClass]" />
    <BarChart v-else v-bind:class="[toggleClass]" />
  </div>
</template>

<script>
import LineChart from "./linechart.vue";
import BarChart from "./barchart.vue";

export default {
  name: "Line_block",
  components: {
    LineChart,
    BarChart,
  },

  data() {
    return {
      lineChart: true,
      toggleClass: "ani1",
    };
  },

  methods: {
    play() {
      // toggle classes to animate the line draw
      this.toggleClass == "ani1"
        ? (this.toggleClass = "ani2")
        : (this.toggleClass = "ani1");
    },
    changeChart(event) {
      // toggle the linechart
      this.lineChart = !this.lineChart;
    },
  },
};
</script>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  padding: 0px;
}
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
}
</style>
