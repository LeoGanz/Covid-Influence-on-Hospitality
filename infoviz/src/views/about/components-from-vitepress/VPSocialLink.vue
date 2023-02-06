<script>

import {icons} from "@/views/about/components-from-vitepress/socialicons";

export default {
  props: ['icon', 'link'],
  computed: {
    svg() {
      if (typeof this.icon === 'object') return this.icon.svg
      return icons[this.icon]
    }
  }
}
</script>

<template>
  <a
      class="VPSocialLink"
      :href="link"
      target="_blank"
      rel="noopener"
      v-html="svg"
  >
  </a>
</template>

<style scoped>
.VPSocialLink {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  color: rgba(60, 60, 67, 0.7);
  /*color: var(--vp-c-text-2);*/
  transition: color 0.5s;
}

.VPSocialLink:hover {
  color: rgba(60, 60, 67, 0.92);
  /*color: var(--vp-c-text-1);*/
  transition: color 0.25s;
}

.VPSocialLink > :deep(svg) {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
</style>
