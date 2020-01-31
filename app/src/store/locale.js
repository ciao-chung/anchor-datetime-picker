export default {
  namespaced: true,
  state: {
    languages: [
      { label: '繁體中文', code: 'zh-TW' },
      { label: 'English(US)', code: 'en-US' },
    ],
    language: null,
    locale: null,
    key: 'language',
    fallback: 'zh-TW',
  },
  mutations: {
    setLanguage(state, data) {
      state.language = data
    },
    setLocale(state, data) {
      state.locale = data
    },
    set(state, data) {
      state[data.key] = data.value
    },
  },
  actions: {
    setLanguage(context, data) {
      context.commit('setLanguage', data)
    },
    setLocale(context, data) {
      context.commit('setLocale', data)
    },
    set(context, data) {
      context.commit('set', data)
    },
  },
  getters: {
    fallback: (state) => {
      return state.fallback
    },
    languagesObject: (state) => {
      let result = {}
      for(const item of state.languages) {
        result[item.code] = item
      }
      return result
    },
    languages: (state) => {
      return state.languages
    },
    language: (state) => {
      return state.language
    },
    locale: (state) => {
      return state.locale
    },
    key: (state) => {
      return state.key
    },
  },
}
