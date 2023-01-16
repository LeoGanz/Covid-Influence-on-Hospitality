import { defineStore } from 'pinia'

export const useDateStore = defineStore("counter", {
  state: () => {
    return {
      count: 1578355200000, // 2020-01-07
    };
  },
  getters: {},
});
