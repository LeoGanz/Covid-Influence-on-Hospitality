<template>
  <main>
    <TheWelcome class="welcome_block"/>
    <Line_block />
  </main>
</template>

<script>
import TheWelcome from './Description_block.vue'
import Line_block from "./Line_block.vue";
export default {
  components: {Line_block, TheWelcome}
}
</script>

<style>

.welcome_block{

}

</style>