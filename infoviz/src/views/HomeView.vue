<template>
  <main>
    <div class="horizontal_flex">
      <div class="left_boxes">
        <DescriptionBlock class="block description_block"/>
        <LineBlock class="block line_block"/>
        <SliderBlock class="block slider_block"/>
        <div>
          <router-link to="/about">
            <button @click="navigate" class="aboutbutton">about</button>
          </router-link>
          <router-link to="/test">
            <button @click="navigate" class="aboutbutton">test</button>
          </router-link>
        </div>
      </div>
      <div class="right_boxes">
        <BarBlock class="block bar_block"/>
        <MapBlock class="block map_block"/>
      </div>
    </div>
  </main>
</template>

<script>
import DescriptionBlock from "@/components/DescriptionBlock.vue";
import LineBlock from "@/components/Linechart/LineBlock.vue";
import MapBlock from "@/components/Map/MapBlock.vue";
import SliderBlock from "@/components/SliderBlock.vue";
import BarBlock from "@/components/Barchart/BarBlock.vue";
import BarChart from "@/components/Barchart/BarChart.vue";
import {useDateStore} from "@/stores/date";
import {useRoute, useRouter} from "vue-router";
import {useCurrentRegionStore} from "@/stores/currentRegion";

export default {
  setup() {
    const dateStore = useDateStore()
    const regionStore = useCurrentRegionStore()
    const router = useRouter()
    const route = useRoute()

    function updateRouteWithParams() {
      router.push({
        name: route.name,
        query: {
          date: dateStore.currentDate,
          region: regionStore.currentRegion
        }
      })
    }

    dateStore.$subscribe(() => {
      updateRouteWithParams();
    })
    regionStore.$subscribe(() => {
      updateRouteWithParams();
    })

    return {
      dateStore,
      regionStore,
    }
  },
  // apply changes entered in url field to the store
  beforeRouteEnter(to, from) {
    console.log("Parsing query params from url and updating stores")
    const dateStore = useDateStore()
    const regionStore = useCurrentRegionStore()
    if (to.query.date) {
      dateStore.setCurrentByDateString(to.query.date)
    }
    if (to.query.region) {
      regionStore.updateRegion(to.query.region)
    }
  },
  components: {
    SliderBlock,
    LineBlock,
    DescriptionBlock,
    MapBlock,
    BarBlock,
    BarChart,
  },
};
</script>

<style>
.block {
  border-radius: 16px;
  margin-top: 32px;
}

.left_boxes {
  width: 900px;
  margin-right: 32px;
}

.right_boxes {
  width: 685px;
}

.description_block {
  height: 225px;
}

.line_block {
  padding: 32px 16px;
  display: flex;
  flex-flow: column;
  background-color: #f5f5f5;
  height: 437px;
}

.slider_block {
  padding: 32px 16px;
  display: flex;
  flex-flow: column;
  background-color: #f5f5f5;
  height: 150px;
}

.bar_block {
  padding: 32px 16px;
  display: flex;
  flex-flow: column;
  background-color: #f5f5f5;
  height: 325px;
}

.map_block {
  padding: 32px 16px;
  background-color: #f5f5f5;
  height: 516px;
}

.horizontal_flex {
  display: flex;
}

.aboutbutton {
  background-color: #f5f5f5;
  color: black;
  border-radius: 16px;
  border: none;
  padding: 16px 32px;
  text-align: center;
  font-size: 14px;
  margin: 24px 0px;
  transition-duration: 0.4s;
}

.aboutbutton:hover {
  background-color: #555555;
  color: white;
  transition-duration: 0.4s;
}
</style>
