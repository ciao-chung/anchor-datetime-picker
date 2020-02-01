<template>
  <v-card>
    <v-card-title>
      {{'installation'| i18n}}
    </v-card-title>

    <v-card-text>
      <div class="mb-4">
        <v-code readonly :code="installCode" language="bash"></v-code>
      </div>

      <div class="mb-4">
        <div class="subtitle-1 black--text">script</div>
        <v-code readonly :code="importCode" language="js"></v-code>
      </div>

      <div class="mb-4">
        <div class="subtitle-1 black--text">template</div>
        <v-code readonly :code="templateCode" language="vue"></v-code>
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
import datetimePicker from 'anchor-datetime-picker'
export default {
  data: () => ({
    data: null,
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