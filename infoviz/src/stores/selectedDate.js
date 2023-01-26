import { defineStore } from "pinia";
import moment from "moment";

export const useDateStore = defineStore("date", {
  state: () => {
    return {
      date: 1578355200000, // 2020-01-07
    };
  },
  getters: {
    currentMonth(state) {
      return moment(state.date * 1).format("YYYY-MM");
    },
    currentDate(state) {
      return moment(state.date * 1).format("YYYY-MM-DD");
    },
    currentWrittenDate(state) {
      return moment(state.date * 1).format("MMM DD YYYY");
    },
    currentTimestamp(state) {
      return new Date(state.currentDate).getTime();
    },
  },
  actions: {
    setNewDate(timestamp) {
      this.date = timestamp * 1;
    },
    setNewDateByDateString(dateString) {
      this.date = moment(dateString).valueOf();
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    formatMonth(date) {
      return moment(date).format("YYYY-MM");
    },
    formatTimestampDate(timestamp) {
      //console.log(timestamp);
      var date = new Date(timestamp * 1);
      //console.log(date);
      var year = date.getFullYear();
      var month = (1 + date.getMonth()).toString().padStart(2, "0");
      var day = date.getDate().toString().padStart(2, "0");
      return year + "-" + month + "-" + day;
    },
    formatTimestampMonth(timestamp) {
      //console.log(timestamp);
      var date = new Date(timestamp * 1);
      //console.log(date);
      var year = date.getFullYear();
      var month = (1 + date.getMonth()).toString().padStart(2, "0");
      return year + "-" + month;
    },
    formatSlider(timestamp) {
      var date = new Date(timestamp * 1);
      return moment(date).format("MMM DD YYYY");
    },
  },
});
