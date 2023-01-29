<template>

  <div id="radio_buttons">
    <input type="radio" @change="changeChart"
           value="upper category" name="display_upper_category" checked> upper category
    <input type="radio" @change="changeChart"
           value="under category" name="display_upper_category"> under category
  </div>
  <div>
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
  data() {
    return {
      display_upper_category: true,
      toggleClass: "ani1",
    };
  },
  methods: {
    play() {
      this.toggleClass == "ani1"
          ? (this.toggleClass = "ani2")
          : (this.toggleClass = "ani1");
    },
    changeChart(event) {
      this.display_upper_category = !this.display_upper_category;
    },
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
        console.log(entry)
        const region = entry[0];
        const value = entry[1][0];
        const abbreviation = entry[1][1];
        //if (this.display_upper_category && abbreviation === "Hospitality"||abbreviation === "Lodging"||abbreviation === "Gastronomy") {
        if (Number.isFinite(value)) {
          data.push({region, value, abbreviation});
        } else {
          data.push({region, value: 0, abbreviation});
        }
        //}

      });
 
      return data;
    },
  },
};
</script>

<style></style>
