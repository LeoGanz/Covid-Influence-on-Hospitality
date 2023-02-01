import { defineStore } from "pinia";

export const useSliderStore = defineStore({
  id: "slider",
  state: () => ({
    moving: false,
  }),
});
