import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'prismjs'
import 'prismjs/themes/prism.css'
import helper from 'libs/helper.js'
import setupTextAndI18n from 'mainMixins/setupTextAndI18n.js'
import crosstab from 'crosstab'
import VueClipboard from 'vue-clipboard2'
import _cloneDeep from 'lodash.clonedeep'
window._cloneDeep = _cloneDeep
import moment from 'moment'
Vue.prototype.$moment = moment
Vue.use(VueClipboard)

import VueDatetimePicker from 'components/installer.js'
Vue.use(VueDatetimePicker)

window.crosstab = crosstab
Vue.config.productionTip = false
Vue.prototype.PROJECT_CODE = PROJECT_CODE
Vue.prototype.PROJECT_NAME = PROJECT_NAME

import code from 'partials/code.vue'
Vue.component('v-code', code)
window.rootComponent = new Vue({
  mixins: [setupTextAndI18n],
  router,
  store,
  vuetify,
  beforeDestroy() {
    this.$root.$off('changeLanguage')
  },
  created() {
    this.$root.$on('changeLanguage', this.changeLanguage)
    this.init()
  },
  mounted() {
    this.$vDatetimePicker.locale = this.locale
  },
  methods: {
    async init() {
      window.helper = helper
      Vue.prototype.$helper = helper

      setTimeout(() => {
        this.loadText()
        this.$nextTick(() => {
          window.rootComponent.$mount('#app')
        })
      }, 200)
    },
  },
  computed: {
    locale() {
      return this.$store.getters['locale/locale']
    },
  },
  render: h => h(App)
})
