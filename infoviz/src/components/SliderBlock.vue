<template>
  <div class="slider">
    <input
      ref="slider"
      type="range"
      :min="dateStore.start"
      :max="dateStore.end"
      step="10000"
      v-model="dateStore.current"
      @input="calculateThumbLeft"
      @mouseleave="sliderStore.moving = false"
    />
    <div class="slider-value" :style="{ left: thumbLeft }">
      {{ dateStore.currentHumanReadable }}
    </div>
    <div class="legend">
      <p>{{ dateStore.startHumanReadable }}</p>
      <p>{{ dateStore.endHumanReadable }}</p>
    </div>
  </div>
</template>

<script>
import { useDateStore } from "@/stores/date";
import { useSliderStore } from "@/stores/slider";

export default {
  data() {
    const dateStore = useDateStore();
    const sliderStore = useSliderStore();
    return {
      thumbLeft: "0%",
      dateStore,
      sliderStore,
    };
  },
  methods: {
    calculateThumbLeft() {
      this.sliderStore.moving = true;
      let slider = this.$refs.slider;
      let sliderWidth = slider.offsetWidth * 0.9;
      let thumbWidth =
        (slider.offsetWidth / (this.dateStore.end - this.dateStore.end)) *
        sliderWidth;
      let position =
        ((this.dateStore.current - this.dateStore.start) /
          (this.dateStore.end - this.dateStore.start)) *
        (sliderWidth - thumbWidth);
      return `${(position / sliderWidth) * 90}%`;
    },
  },
  mounted() {
    this.thumbLeft = this.calculateThumbLeft();
  },
};
</script>

<style>
.slider {
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
}

input[type="range"] {
  -webkit-appearance: none;
  width: 70%;
  margin: 30px 0;
}

input[type="range"]::-webkit-slider-runnable-track {
  width: 50%;
  height: 6px;
  background: #c2c2c2;
  border-radius: 3px;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.25);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #656565;
  border: 4px solid #ffffff;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -12px;
}

.slider-value {
  position: absolute;
  top: 20px;
  font-weight: 530;
  font-size: 20px;
  line-height: 23px;
  color: #19191c;
  margin-left: 16px;
}

.legend {
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
}
</style>
