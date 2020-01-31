<template>
  <div>
    value: {{value}}
    <v-datetime-picker
      type="datetime"
      v-model="value">
      <template v-slot:date-icon>
        <v-icon>fa fa-calendar</v-icon>
      </template>

      <template v-slot:time-icon>
        <v-icon>fa fa-clock</v-icon>
      </template>
    </v-datetime-picker>
  </div>
</template>

<script lang="babel" type="text/babel">
export default {
  data: () => ({
    value: '2019-12-03 00:00:00',
  }),
  created() {
    setTimeout(() => {
      // this.value = '2020-02-28 23:59:59'
    }, 2000)
  },
}
</script>

<style lang="sass" type="text/sass" scoped></style>