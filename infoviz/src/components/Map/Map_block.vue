<template>
  <div>
    <div id="header">
      <h3 v-if="display_hospitality">Map: Hospitality</h3>
      <h3 v-else>Map: Incidence</h3>
      <div id="radio_buttons">
        <input type="radio" @change="changeChart"
               value="hospitality" name="display_hospitality" checked> Hospitality
        <input type="radio" @change="changeChart"
               value="incidence" name="display_hospitality"> Incidence
      </div>
    </div>
    <!-- <LineChart v-if="lineChart" v-bind:class="[toggleClass]" />
    <BarChart v-else v-bind:class="[toggleClass]" /> -->
  </div>
</template>

<script>

import Map from "./Map.vue";


export default {
  name: "Map_block",
  components: {
    Map,
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
}



</script>


<style scoped>

</style>