import {defineStore} from "pinia";
import {germanyKey, measures, regions, zpidKeys} from "@/data/dataKeys";
import measuresData from "@/data/Lockdown data-V6.0.csv";

export const useMeasuresStore = defineStore('measures', {
  state: () => {

    // object holding a list of {day: "aDay", value: 0} for each region and germany for each measure
    let measuresWithEmptyListsForAllRegions = {}
    for (const measure of measures) {
      measuresWithEmptyListsForAllRegions[measure.key] = {}
      for (const region of regions) {
        measuresWithEmptyListsForAllRegions[measure.key][region.key] = []
      }
      measuresWithEmptyListsForAllRegions[measure.key][germanyKey] = []
    }

    return {
      ...measuresWithEmptyListsForAllRegions,
      loading: false,
      initialized: false,
    }
  },
  getters: {
    byDate(state) {
      return (date) => state.find((measure) => measure.date === date)
    },
  },
  actions: {
    initValues() {
      if (this.initialized) {
        console.log("Measures already initialized")
        return
      }
      this.loading = true
      console.log("processing political measures from csv...")

      const extractByMeasure = (measure) => {
        for (const region of regions) {
          let dataRow = measuresData.find((record) =>  (record[zpidKeys.region] === region.zpid) && (record[zpidKeys.measure] === measure.zpid))
          for (const zpidKey of Object.values(zpidKeys)) {
            delete dataRow[zpidKey]
          }

          this[measure.key][region.key] = Object.entries(dataRow).map(([day, value]) => ({day, value}));
        }

        // TODO calc germany values
      }

      for (const measure of measures) {
        extractByMeasure(measure)
      }

      this.loading = false;
      this.initialized = true;
      console.log("measures processed")
    }
  }
})