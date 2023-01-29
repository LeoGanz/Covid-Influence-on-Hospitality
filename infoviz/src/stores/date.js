import {defineStore} from "pinia";
import moment from "moment";

export const useDateStore = defineStore("date", {
  state: () => {
    return {
      // watch out: this timestamp will be saved as a string as it is directly linked to a slider
      // stored as milliseconds
      current: new Date("2020-01-07").getTime(),
      start: new Date("2020-01-07").getTime(),
      end: new Date("2023-01-14").getTime(),
    };
  },
  getters: {
    currentMonth(state) {
      return moment(state.current * 1).format("YYYY-MM");
    },
    currentDate(state) {
      return moment(state.current * 1).format("YYYY-MM-DD");
    },
    currentHumanReadable() {
      return formatHumanReadable(this.current * 1);
    },
    startHumanReadable() {
      return formatHumanReadable(this.start * 1);
    },
    endHumanReadable() {
      return formatHumanReadable(this.end * 1);
    },
  },
  actions: {
    setCurrentByDateString(dateString) {
      let newDate = moment(dateString)
      if (newDate.isValid() && newDate.isBetween(moment(this.start), moment(this.end))) {
        console.log("Setting date to", newDate.format("YYYY-MM-DD"))
        this.current = newDate.valueOf()
      } else {
        console.warn('Invalid date (', dateString, '). Using default date instead.')
      }
    },
    incrementCurrentByOneDay() {
      if (this.current < this.end) {
        this.current = this.current * 1 + 24 * 60 * 60 * 1000; // millis of a day
      }
    }
  },
});

function formatHumanReadable(timestamp) {
  return moment(timestamp).format("MMM DD YYYY");
}
