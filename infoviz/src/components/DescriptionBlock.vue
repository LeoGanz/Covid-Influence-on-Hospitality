<template>
  <div>
    <h1>Influence Of Corona On Hospitality In Germany</h1>
    Click on any state on the map to get more details about it. Use the slider at the bottom of the screen to change the current point in time.
    <p>Current date: {{ moment(useDateStore().count * 1).format('YYYY-MM-DD') }}</p>
  </div>
</template>



<script setup>
import { useDateStore } from '../stores/selectedDate.js';
import moment from 'moment';

</script>

<style>
  h1 {
    font-size: 28px;
  }
</style>
