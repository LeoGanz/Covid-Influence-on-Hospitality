import { defineStore } from "pinia";
import moment from "moment";

export const useDateStore = defineStore("counter", {
  state: () => {
    return {
      count: 1578355200000, // 2020-01-07
    };
  },
  getters: {
    formatted(state) {
      return moment(state.count * 1).format("YYYY-MM");
    },
  },
});
