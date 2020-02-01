<template>
  <v-menu offset-y transition="slide-x-reverse-transition">
    <template v-slot:activator="{ on }">
      <v-btn outlined v-on="on" small>
        <span class="caption">{{label}}</span>
      </v-btn>
    </template>

    <v-list>
      <languageItem @click="click"
        v-for="language in languages"
        :key="language.code"
        :item="language">
      </languageItem>
    </v-list>
  </v-menu>
</template>

<script lang="babel" type="text/babel">
import languageItem from './languageItem'
export default {
  methods: {
    click(code) {
      if(this.$route.params.language == code) return

      let route = {
        name: this.$route.name,
        params: _cloneDeep(this.$route.params),
        query: _cloneDeep(this.$route.query),
        hash: this.$route.hash,
      }
      route.params.language = code
      this.$router.push(route)
    }
  },
  computed: {
    label() {
      if(!this.language) return null
      if(!this.languagesObject[this.language]) return null
      return this.languagesObject[this.language].label
    },
    locale() {
      return this.$store.getters['locale/locale']
    },
    language() {
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