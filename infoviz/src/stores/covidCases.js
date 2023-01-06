import { defineStore } from "pinia";

export const useCovidCasesStore = defineStore("cases", {
  state: () => {
    return {
      cases: [],
      loading: false,
      initialized: false,
    };
  },
  getters: {},
  actions: {
    async initValues() {
      if (this.initialized) {
        console.log("Cases already initialized");
        return;
      }
      this.loading = true;
      console.log("processing covid cases from website...");

      await fetch("https://api.corona-zahlen.org/germany/history/cases")
        .then(
          (body) => body.json(),
          (reason) => console.log("Cases could not be processed: ", reason)
        )
        .then(
          (data) =>
            (this.cases = data.data.map((datapoint) => {
              return {
                day: datapoint.date.split("T")[0],
                value: datapoint.cases,
              };
            })),
          (reason) => console.log("Cases could not be processed: ", reason)
        );

      this.loading = false;
      this.initialized = true;
      console.log("Covid cases processed");
    },
  },
});
