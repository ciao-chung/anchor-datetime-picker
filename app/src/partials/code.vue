<template>
  <div class="my-2" anchor-datetime-picker="code">
    <span
      copy-icon
      v-clipboard:copy="code"
      v-clipboard:success="onCopy"
    >
      <v-icon>fa fa-copy</v-icon>
      <span class="ml-2">{{'action.copy'| i18n}}</span>
    </span>

    <PrismEditor readonly :code="code" :lang="lang"></PrismEditor>
  </div>
</template>

<script lang="babel" type="text/babel">
import PrismEditor from 'vue-prism-editor'
export default {
  props: {
    lang: {
      type: String,
      default: null,
    },
    code: {
      type: String,
      default: null,
    },
  },
  methods: {
    onCopy() {
      this.$snotify.success(
        null,
        this.i18n('copy.success')
      )
    },
  },
  components: {
    PrismEditor,
  },
}
</script>

<style lang="sass" type="text/sass">
div[anchor-datetime-picker="code"]
  *[copy-icon]
    cursor: pointer
</style>