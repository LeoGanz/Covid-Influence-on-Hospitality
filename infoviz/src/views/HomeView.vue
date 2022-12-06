<template>
  <div>
    <router-link
        to="/about"
        custom
        v-slot="{ navigate }"
    >
      <button
          @click="navigate"
          role="link"
      >
        about
      </button>
    </router-link>
  </div>
  <main>
    <div class="horizontal_flex">
      <div class="left_boxes">
        <Description_block class="block description_block"/>
        <Line_block class="block line_block"/>
        <Slider_block class="block slider_block"/>
      </div>
      <Map_block class="block map_block"/>
    </div>
  </main>
</template>

<script>
import Description_block from '../components/Description_block.vue'
import Line_block from "../components/Line_block.vue";
import Map_block from "../components/Map_block.vue";
import Slider_block from "../components/Slider_block.vue";

export default {
  components: {Slider_block, Line_block, Description_block, Map_block}
}
</script>

<style>

  .block {
    width: 600px;
    border-radius: 16px;
    margin-top: 48px;
  }

  .description_block {
    height: 150px;
  }

  .line_block {
    padding: 32px 16px;
    background-color: #F5F5F5;
    height: 350px;
  }

  .slider_block {
    padding: 32px 16px;
    background-color: #F5F5F5;
    height: 150px;
  }

  .map_block {
    padding: 32px 16px;
    background-color: #F5F5F5;
    height: 746px;
  }

  .horizontal_flex {
    display: flex;
  }

  .left_boxes {
    margin-right: 48px;
  }

</style>