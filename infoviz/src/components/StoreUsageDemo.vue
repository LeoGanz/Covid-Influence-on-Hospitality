<template>
  <h3>Demo of Storage Usage</h3>
  <div v-if="measuresStore.loading">Loading...</div>
  <div v-else>
    {{ measuresStore.lockDown.bavaria}}
  </div>
</template>

<script>
import {useMeasuresStore} from "@/stores/politicalMeasures";

export default {
  name: "StoreUsageDemno",
  setup() {
    const measuresStore = useMeasuresStore();

    return {measuresStore}
  },
  mounted() {
    // this.measuresStore.loadMeasures()
  }
}
</script>

<style scoped>

</style>