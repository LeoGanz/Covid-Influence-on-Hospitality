<template>
  <div>
    <input
      ref="slider"
      type="range"
      :min="startTimestamp"
      :max="endTimestamp"
      v-model="currentTimestamp"
      @input="updateCurrentDate"
    />
    <div class="slider-value" :style="{ left: thumbLeft }">
      {{ currentDate }}
    </div>
    <div class="legend">
      <p>{{ dateStore.formatTimestampDate(startTimestamp) }}</p>
      <p>{{ dateStore.formatTimestampDate(endTimestamp) }}</p>
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
      return this.dateStore.formatTimestampDate(this.currentTimestamp * 1);
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
      let sliderWidth = slider.offsetWidth;
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
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  margin: 30px 0;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 6px;
  background: #c2c2c2;
  border-radius: 3px;
  cursor: pointer;
  animate: 0.2s;
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
  left: 0%;
}

.legend {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
}
</style>
