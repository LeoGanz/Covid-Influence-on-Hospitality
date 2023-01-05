import {defineStore} from "pinia";
import {parseCsv} from "@/utils/csvProcessor";
import {germanyKey, measures, regions} from "@/data/dataKeys";

export const useMeasuresStore = defineStore('measures', {
    state: () => {
        let emptyListForAllRegions = {}
        for (const region in regions) {
            emptyListForAllRegions[region.key] = []
        }
        emptyListForAllRegions[germanyKey] = []

        let measuresWithEmptyListsForAllRegions = {}
        for (const measure in measures) {
            // object holding a list of {day: "aDay", value: 0} for each region and germany
            measuresWithEmptyListsForAllRegions[measure.key] = structuredClone(emptyListForAllRegions)
        }

        return {
            ...measuresWithEmptyListsForAllRegions,
            loading: false,
        }
    },
    getters: {
        byDate(state) {
            return (date) => state.find((measure) => measure.date === date)
        },
    },
    actions: {
        async loadMeasures() {
            this.loading = true
            console.log("loading measures from file...")

            // parse as array of rows
            const records = await parseCsv("./data/Lockdown data-V6.0.csv")

            const extractByMeasure = (measureKey, measureZpid) => {
                for (const region in regions) {
                    let lockDownRow = records.find((record) => (record.state === region.zpid && record.Measure === measureZpid))
                    delete lockDownRow.state
                    delete lockDownRow.Measure
                    this[measureKey][region.key] = Object.entries(lockDownRow).map(([day, value]) => ({day, value}));
                }

                // TODO calc germany values
            }

            for (const measure in measures) {
                extractByMeasure(measure.key, measure.zpid)
            }

            this.loading = false;
        }
    }
})