<script >
import VPSocialLink from "@/views/about/components-from-vitepress/VPSocialLink.vue";

export default {
  components: {VPSocialLink},
  props: ['links'],
}
</script>

<template>
  <div class="VPSocialLinks">
    <VPSocialLink
        v-for="{ link, icon } in links"
        :key="link"
        :icon="icon"
        :link="link"
    />
  </div>
</template>

<style scoped>
.VPSocialLinks {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
