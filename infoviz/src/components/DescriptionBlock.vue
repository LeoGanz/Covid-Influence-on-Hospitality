<template>
  <div class="description">
    <h1>Influence Of Corona On Hospitality In Germany</h1>
    <div class="description_subsection">
      <h2>Controls</h2>
      Click on any state on the map or on a category tab to select the data you want to see.<br>
      Use the slider at the bottom of the screen to change the current point in time.
    </div>
    <div class="description_subsection">
      <h2>Data</h2>
      <div >
        Hospitality data is provided in percent of the revenue of the same month in 2015.
        <Popper placement="right" hover="true" arrow="true">
          <i class="material-icons">info</i>
          <template #content>
            <div>
              <h2>Hospitality Data</h2>
              Hospitality data is provided by the Federal Statistical Office of Germany.
              <p>
                Data by <i>sectors</i> can be found in data set 45213-0005:
                <a href="https://www-genesis.destatis.de/genesis//online?operation=table&code=45213-0005" target="_blank" rel="noopener noreferrer">
                  <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
                </a><br>
                Data by <i>regions</i> can be found in data set 45213-0014:
                  <a href="https://www-genesis.destatis.de/genesis//online?operation=table&code=45213-0014" target="_blank" rel="noopener noreferrer">
                    <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
                  </a><br>
              </p>
            </div>
          </template>
        </Popper>
      </div>
      <div>
        Covid data is provided as the 7-day-incidence per 100.000 inhabitants.
        <Popper placement="right" hover="true" arrow="true">
          <i class="material-icons">info</i>
          <template #content>
            <div>
              <h2>Covid Data</h2>
              Covid data is provided by "Robert Koch-Institut API - by Marlon Lückert" which sources its data directly
              from the Robert Koch Institute.
              <a href="https://api.corona-zahlen.org" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
              </a><br>
            </div>
          </template>
        </Popper>
      </div>
    </div>


  </div>
</template>

<script>
//<select @change="selectId">
//      <option :value="germanyKey">Germany (overall)</option>
//      <option v-for="region in regions" :key="region.key" :value="region.key">
//        {{ region.covid }}
//      </option>
//    </select>
import {useCurrentRegionStore} from "@/stores/currentRegion";
import {regions, germanyKey} from "@/data/dataKeys";
import Popper from "vue3-popper";

export default {
  name: "description-block",
  components: {
    Popper,
  },
  setup() {
    const currentRegionStore = useCurrentRegionStore();
    return {currentRegionStore, regions, germanyKey};
  },
  methods: {
    selectId(e) {
      this.currentRegionStore.updateRegion(e.target.value);
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 32px;
}

:deep(.popper) {
  width: 600px;
}

.description {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: #333333;
  --popper-theme-border-radius: 16px;
  --popper-theme-padding: 20px;
  --popper-theme-box-shadow: 0 0px 200px -6px rgba(0, 0, 0, 0.8);
}
.description_subsection {
  padding: 10px 0px;
}

.material-icons {
  font-size: 1.25em;
  color: #656565;
  vertical-align: -2px;
}

</style>
