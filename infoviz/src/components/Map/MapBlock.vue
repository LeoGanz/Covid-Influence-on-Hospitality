<template>
  <div>
    <div id="header">
      <div id="radio_buttons">
        <!-- <ul class="radioList">
          <li> -->
            <label class="radiolabels">
              <input
                type="radio"
                @change="changeChart"
                value="hospitality"
                name="display_hospitality"
                checked
              >
              <span>Hospitality</span>
            </label>
          <!-- </li>
          <li> -->
            <label class="radiolabels">
              <input
                type="radio"
                @change="changeChart"
                value="incidence"
                name="display_hospitality"
              >
            <span>Incidence</span>
          </label>
          <!-- </li>
        </ul> -->
      </div>
      <Popper placement="left" :hover="true" :arrow="true">
        <i class="material-icons">info</i>
        <template #content>
          <div>
            <h2>Map of Germany</h2>
            <p>
              This map displays the selected information (hospitality revenue or incidence) of the different regions in Germany at the date selected through
              the slider. This allows a comparison between the regions.
            </p>
            <p>The map also serves as a control panel for selecting regions.</p>
          </div>
        </template>
      </Popper>
    </div> 
    <div v-if="display_hospitality" style="width: 100%; height: 100%">
      <MapHospitality />
    </div>
    <div v-else style="width: 100%; height: 100%">
      <MapIncidence />
    </div>

    <!-- <LineChart v-if="lineChart" v-bind:class="[toggleClass]" />
    <BarChart v-else v-bind:class="[toggleClass]" /> -->
    <div>
      <label class="legendInfo">
      * Lockdown data only available until November 2021
      </label>
    </div>
  </div>
</template>

<script>
import MapIncidence from "./MapIncidence.vue";
import MapHospitality from "./MapHospitality.vue";
import Popper from "vue3-popper";

export default {
  name: "Map_block",
  components: {
    MapIncidence,
    MapHospitality,
    Popper
  },
  data() {
    return {
      display_hospitality: true,
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
      // toggle hospitality
      this.display_hospitality = !this.display_hospitality;
    },
  },
};
</script>

<style scoped>

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

  #header {
    margin-left: 16px;
    margin-right: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .legendInfo {
    color: #949494;
  }


</style>
