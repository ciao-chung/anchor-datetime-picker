import Vue from 'vue'
import app from './app'
class Installer {
  constructor() {
    this.isInstalled = false
    this.emitter = new Vue()
    this.config = {}
  }
  install(Vue, options = null) {
    if(this.isInstalled) return
    this.isInstalled = true
    this.config = Vue.observable({
      locale: null,
      ...options,
    })
    Vue.prototype.$vDatetimePicker = this.config
    Vue.component('v-datetime-picker', app)
  }
}

export default new Installer()