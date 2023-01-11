<template>
  <div>
    Here comes the Bar chart!
    <D3BarChart :config="chart_config" :datum="chart_data"></D3BarChart>
  </div>
</template>

<script>
import * as d3 from "d3";
import { D3BarChart} from "vue-d3-charts";
console.log(D3BarChart)
export default {
  components: {
    D3BarChart,
  },
  data() {
    return {
      chart_config: {
        key: false,
        values: false,
        axis: {
          yTitle: false,
          xTitle: false,
          yFormat: ".0f",
          xFormat: ".0f",
          yTicks: 10,
          xTicks: 10,
        },
        color: {
          key: false,
          keys: false,
          scheme: false,
          current: "#1f77b4",
          default: "#AAA",
          axis: "#000",
        },
        currentKey: false,
        labelRotation: 0,
        margin: {
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        },
        orientation: "vertical",
        tooltip: {label: false},
        transition: {
          duration: 350,
          ease: "easeLinear",
        }
      },
      chart_data :[
          {
        name: "Lorem",
        total: 30
      },{
        name: "Ipsum",
        total: 21
      },{
        name: "Dolor",
        total: 20
      }]
    };
  },
};

</script>



<style>

</style>