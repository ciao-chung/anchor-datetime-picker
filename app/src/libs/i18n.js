import Vue from 'vue'
import i18nText from 'libs/i18nText'
class i18n {
  constructor() {
    this.fallback = null
    this.getClientLanguage = null
    this.languages = []
    this.text = i18nText
  }

  launch(data, getClientLanguage) {
    this.fallback = data.fallback
    this.languages = data.languages
    this.getClientLanguage = getClientLanguage
    window.i18n = (string, variable = null) => this.i18n(string, variable)
    Vue.filter('i18n', (string, variable = null) => this.i18n(string, variable))
    Vue.prototype.i18n = (string, variable = null) => this.i18n(string, variable)
    Vue.prototype.i18nRoute = (route) => {
      if(!route.params) route.params = {}
      if(!route.params.language) route.params.language = this.getClientLanguage() || this.fallback
      return route
    }
  }

  i18n(string, variable = null) {
    if(!string) return string
    let language = !!this.text[this.getClientLanguage()] ? this.getClientLanguage() : this.fallback
    if(!this.text[language]) return string
    if(this.text[language][string] === undefined) return string
    return this._handleI18n(this.text[language][string], variable)
  }

  _handleI18n(string, variable) {
    if(typeof variable != 'object') return string

    for(const key in variable) {
      const value = variable[key]
      const patten = new RegExp(`{{${key}}}`, 'g')
      string = string.replace(patten, value)
    }
    return string
  }

  createClientLanguage(routeLanguage = null) {
    let result = routeLanguage
    if(!result) result = navigator.language || navigator.userLanguage
    if(!result) result = this.fallback
    return result
  }
}

export default new i18n()