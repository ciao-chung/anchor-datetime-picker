<template>
  <div>
    <div class="subtitle-1 mb-2">data: {{value}}</div>
    <v-datetime-picker type="date" v-model="value"></v-datetime-picker>

    <v-code :code="code" lang="vue"></v-code>
  </div>
</template>

<script lang="babel" type="text/babel">
import blockMixin from 'views/demo/blockMixin.js'
export default {
  mixins: [blockMixin],
  data: () => ({
    value: null,
  }),
  created() {
    this.value = this.$moment().format('YYYY-MM-DD')
  },
  computed: {
    code() {
      return `
<v-datetime-picker type="date" v-model="value"></v-datetime-picker>
`
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped></style>