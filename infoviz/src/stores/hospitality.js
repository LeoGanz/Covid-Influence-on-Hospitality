import {defineStore} from "pinia";
import hospitalityGer from "@/data/UmsatzBranchenDE-utf8.csv";
import hospitalityRegions from "@/data/UmsatzBL-utf8.csv";
import {germanyKey, regions, sectors} from "@/data/dataKeys";

export const useHospitalityStore = defineStore('hospitality', {
  state: () => {

    let buildSectorTimelines = () => {
      return {
        real: {
          original: [],
          adjusted: [],
        },
        nominal: {
          original: [],
          adjusted: [],
        }
      }
    }
    let buildRegionTimelines = () => {
      return {
        real: {
          original: [],
          adjusted: [],
        },
        nominal: {
          original: [],
          adjusted: [],
        }
      }
    }

    let revenue = {}
    for (const region of regions) {
      revenue[region.key] = buildRegionTimelines()
    }
    revenue[germanyKey] = buildRegionTimelines()
    for (const sector of sectors) {
      revenue[germanyKey][sector.key] = buildSectorTimelines()
    }

    return {
      // revenue: {
      //   germany: {
      //     real: {
      //       absolut: [],
      //       difference: [],
      //     },
      //     nominal: {
      //       absolut: [],
      //       difference: [],
      //     },
      //     sectorX: {
      //       real: {
      //         original: [],
      //         adjusted: [],
      //       },
      //       nominal: {
      //         original: [],
      //         adjusted: [],
      //       },
      //     }
      //   },
      //   badenWuerttemberg: {
      //     real: {
      //       absolut: [],
      //       difference: [],
      //     },
      //     nominal: {
      //       absolut: [],
      //       difference: [],
      //     },
      //   }
      // },
      revenue,
      loading: false,
      initialized: false,
    }
  },
  actions: {
    initValues() {
      if (this.initialized) {
        console.log("Hospitality already initialized")
        return
      }

      this.loading = true
      console.log("processing hospitality data from csv...")
      console.log(hospitalityGer)
      console.log(hospitalityRegions)

      this.initialized = true
      this.loading = false

      console.log("hospitality processed")
    }
  }
})