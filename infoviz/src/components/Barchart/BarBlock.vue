<template>
  <div>
    <div id="headerBarChart">
      <div class="bottomSpacing" id="radio_buttons">
        <label class="radiolabels">
          <input
              type="radio"
              @change="changeToUpper"
              value="upper category"
              name="displayUpperCategory"
              checked
          >
          <span>Hospitality</span>
        </label>
        <label class="radiolabels">
          <input
              type="radio"
              @change="changeToLodging"
              value="lodging"
              name="displayUpperCategory"
          >
          <span>Accommodation</span>
        </label>
        <label class="radiolabels">
          <input
              type="radio"
              @change="changeToGastronomy"
              value="gastronomy"
              name="displayUpperCategory"
          >
          <span>Gastronomy</span>
        </label>
      </div>
      <Popper placement="left" hover="true" arrow="true">
        <i class="material-icons">info</i>
        <template #content>
          <div>
            <h2>Hospitality Revenue by Sectors</h2>
            <p>This barchart displays the revenue of the hospitality sector and its sub-sectors in Germany at the date
              selected through the slider. This allows a comparison of how hard the different sectors have been hit
              by the pandemic.</p>
            <p>
              The super-category "Hospitality" is the weighted average of the sub-categories "Accommodation" and "Gastronomy".
              Super-categories are always highlighted in a darker color.
            </p>
          </div>
        </template>
      </Popper>
    </div>
    <div v-if="!hospitalityStore.initialized">Loading...</div>
    <BarChartTest class="leftMargin" v-else xKey="abbreviation" yKey="value" v-bind:data="data"/>
  </div>
</template>

<script>
//import BarChart from "./BarChart.vue";
import BarChartTest from "./BarChartTest.vue";
import {useHospitalityStore} from "@/stores/hospitality";
import {useDateStore} from "@/stores/date";
import Popper from "vue3-popper";

export default {
  name: "App",
  components: {
    BarChartTest,
    //BarChart,
    Popper,
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
    return {hospitalityStore, dateStore};
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
              || region === "catereing" || region === "beverages" || region === "restaurantBusiness") {
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

.radioList {
  width: 80%;
  list-style: none;
}

input[type="radio"] {
  visibility: hidden;
  width: 0;
  height: 0;
}

.radiolabels {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  cursor: pointer;
  color: #575656;
  padding: 5px 12px;
  background: rgb(228, 228, 228);
  /* border-radius: 30px; */
  /* border-color: #010101; */
  /* border-width: 1px; */

  /* border-style: solid; */
}

#radio_buttons input[type="radio"]:checked ~ * {
  color: #000000 !important;
  font-weight: bold;

}

#headerBarChart {
  margin-bottom: 16px;
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.leftMargin {
  margin-left: 16px;
}

</style>
