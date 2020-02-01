import Vue from 'vue'
class i18n {
  constructor() {
    this.fallback = null
    this.getClientLanguage = null
    this.languages = []
    this.text = null
  }

  _getLanguageCodes() {
    return this.languages.map(language => language.code)
  }

  init(fallback, languages) {
    this.fallback = fallback
    this.languages = languages
  }

  launch(data, getClientLanguage) {
    this.text = data.text
    this.getClientLanguage = getClientLanguage
    window.i18n = (string, variable = null) => this.i18n(string, variable)
    Vue.filter('i18n', (string, variable = null) => this.i18n(string, variable))
    Vue.prototype.i18n = (string, variable = null) => this.i18n(string, variable)

    window.i18nData = (data, variable = null) => this.i18nData(data, variable)
    Vue.filter('i18nData', (data, variable = null) => this.i18nData(data, variable))
    Vue.prototype.i18nData = (data, variable = null) => this.i18nData(data, variable)

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
    if(!this.text[language][string]) return string
    return this._handleI18n(this.text[language][string], variable)
  }

  i18nData(data, variable = null) {
    let language = !!this.text[this.getClientLanguage()] ? this.getClientLanguage() : this.fallback
    if(!data) return null
    if(!data[language]) return null
    if(typeof data[language] != 'string') return null
    return this._handleI18n(data[language], variable)
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

  validate(code = null) {
    if(!code) return
    const codes = this._getLanguageCodes()
    return codes.indexOf(code) > -1
  }

  // 取得fallback
  _getFallback(code = null) {
    // zh找不到以zh-TW替代
    if(new RegExp(/zh/).test(code) && this.validate('zh-TW')) return 'zh-TW'

    // zh、zh-TW找不到以zh-CN替代
    if(new RegExp(/zh/).test(code) && this.validate('zh-CN')) return 'zh-CN'

    // en找不到以en-US替代
    if(new RegExp(/en/).test(code) && this.validate('en-US')) return 'en-US'

    // 全部不符合, 直接用系統fallback
    return this.fallback
  }

  getAvailableLanguage(code = null) {
    let result = code

    // route語系不合法, 改用browser語系
    if(!this.validate(result)) {
      result = navigator.language || navigator.userLanguage
    }

    // browser語系不合法, 改用fallback
    if(!this.validate(result)) {
      result = this._getFallback(result)
    }

    return result
  }
}

export default new i18n()