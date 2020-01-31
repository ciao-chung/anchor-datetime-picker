<template>
  <v-menu offset-y transition="slide-x-reverse-transition">
    <template v-slot:activator="{ on }">
      <v-btn outlined v-on="on" small>
        <v-icon v-if="flag" small>{{flagIcon}}</v-icon>
        <span class="pl-2 caption">{{label}}</span>
      </v-btn>
    </template>

    <v-list>
      <languageItem @click="click"
        v-for="language in languages"
        :flag="flag"
        :key="language.code"
        :item="language">
      </languageItem>
    </v-list>
  </v-menu>
</template>

<script lang="babel" type="text/babel">
import languageItem from './languageItem.vue'
import _cloneDeep from 'lodash.clonedeep'
export default {
  props: {
    flag: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    click(code) {
      if(this.clientLanguage == code) return
      let route = {
        name: this.$route.name || 'home',
        params: {
          ..._cloneDeep(this.$route.params),
          [this.localeKey]: code,
        },
        query: _cloneDeep(this.$route.query),
        hash: this.$route.hash,
      }
      this.$router.push(route)
    }
  },
  computed: {
    clientLanguage() {
      return this.$route.params[this.localeKey]
    },
    flagIcon() {
      return `flag-icon flag-icon-${this.countryCode}`
    },
    countryCode() {
      return helper.getCountryCodeFromLanguageCode(this.storeLanguage, true)
    },
    label() {
      if(!this.storeLanguage) return null
      if(!this.languagesObject[this.storeLanguage]) return null
      return this.languagesObject[this.storeLanguage].label
    },
    localeKey() {
      return this.$store.getters['locale/key']
    },
    storeLanguage() {
      return this.$store.getters['locale/language']
    },
    languages() {
      return this.$store.getters['locale/languages']
    },
    languagesObject() {
      return this.$store.getters['locale/languagesObject']
    },
  },
  components: {
    languageItem,
  },
}
</script>

<style lang="sass" type="text/sass" scoped></style>