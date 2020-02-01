<template>
  <v-list dense>
    <!--語系-->
    <v-list-item>
      <v-list-item-content>
        <languages></languages>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item v-for="page in computedPages"
      :key="page.name"
      :to="page.route">
      <v-list-item-content>
        <v-list-item-title>{{page.title}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item href="https://github.com/ciao-chung/anchor-datetime-picker" target="_blank">
      <v-list-item-content>
        <v-list-item-title>
          GITHUB
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="babel" type="text/babel">
import languages from 'partials/languages/languages'
export default {
  data() {
    return {
      pages: ['home', 'doc', 'demo']
    }
  },
  computed: {
    computedPages() {
      return this.pages.map(page => {
        return {
          name: page,
          title: this.i18n(`page.${page}`),
          route: this.i18nRoute({
            name: page,
          }),
        }
      })
    },
  },
  components: {
    languages,
  },
}
</script>

<style lang="sass" type="text/sass" scoped></style>