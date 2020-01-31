<template>
  <v-app app>
    <v-navigation-drawer app clipped v-model="showNavigation">
      <navigation></navigation>
    </v-navigation-drawer>

    <v-app-bar app dark fixed clipped-left>
      <v-app-bar-nav-icon @click.stop="toggleNavigation"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-toolbar-title class="d-flex pa-2 align-center">
        <v-img width="25" height="25" lazy-src src="anchor/logo.png"></v-img>
        <span class="pa-2">{{PROJECT_NAME}}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-content>

    <vue-snotify></vue-snotify>
  </v-app>
</template>

<script>
import Vue from 'vue'
import navigation from 'partials/navigation.vue'
import Snotify from 'vue-snotify'
import mobileDetect from 'mobile-detect'
Vue.use(Snotify, {
  toast: { timeout: 5000, titleMaxLength: 32 },
})
const isMobile = !!(new mobileDetect(window.navigator.userAgent)).mobile()
export default {
  name: 'App',
  created() {
    this.showNavigation = !isMobile ? true : false
  },
  data() {
    return {
      showNavigation: false,
    }
  },
  methods: {
    toggleNavigation() {
      this.showNavigation = !this.showNavigation
    },
  },
  watch: {
    '$route.name'() {
      if(!isMobile) return
      this.showNavigation = false
    },
  },
  components: {
    navigation,
  },
}
</script>

<style src="flag-icon-css/css/flag-icon.css"></style>
<style lang="sass" type="text/sass">
@import '~vue-snotify/styles/material'
div.v-application
  .v-icon
    font-size: 1.25rem

// prevent vuetify style override prism.js
.v-application code
  font-weight: 400 !important
  background-color: transparent !important
  box-shadow: none !important
</style>
