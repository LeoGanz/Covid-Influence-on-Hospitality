<template>
  <div>
    <div id="header">
      <h3><b>Trend for: </b>{{ regionStore.currentRegionName }}</h3>
      <Popper placement="left" hover="true" arrow="true">
        <i class="material-icons">info</i>
        <template #content>
          <div>
            <h2>Hospitality Revenue and Incidence</h2>
            <p>This line chart displays the revenue of the hospitality sector and covid incidence. Lockdowns are highlighted if the measure is active in at least one region of germany. *</p>
          </div>
        </template>
      </Popper>
    </div>
    <LineChart v-bind:class="[toggleClass]" />
  </div>
</template>

<script>
import LineChart from "./LineChart.vue";
import { useCurrentRegionStore } from "@/stores/currentRegion";
import Popper from "vue3-popper";

export default {
  name: "Line_block",
  components: {
    LineChart,
    Popper,
  },

  data() {
    const regionStore = useCurrentRegionStore();
    return {
      regionStore,
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
h3 b {
  font-weight: 600;
}
</style>
