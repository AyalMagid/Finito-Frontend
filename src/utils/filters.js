import Vue from "vue";
const moment = require("moment");

Vue.filter("relativeTime", (val) => {
  return moment(val).fromNow();
});


