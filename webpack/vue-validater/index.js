var Vue = require('vue')
var validator = require('vue-validator')
    
Vue.use(validator);
new Vue({
  data: {
    threshold: 50,
    minValue: 0, // for `min` validator
    maxValue: 100 // for `max` validator
  },
  ready: function () {
    // change validator argument
    this.$set('min', -50)
    this.$set('max', 100)
  }
}).$mount('#config-form')