<template>
  <h3>Demo of Storage Usage</h3>
  <div v-if="measuresStore.loading">Loading...</div>
  <div v-else v-for="dayVal in measuresStore.mask.germany">
    <p>{{ dayVal }}</p>
  </div>
</template>

<script>
import {useMeasuresStore} from "@/stores/politicalMeasures";

export default {
  name: "StoreUsageDemo",
  setup() {
    const measuresStore = useMeasuresStore();

    return {measuresStore}
  },
  mounted() {
    this.measuresStore.initValues()
  }
}
</script>