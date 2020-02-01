<template>
  <div>
    <div
      class="subtitle-1 mb-2"
      v-html="i18n('demo.help.transition', { link })"
    >
    </div>

    <v-datetime-picker :transition="transition" v-model="value"></v-datetime-picker>

    <v-radio-group v-model="transition" row>
      <v-radio
        v-for="transitionItem in transitionOptions"
        :key="transitionItem"
        :label="transitionItem"
        :value="transitionItem"
      >
      </v-radio>
    </v-radio-group>

    <v-code :code="code" lang="vue"></v-code>
  </div>
</template>

<script lang="babel" type="text/babel">
import blockMixin from 'views/demo/blockMixin.js'
export default {
  mixins: [blockMixin],
  data: () => ({
    value: null,
    transition: 'scroll-y-transition',
    transitionOptions: [
      'scroll-y-transition',
      'scroll-y-reverse-transition',
      'scroll-x-transition',
      'scroll-x-reverse-transition',
      'fade-transition',
      'expand-transition',
      'scale-transition',
      'slide-x-transition',
      'slide-y-transition',
    ],
  }),
  created() {
    this.value = this.$moment().format('YYYY-MM-DD 00:00:00')
  },
  computed: {
    link() {
      return `<a href="https://vuetifyjs.com/en/components/menus#menus" target="_blank">${this.i18n('see.doc')}</a>`
    },
    code() {
      return `
<v-datetime-picker transition="${this.transition}" type="datetime" v-model="value"></v-datetime-picker>
`
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped></style>