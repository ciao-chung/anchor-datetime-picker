import i18nLibrary from 'libs/i18n.js'
import i18nText from 'libs/i18nText'
export default {
  data() {
    return {
      i18nLibrary: null,
    }
  },
  methods: {
    async loadText() {
      window.i18nLibrary = i18nLibrary

      window.i18nLibrary.init('zh-TW', this.languages)
      const availableLanguage = window.i18nLibrary.getAvailableLanguage(this.routeLanguage)
      this.$store.dispatch('locale/setLanguage', availableLanguage)
      this.$nextTick(() => {
        this.redirectInvalidLanguage()
      })

      try {
        window.i18nLibrary.launch({
          text: i18nText,
        }, () => this.clientLanguage)
      } catch (error) {
        console.error(error)
        console.warn('init text fail')
      }
    },
    redirectInvalidLanguage() {
      if(this.clientLanguage == this.routeLanguage) return
      let route = {
        name: this.$route.name || 'home',
        params: {
          ..._cloneDeep(this.$route.params),
          language: this.clientLanguage,
        },
        query: _cloneDeep(this.$route.query),
        hash: this.$route.hash,
      }
      this.$router.replace(route)
    },
  },
  computed: {
    routeLanguage() {
      return this.$route.params.language
    },
    clientLanguage() {
      return this.$store.getters['locale/language']
    },
    languages() {
      return this.$store.getters['locale/languages']
    },
  },
  watch: {
    routeLanguage() {
      if(!this.routeLanguage) return
      this.$store.dispatch('locale/setLanguage', this.routeLanguage)
    }
  },
}