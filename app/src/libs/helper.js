class helper {
  constructor() {}
  getCountryCodeFromLanguageCode(code, lowercase = false) {
    if(typeof code != 'string') return
    const partials = code.split('-')
    let result = partials.length == 1 ? partials[0] : partials[1]
    if(lowercase) return result.toLowerCase()
    return result
  }
}

export default new helper()