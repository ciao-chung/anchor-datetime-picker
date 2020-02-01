<template>
  <div>
    <div
      class="subtitle-1 mb-2"
      v-html="i18n('demo.help.locale', { link } )"
    >
    </div>

    <v-datetime-picker inline v-model="value"></v-datetime-picker>

    <v-radio-group v-model="locale" row>
      <v-radio
        v-for="localeItem in localeOptions"
        :key="localeItem"
        :label="localeItem"
        :value="localeItem"
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
      locale: null,
      localeOptions: [
        'zh-TW',
        'en-US',
        'ja-JP'
      ],
    }),
    created() {
      this.locale = this.language
      this.value = this.$moment().format('YYYY-MM-DD 00:00:00')
      this.setupLocale()
    },
    methods: {
      setupLocale() {
        this.$vDatetimePicker.locale = this.locale
      },
    },
    computed: {
      link() {
        return `<a href="https://vuetifyjs.com/en/components/date-pickers#api" target="_blank">${this.i18n('see.doc')}</a>`
      },
      language() {
        return this.$store.getters['locale/language']
      },
      code() {
        return `
<template>
  <v-datetime-picker inline v-model="value"></v-datetime-picker>
</template>

<script lang="babel" type="text/babel">
export default {
  created() {
    this.$vDatetimePicker.locale = '${this.locale}'
  },
}
<\/script>
`
      },
    },
    watch: {
      locale() {
        this.setupLocale()
      },
    },
  }
</script>

<style lang="sass" type="text/sass" scoped></style>