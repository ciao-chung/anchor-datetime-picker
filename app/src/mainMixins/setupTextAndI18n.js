import i18n from 'libs/i18n.js'
import _cloneDeep from 'lodash.clonedeep'
export default {
  methods: {
    async loadText() {
      this.setupClientLanguage()

      i18n.launch({
        fallback: this.fallback,
        languages: this.languages,
      }, () => this.clientLanguage)
    },
    setupClientLanguage() {
      if(this.clientLanguage) {
        return
      }

      let route = {
        name: this.$route.name || 'home',
        params: {
          ..._cloneDeep(this.$route.params),
          [this.localeKey]: this.clientLanguage || this.fallback,
        },
        query: _cloneDeep(this.$route.query),
        hash: this.$route.hash,
      }
      this.$router.replace(route)
    },
  },
  computed: {
    clientLanguage() {
      return this.$route.params[this.localeKey]
    },
    clientLocale() {
      return helper.getCountryCodeFromLanguageCode(this.clientLanguage)
    },
    localeKey() {
      return this.$store.getters['locale/key']
    },
    fallback() {
      return this.$store.getters['locale/fallback']
    },
    languages() {
      return this.$store.getters['locale/languages']
    },
  },
  watch: {
    clientLanguage() {
      this.$store.dispatch('locale/setLanguage', this.clientLanguage)
      this.$store.dispatch('locale/setLocale', this.clientLocale)
    },
  },
}