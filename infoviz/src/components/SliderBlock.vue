<template>
  <div class="slider">
    <input
      ref="slider"
      type="range"
      :min="startTimestamp"
      :max="endTimestamp"
      step="10000"
      v-model="currentTimestamp"
      @input="updateCurrentDate"
    />
    <div class="slider-value" :style="{ left: thumbLeft }">
      {{ currentDate }}
    </div>
    <div class="legend">
      <p>{{ dateStore.formatSlider(startTimestamp) }}</p>
      <p>{{ dateStore.formatSlider(endTimestamp) }}</p>
    </div>
  </div>
</template>

<script>
import { useDateStore } from "../stores/selectedDate.js";

export default {
  data() {
    const dateStore = useDateStore();
    return {
      startTimestamp: new Date("2020-01-07").getTime(),
      endTimestamp: new Date("2023-01-14").getTime(),
      currentTimestamp: new Date("2020-01-07").getTime(),
      thumbLeft: "0%",
      dateStore,
    };
  },
  computed: {
    currentDate() {
      return this.dateStore.formatSlider(this.currentTimestamp);
    },
  },
  methods: {
    updateCurrentDate(event) {
      this.currentTimestamp = event.target.value;
      this.thumbLeft = this.calculateThumbLeft();
      this.dateStore.setNewDate(event.target.value);
    },
    calculateThumbLeft() {
      let slider = this.$refs.slider;
      let sliderWidth = slider.offsetWidth * 0.9;
      let thumbWidth =
        (slider.offsetWidth / (this.endTimestamp - this.startTimestamp)) *
        sliderWidth;
      let position =
        ((this.currentTimestamp - this.startTimestamp) /
          (this.endTimestamp - this.startTimestamp)) *
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
  left: 10%;
}

.legend {
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
}
</style>
