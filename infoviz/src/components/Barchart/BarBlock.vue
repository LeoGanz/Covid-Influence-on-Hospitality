<template>
  <div>
    <div class="bottomSpacing"  id="radio_buttons">
      <input class="leftSpacing" type="radio" @change="changeToUpper"
             value="upper category" name="displayUpperCategory" checked> Hospitality
      <input class="leftSpacing" type="radio" @change="changeToLodging"
             value="lodging" name="displayUpperCategory"> Accommodation
      <input class="leftSpacing" type="radio" @change="changeToGastronomy"
             value="gastronomy" name="displayUpperCategory"> Gastronomy
    </div>

    <div v-if="!hospitalityStore.initialized">Loading...</div>
    <BarChartTest v-else xKey="abbreviation" yKey="value" v-bind:data="data" />
  </div>
</template>

<script>
//import BarChart from "./BarChart.vue";
import BarChartTest from "./BarChartTest.vue";
import { useHospitalityStore } from "@/stores/hospitality";
import { useDateStore } from "@/stores/date";

export default {
  name: "App",
  components: {
    BarChartTest,
    //BarChart,
  },
  data() {
    return {
      displayUpperCategory: true,
      displayLodging: false,
      displayGastronomy: false,
      toggleClass: "ani1",
    };
  },
  methods: {
    play() {
      this.toggleClass == "ani1"
          ? (this.toggleClass = "ani2")
          : (this.toggleClass = "ani1");
    },
    changeToUpper(event) {
      this.displayUpperCategory = true;
      this.displayGastronomy = false;
      this.displayLodging = false;
    },
    changeToLodging(event) {
      this.displayLodging = true;
      this.displayUpperCategory = false;
      this.displayGastronomy = false;
    },
    changeToGastronomy(event) {
      this.displayGastronomy = true;
      this.displayUpperCategory = false;
      this.displayLodging = false;
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


      if (this.displayUpperCategory) {
        dataArray.forEach((entry) => {
          console.log(entry)
          const region = entry[0];
          const value = entry[1][0];
          const abbreviation = entry[1][1];
          if (region === "hospitality" || region === "accommodation" || region === "gastronomy") {
            if (Number.isFinite(value)) {
              data.push({region, value, abbreviation});
            } else {
              data.push({region, value: 0, abbreviation});
            }
          }
        });
      } else if (this.displayLodging) {
        console.log("lodging display")
        dataArray.forEach((entry) => {
          console.log(entry)
          const region = entry[0];
          const value = entry[1][0];
          const abbreviation = entry[1][1];
          if (region === "accommodation" || region === "hotelsInnsGuesthouses" || region === "holidayAccommodation" ||
              region === "campingSites" || region === "otherAccommodation") {
            if (Number.isFinite(value)) {
              data.push({region, value, abbreviation});
            } else {
              data.push({region, value: 0, abbreviation});
            }
          }

        });
      } else if (this.displayGastronomy) {
        dataArray.forEach((entry) => {
          console.log(entry)
          const region = entry[0];
          const value = entry[1][0];
          const abbreviation = entry[1][1];
          if (region === "gastronomy" || region === "restaurantsTavernsSnackbarsCafes"
              || region === "catereing"|| region === "beverages"|| region === "restaurantBusiness") {
            if (Number.isFinite(value)) {
              data.push({region, value, abbreviation});
            } else {
              data.push({region, value: 0, abbreviation});
            }
          }

        });
      }

      return data;
    },
  },
};
</script>

<style>


.leftSpacing {
  margin-left: 16px;
}

.bottomSpacing {
  margin-bottom: 8px;
}


</style>
