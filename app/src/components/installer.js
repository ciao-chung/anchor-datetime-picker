import Vue from 'vue'
import app from './app'
class Installer {
  constructor() {
    this.isInstalled = false
    this.emitter = new Vue()
  }
  install(Vue, options = null) {
    if(this.isInstalled) return
    this.isInstalled = true
    Vue.prototype.$vDatetimePicker = {
      locale: null,
      ...options,
    }
    Vue.component('v-datetime-picker', app)
  }
}

export default new Installer()