<template>
  <div>
    <div class="subtitle-1 mb-2">data: {{value}}</div>
    <v-datetime-picker type="time" v-model="value"></v-datetime-picker>
  </div>
</template>

<script lang="babel" type="text/babel">
import blockMixin from 'views/demo/blockMixin.js'
export default {
  mixins: [blockMixin],
  data: () => ({
    value: '00:00:00',
  }),
}
</script>

<style lang="sass" type="text/sass" scoped></style>