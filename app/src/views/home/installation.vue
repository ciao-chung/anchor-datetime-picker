<template>
  <v-card>
    <v-card-title>
      {{'installation'| i18n}}
    </v-card-title>

    <v-card-text>
      <div class="mb-4">
        <prism-editor readonly :code="installCode" language="bash"></prism-editor>
      </div>

      <div class="mb-4">
        <prism-editor readonly :code="importCode" language="js"></prism-editor>
      </div>

      <div class="mb-4">
        <prism-editor readonly :code="templateCode" language="vue"></prism-editor>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="babel" type="text/babel">
import blockMixin from 'views/home/blockMixin.js'
export default {
  mixins: [blockMixin],
  data() {
    return {}
  },
  created() {},
  computed: {
    installCode() {
      return `yarn add anchor-datetime-picker`
    },
    importCode() {
      return `
// import
import datetimePicker from 'anchor-datetime-picker'
export default {
  data: () => ({
    data: '2020-01-01 00:00:00',
  }),
  components: {
    datetimePicker,
  },
}
`
    },
    templateCode() {
      return `
<template>
  <datetimePicker v-model="data"></datetimePicker>
</template>
`
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped></style>