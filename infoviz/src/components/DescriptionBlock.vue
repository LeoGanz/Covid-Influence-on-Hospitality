<template>
  <div>
    <h1>Influence Of Corona On Hospitality In Germany</h1>
    Click on any state on the map to get more details about it. Use the slider
    at the bottom of the screen to change the current point in time.
    <select @change="selectId">
      <option :value="germanyKey">Deutschland (gesamt)</option>
      <option v-for="region in regions" :key="region.key" :value="region.key">
        {{ region.covid }}
      </option>
    </select>
  </div>
</template>

<script>
import { useCurrentRegionStore } from "@/stores/currentRegion";
import { regions, germanyKey } from "@/data/dataKeys";
export default {
  name: "description-blick",
  setup() {
    const currentRegionStore = useCurrentRegionStore();
    return { currentRegionStore, regions, germanyKey };
  },
  methods: {
    selectId(e) {
      this.currentRegionStore.updateRegion(e.target.value);
    },
  },
};
</script>

<style>
h1 {
  font-size: 28px;
}
</style>
