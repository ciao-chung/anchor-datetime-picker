<template>
  <div>
    <div class="subtitle-1 mb-2">data: {{value}}</div>
    <v-datetime-picker v-model="value">
      <template v-slot:text-field="{ data }">
        <div class="my-2 primary--text">
          this is text field slot, data: {{data}}
        </div>
      </template>
    </v-datetime-picker>
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
    this.value = this.$moment().format('YYYY-MM-DD HH:mm:ss')
  },
}
</script>

<style lang="sass" type="text/sass" scoped></style>