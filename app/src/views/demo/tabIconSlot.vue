<template>
  <div>
    <div class="subtitle-1 mb-2">data: {{value}}</div>

    <v-datetime-picker
      type="datetime"
      v-model="value">
      <template v-slot:date-icon>
        Date
      </template>

      <template v-slot:time-icon>
        Time
      </template>
    </v-datetime-picker>

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
  computed: {
    code() {
      return `
<v-datetime-picker
  type="datetime"
  v-model="value">
  <template v-slot:date-icon>
    Date
  </template>

  <template v-slot:time-icon>
    Time
  </template>
</v-datetime-picker>
`
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped></style>