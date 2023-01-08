import { defineStore } from "pinia";
import { germanyKey, regions } from "@/data/dataKeys";

export const useCovidCasesStore = defineStore("cases", {
  state: () => {
    return {
      cases: {},
      loading: false,
      initialized: false,
    };
  },
  getters: {},
  actions: {
    async initValues() {
      if (this.initialized) {
        console.log("Cases already initialized");
      } else {
        this.loading = true;
        console.log("processing covid cases from website...");

        // if we need data per state: https://api.corona-zahlen.org/states/history/cases

        await fetch("https://api.corona-zahlen.org/states/history/cases")
          .then(
            (body) => body.json(),
            (reason) => console.log("Cases could not be processed: ", reason)
          )
          .then(
            (data) => {
              const cases = {};
              const totalCases = {};
              Object.values(data.data).forEach((element) => {
                var key = regions.find(
                  (region) => region.covid == element.name
                ).key;
                cases[key] = element.history.map((datapoint) => {
                  return {
                    day: datapoint.date.split("T")[0],
                    value: datapoint.cases,
                  };
                });
                cases[key].forEach((datapoint) => {
                  if (totalCases[datapoint.day] === undefined) {
                    totalCases[datapoint.day] = datapoint.value;
                  } else {
                    totalCases[datapoint.day] += datapoint.value;
                  }
                });
              });
              cases[germanyKey] = [];
              for (var day in totalCases) {
                cases[germanyKey].push({ day: day, value: totalCases[day] });
              }
              this.cases = cases;
            },
            (reason) => console.log("Cases could not be processed: ", reason)
          );

        this.loading = false;
        this.initialized = true;
        console.log("Covid cases processed");
      }
    },
  },
});
