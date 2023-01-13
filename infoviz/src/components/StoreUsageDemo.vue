<template>
  <div class="stores">
    <div id="measures" class="store">
      <h3>Demo of Measures Dataset</h3>
      <div v-if="measuresStore.loading">Loading political measures data...</div>
      <div v-else v-for="val in measuresStore.lockdown.bavaria">
        <p>{{ val }}</p>
      </div>
    </div>
    <div id="cases" class="store">
      <h3>Demo of Covid Cases Dataset</h3>
      <div v-if="measuresStore.loading">Loading covid data...</div>
      <div v-else v-for="val in covidCasesStore.cases.germany">
        <p>{{ val }}</p>
      </div>
    </div>
    <div id="hospitality" class="store">
      <h3>Demo of Hospitality Dataset</h3>
      <div v-if="hospitalityStore.loading">Loading hospitality data...</div>
<!--      <div v-else v-for="val in hospitalityStore.revenue.bavaria.nominal.absolut">-->
      <div v-else >
        <p>{{ hospitalityStore.getRegionsByMonth('2021-02').real.original }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useMeasuresStore } from "@/stores/politicalMeasures";
import { useCovidCasesStore } from "@/stores/covidCases";
import {useHospitalityStore} from "@/stores/hospitality";

export default {
  name: "StoreUsageDemo",
  setup() {
    const measuresStore = useMeasuresStore();
    const covidCasesStore = useCovidCasesStore();
    const hospitalityStore = useHospitalityStore();

    return { measuresStore, covidCasesStore, hospitalityStore };
  },
  mounted() {
    this.covidCasesStore.initValues();
    this.measuresStore.initValues();
    this.hospitalityStore.initValues()
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
