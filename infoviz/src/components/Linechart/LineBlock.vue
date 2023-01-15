<template>
  <div>
    <div id="header">
      <h3>Trend: Germany</h3>
    </div>
    <LineChart v-bind:class="[toggleClass]" />
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";

export default {
  name: "Line_block",
  components: {
    LineChart
  },

  data() {
    return {
      lineChart: true,
      barChart: false,
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
      this.barChart = !this.barChart;
    },
  },
};
</script>

<style scoped>
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
}
</style>
