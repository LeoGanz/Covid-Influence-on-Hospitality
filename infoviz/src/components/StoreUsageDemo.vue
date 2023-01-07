<template>
  <h3>Demo of Storage Usage</h3>
  <div v-if="measuresStore.loading">Loading measures...</div>
  <div v-else v-for="dayVal in measuresStore.mask.germany">
    <p>{{ dayVal }}</p>
  </div>
  <div v-if="hospitalityStore.loading">Loading hospitality...</div>
  <div v-else>
    <p>Done loading</p>
  </div>
</template>

<script>
import {useMeasuresStore} from "@/stores/politicalMeasures";
import {useHospitalityStore} from "@/stores/hospitality";

export default {
  name: "StoreUsageDemo",
  setup() {
    const measuresStore = useMeasuresStore();
    const hospitalityStore = useHospitalityStore();

    return {measuresStore, hospitalityStore};
  },
  mounted() {
    // this.measuresStore.initValues()
    this.hospitalityStore.initValues()
  }
}
</script>