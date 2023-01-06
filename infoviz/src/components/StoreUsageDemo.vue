<template>
  <div class="stores">
    <div id="measures" class="store">
      <h3>Demo of Measures Dataset</h3>
      <div v-if="measuresStore.loading">Loading...</div>
      <div v-else v-for="dval in measuresStore.lockdown.bavaria">
        <p>{{ dval }}</p>
      </div>
    </div>
    <div id="cases" class="store">
      <h3>Demo of Covid Cases Dataset</h3>
      <div v-if="measuresStore.loading">Loading...</div>
      <div v-else v-for="val in covidCasesStore.cases">
        <p>{{ val }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useMeasuresStore } from "@/stores/politicalMeasures";
import { useCovidCasesStore } from "@/stores/covidCases";

export default {
  name: "StoreUsageDemo",
  setup() {
    const measuresStore = useMeasuresStore();
    const covidCasesStore = useCovidCasesStore();

    return { measuresStore, covidCasesStore };
  },
  mounted() {
    this.covidCasesStore.initValues();
    this.measuresStore.initValues();
  },
};
</script>

<style scoped>
.stores {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  width: 100%;
}

.store {
  padding-left: 1em;
  padding-right: 1em;
}
</style>
