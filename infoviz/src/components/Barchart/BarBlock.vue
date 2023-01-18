<template>
  <div>
    <h3>Sectors: Germany</h3>
    <div v-if="!hospitalityStore.initialized">Loading...</div>
    <BarChartTest v-else xKey="region" yKey="value" v-bind:data="data" />
  </div>
</template>

<script>
//import BarChart from "./BarChart.vue";
import BarChartTest from "./BarChartTest.vue";
import { useHospitalityStore } from "@/stores/hospitality";
import { useDateStore } from "@/stores/selectedDate";

export default {
  name: "App",
  components: {
    BarChartTest,
    //BarChart,
  },
  setup() {
    const hospitalityStore = useHospitalityStore();
    const dateStore = useDateStore();
    return { hospitalityStore, dateStore };
  },
  async mounted() {
    await this.hospitalityStore.initValues();
  },
  computed: {
    data() {
      const data = [];
      const dataJson = this.hospitalityStore.getSectorsByMonth(
        this.dateStore.currentMonth
      ).real.original;
      const dataArray = Object.entries(dataJson);
      dataArray.forEach((entry) => {
        const region = entry[0];
        const value = entry[1];
        if (Number.isFinite(value)) {
          data.push({ region, value });
        } else {
          data.push({ region, value: 0 });
        }
      });
      return data;
    },
  },
};
</script>

<style></style>
