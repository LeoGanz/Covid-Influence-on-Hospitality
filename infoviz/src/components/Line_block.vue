<template>
  <div>
    <h3>Trend For: Germany</h3>
    <div id="app">
      <LineChart v-bind:class="[toggleClass]"/>
    </div>
  </div>
</template>

<script>
  import LineChart from "./linechart.vue";

  export default {
    name: "Line_block",
    components: {
      LineChart
  },

  data() {
    return {
      toggleClass: "ani1"
    };
  },

  methods: {
    play() {
      // toggle classes to animate the line draw
      this.toggleClass == "ani1"
      ? (this.toggleClass = "ani2")
      : (this.toggleClass = "ani1");
      }
    }
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

</style>