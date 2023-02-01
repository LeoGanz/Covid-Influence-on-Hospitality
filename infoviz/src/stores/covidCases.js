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

        const states = fetch(
          "https://api.corona-zahlen.org/states/history/incidence"
        )
          .then(
            (body) => body.json(),
            (reason) => console.log("Cases could not be processed: ", reason)
          )
          .then(
            (data) => {
              Object.values(data.data).forEach((element) => {
                var key = regions.find(
                  (region) => region.covid == element.name
                ).key;
                this.cases[key] = element.history.map((datapoint) => {
                  return {
                    day: datapoint.date.split("T")[0],
                    value: datapoint.weekIncidence,
                  };
                });
              });
            },
            (reason) => console.log("Cases could not be processed: ", reason)
          );

        const germany = fetch(
          "https://api.corona-zahlen.org/germany/history/incidence"
        )
          .then(
            (body) => body.json(),
            (reason) => console.log("Cases could not be processed: ", reason)
          )
          .then(
            (data) => {
              this.cases[germanyKey] = Object.values(data.data).map(
                (element) => {
                  return {
                    day: element.date.split("T")[0],
                    value: element.weekIncidence,
                  };
                }
              );
            },
            (reason) => console.log("Cases could not be processed: ", reason)
          );

        await Promise.all([states, germany]);

        this.loading = false;
        this.initialized = true;
        console.log("Covid cases processed");
      }
    },
  },
});
