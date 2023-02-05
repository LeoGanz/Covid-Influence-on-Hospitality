<template>
  <div class="slider">
    <div class="left">
      <div class="button">
        <i
          class="material-icons"
          v-if="!autoplayEnabled"
          @click="toggleAutoplayEnabled"
          >play_circle</i
        >
        <i class="material-icons" v-else @click="toggleAutoplayEnabled"
          >pause_circle</i
        >
      </div>
    </div>
    <div class="right">
      <div class="slider-value" :style="{ left: thumbLeft }">
        <p class="greyLabel">Current Date:&nbsp; </p> {{ dateStore.currentHumanReadable }}
      </div>
      <input
        ref="slider"
        type="range"
        :min="dateStore.start"
        :max="dateStore.end"
        step="10000"
        v-model="dateStore.current"
        @input="calculateThumbLeft"
        @mouseover="toggleAutoplayPaused"
        @mouseleave="toggleAutoplayPaused"
        @pointerdown="sliderStore.moving = true"
        @pointerup="sliderStore.moving = false"
      />
      <div class="legend">
        <p>{{ dateStore.startHumanReadable }}</p>
        <p>{{ dateStore.endHumanReadable }}</p>
      </div>
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
      autoplayEnabled: false,
      autoplayPaused: false,
      timer: null,
    };
  },
  methods: {
    calculateThumbLeft() {
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
    toggleAutoplayEnabled() {
      this.autoplayEnabled = !this.autoplayEnabled;
      this.updateTimer();
    },
    toggleAutoplayPaused() {
      this.autoplayPaused = !this.autoplayPaused;
      this.updateTimer();
    },
    updateTimer() {
      if (this.autoplayEnabled && !this.autoplayPaused) {
        this.sliderStore.moving = true;
        this.timer = setInterval(() => {
          this.dateStore.incrementCurrentByOneDay();
        }, 100);
      } else {
        this.sliderStore.moving = false;
        clearInterval(this.timer);
      }
    },
  },
  mounted() {
    this.thumbLeft = this.calculateThumbLeft();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style>
.slider {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.left {
  width: 10%;
  display: flex;
  flex-direction: column;
}

.right {
  width: 90%;
  display: flex;
  flex-direction: column;
}

input[type="range"] {
  -webkit-appearance: none;
  width: 93%;
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
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
  display: flex;
  flex-direction: row;
  color: #19191c;
  margin-top: -20px;
  margin-bottom: -10px;
}

.greyLabel {
  color: #949494;
}


.slider i {
  font-size: 3em;
  cursor: pointer;
  color: #656565;
}
.slider i:hover {
  color: #333333;
}

.legend {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-right: 32px;
  color: #949494;
}

.button {
  margin-top: 4px;
}
</style>
