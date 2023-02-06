<template>
  <main>
    <div class="horizontal_flex">
      <div class="left_boxes">
        <DescriptionBlock class="block description_block" />
        <div>
        <LineBlock class="block line_block" />
        <SliderBlock class="block slider_block" />
        </div>
      </div>
      <div class="right_boxes">
        <BarBlock class="block bar_block" />
        <MapBlock class="block map_block" />
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
import { useDateStore } from "@/stores/date";
import { useRoute, useRouter } from "vue-router";
import { useCurrentRegionStore } from "@/stores/currentRegion";
import { useSliderStore } from "../stores/slider";

export default {
  setup() {
    const dateStore = useDateStore();
    const regionStore = useCurrentRegionStore();
    const sliderStore = useSliderStore();
    const router = useRouter();
    const route = useRoute();

    function updateRouteWithParams() {
      if (!sliderStore.moving) {
        router.push({
          name: route.name,
          query: {
            date: dateStore.currentDate,
            region: regionStore.currentRegion,
          },
        });
      }
    }

    sliderStore.$subscribe(() => {
      updateRouteWithParams();
    });

    regionStore.$subscribe(() => {
      updateRouteWithParams();
    });

    return {
      dateStore,
      regionStore,
      sliderStore,
    };
  },
  // apply changes entered in url field to the store
  beforeRouteEnter(to, from) {
    console.log("Parsing query params from url and updating stores");
    const dateStore = useDateStore();
    const regionStore = useCurrentRegionStore();
    if (to.query.date) {
      dateStore.setCurrentByDateString(to.query.date);
    }
    if (to.query.region) {
      regionStore.updateRegion(to.query.region);
    }
  },
  components: {
    SliderBlock,
    LineBlock,
    DescriptionBlock,
    MapBlock,
    BarBlock,
  },
};
</script>

<style>

.popper-style {
  transition-delay:1s;
}

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
  height: 250px;
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
/*  display: flex;
  flex-flow: column;*/
  background-color: #f5f5f5;
  height: 120px;
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
  border: none;
  background-color: inherit;
  font-size: 15px;
  cursor: pointer;
  display: inline-block;
  color: #2c3e50;
  margin-left: -5px;
  margin-top: 20px;
  margin-bottom: 12px;
  text-decoration: underline;
}

.aboutbutton:hover {
  color: #6246c9;
}

.material-icons {
  font-size: 1.25em;
  color: #cbcbce;
  cursor: default;
}

:root {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: #333333;
  --popper-theme-border-radius: 16px;
  --popper-theme-padding: 25px;
  --popper-theme-box-shadow: 0 0px 1000px 50px rgba(0, 0, 0, 0.6);
}
.popper {
  width: 600px;
}

.popper p {
  hyphens: auto;
  text-align: justify
}

</style>
