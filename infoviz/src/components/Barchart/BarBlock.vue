<template>
  <div>
    <div id="headerBarChart">
      <div id="radio_buttons">
        <label class="radiolabels">
          <input
            type="radio"
            @change="changeToUpper"
            value="upper category"
            name="displayUpperCategory"
            checked
          />
          <span>Hospitality</span>
        </label>
        <label class="radiolabels">
          <input
            type="radio"
            @change="changeToLodging"
            value="lodging"
            name="displayUpperCategory"
          />
          <span>Accommodation</span>
        </label>
        <label class="radiolabels">
          <input
            type="radio"
            @change="changeToGastronomy"
            value="gastronomy"
            name="displayUpperCategory"
          />
          <span>Gastronomy</span>
        </label>
        <p class="note">
          Data only available for Germany, not for individual states
        </p>
      </div>
      <Popper placement="left" :hover="true" :arrow="true">
        <i class="material-icons">info</i>
        <template #content>
          <div>
            <h2>Hospitality Revenue by Sectors</h2>
            <p>
              This barchart displays the revenue of the hospitality sector and
              its sub-sectors in Germany at the date selected through the
              slider. This allows a comparison of how hard the different sectors
              have been hit by the pandemic.
            </p>
            <p>
              The super-category "Hospitality" is the weighted average of the
              sub-categories "Accommodation" and "Gastronomy". Super-categories
              are always highlighted in a darker color.
            </p>
          </div>
        </template>
      </Popper>
    </div>
    <BarChart class="leftMargin" />
    <div class="percentage-label">%</div>
  </div>
</template>

<script>
import BarChart from "./BarChart.vue";
import Popper from "vue3-popper";
import { useHospitalityStore } from "@/stores/hospitality.js";
import { useBarChartStore } from "@/stores/barChart.js";

export default {
  name: "App",
  components: {
    BarChart,
    Popper,
  },
  setup() {
    const hospitalityStore = useHospitalityStore();
    const barChartStore = useBarChartStore();
    return { hospitalityStore, barChartStore };
  },
  async mounted() {
    await this.hospitalityStore.initValues();
  },
  methods: {
    changeToUpper() {
      this.barChartStore.displayUpperCategory = true;
      this.barChartStore.displayGastronomy = false;
      this.barChartStore.displayLodging = false;
    },
    changeToLodging() {
      this.barChartStore.displayLodging = true;
      this.barChartStore.displayUpperCategory = false;
      this.barChartStore.displayGastronomy = false;
    },
    changeToGastronomy() {
      this.barChartStore.displayGastronomy = true;
      this.barChartStore.displayUpperCategory = false;
      this.barChartStore.displayLodging = false;
    },
  },
};
</script>

<style>
.popper-style {
  transition-delay: 1s;
}

.barHeaderBar {
  display: flex;
  flex-direction: row;
}

.note {
  font-size: 12px;
  color: #9f9f9f;
}

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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
  margin-left: 16px;
  margin-right: 16px;
}

.leftMargin {
  margin-left: 16px;
}

.percentage-label {
  position: absolute;
  bottom: 33px;
  right: 0;
  font-size: 15px;
  color: #000000;
  margin-right: 32px;
}

.category-label-group {
  position: absolute;
  top: 109px;
  right: 32px;
  margin-right: 35px;
}

.category-label {
  margin-bottom: -4px;
}
</style>
