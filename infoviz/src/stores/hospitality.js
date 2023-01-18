import { defineStore } from "pinia";
import hospitalityGer from "@/data/UmsatzBranchenDE-utf8.csv";
import hospitalityRegions from "@/data/UmsatzBL-utf8.csv";
import { germanyKey, regions, sectors } from "@/data/dataKeys";

let buildSectorTimelines = () => {
  return {
    real: {
      original: [],
      adjusted: [],
    },
    nominal: {
      original: [],
      adjusted: [],
    },
  };
};
let buildRegionTimelines = () => {
  return {
    real: {
      original: [],
      difference: [],
    },
    nominal: {
      original: [],
      difference: [],
    },
  };
};
export const useHospitalityStore = defineStore("hospitality", {
  state: () => {
    let revenue = {};
    for (const region of regions) {
      revenue[region.key] = buildRegionTimelines();
    }
    revenue[germanyKey] = {};
    for (const sector of sectors) {
      revenue[germanyKey][sector.key] = buildSectorTimelines();
    }

    return {
      // All revenue values are relative to 2015 values which is 100%
      // difference timelines show difference to the previous year in %
      // real -> adjusted for inflation
      // nominal -> not adjusted for inflation

      // revenue: {
      //   germany: {
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
      //   badenWuerttemberg: {      ---| data is not available for all regions (-> empty timelines)
      //     real: {
      //       original: [],
      //       difference: [],
      //     },
      //     nominal: {
      //       original: [],
      //       difference: [],
      //     },
      //   }
      // },
      revenue,
      loading: false,
      initialized: false,
    };
  },
  getters: {
    getSectorsByMonth: (state) => (monthYear) => {
      // month as "2020-01"
      let matchingMonth = (item) => item.month === monthYear;
      let values = {
        real: {
          original: {},
          adjusted: {},
        },
        nominal: {
          original: {},
          adjusted: {},
        },
      };
      for (const sector of sectors) {
        values.real.original[sector.key] =
          state.revenue[germanyKey][sector.key].real.original.find(
            matchingMonth
          )?.value;
        values.real.adjusted[sector.key] =
          state.revenue[germanyKey][sector.key].real.adjusted.find(
            matchingMonth
          )?.value;
        values.nominal.original[sector.key] =
          state.revenue[germanyKey][sector.key].nominal.original.find(
            matchingMonth
          )?.value;
        values.nominal.adjusted[sector.key] =
          state.revenue[germanyKey][sector.key].nominal.adjusted.find(
            matchingMonth
          )?.value;
      }
      return values;
    },
    //method to get regions by day
    getRegionsByMonth: (state) => (month) => {
      // month as "2020-01"
      let matchingMonth = (item) => item.month === month;
      let values = {
        real: {
          original: {},
          difference: {},
        },
        nominal: {
          original: {},
          difference: {},
        },
      };
      for (const region of regions) {
        values.real.original[region.key] =
          state.revenue[region.key].real.original.find(matchingMonth)?.value;
        values.real.difference[region.key] =
          state.revenue[region.key].real.difference.find(matchingMonth)?.value;
        values.nominal.original[region.key] =
          state.revenue[region.key].nominal.original.find(matchingMonth)?.value;
        values.nominal.difference[region.key] =
          state.revenue[region.key].nominal.difference.find(
            matchingMonth
          )?.value;
      }
      return values;
    },
  },
  actions: {
    initValues() {
      if (this.initialized) {
        console.log("Hospitality already initialized");
        return;
      }

      this.loading = true;
      console.log("processing hospitality data from csv...");

      for (const sector of sectors) {
        hospitalityGer
          .filter((record) => record.typ === sector.genesis)
          .reduce((acc, record) => {
            let month = record.jahr + "-" + getMonthNumber(record.monat);
            acc.real.original.push({ month: month, value: record.real });
            acc.real.adjusted.push({
              month: month,
              value: record["real-bereinigt"],
            });
            acc.nominal.original.push({ month: month, value: record.nominal });
            acc.nominal.adjusted.push({
              month: month,
              value: record["nominal-bereinigt"],
            });
            return acc;
          }, this.revenue[germanyKey][sector.key]);
      }

      for (const region of regions) {
        hospitalityRegions
          .filter((record) => record.bundesland === region.genesis)
          .reduce((acc, record) => {
            let month = record.jahr + "-" + getMonthNumber(record.monat);
            acc.real.original.push({ month: month, value: record.real });
            acc.real.difference.push({
              month: month,
              value: record["real-veraenderung"],
            });
            acc.nominal.original.push({ month: month, value: record.nominal });
            acc.nominal.difference.push({
              month: month,
              value: record["nominal-veraenderung"],
            });
            return acc;
          }, this.revenue[region.key]);
      }

      this.initialized = true;
      this.loading = false;

      console.log("hospitality processed");
    },
  },
});

function getMonthNumber(month) {
  switch (month) {
    case "Januar":
      return "01";
    case "Februar":
      return "02";
    case "März":
      return "03";
    case "April":
      return "04";
    case "Mai":
      return "05";
    case "Juni":
      return "06";
    case "Juli":
      return "07";
    case "August":
      return "08";
    case "September":
      return "09";
    case "Oktober":
      return "10";
    case "November":
      return "11";
    case "Dezember":
      return "12";
    default:
      return "00";
  }
}
