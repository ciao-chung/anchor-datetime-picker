<template>
  <v-card anchor-datetime-picker-container :style="containerStyle">
    <v-card-text class="px-0 py-0">
      <v-tabs fixed-tabs v-model="focusTab">
        <v-tab v-if="hasDate">
          <slot name="date-icon">
            <v-icon>mdi-calendar</v-icon>
          </slot>
        </v-tab>
        
        <v-tab v-if="hasTime">
          <slot name="time-icon">
            <v-icon>mdi-clock</v-icon>
          </slot>
        </v-tab>

        <v-tabs-items v-model="focusTab">
          <!--date-->
          <v-tab-item v-if="hasDate">
            <v-date-picker
              full-width
              v-model="date"
              v-bind="datePickerProps"
              @input="focusTimePicker"
              :locale="locale"
            ></v-date-picker>
          </v-tab-item>

          <!--time-->
          <v-tab-item v-if="hasTime">
            <v-time-picker
              full-width
              use-seconds
              v-model="time"
              v-bind="timePickerProps"
              :locale="locale"
            ></v-time-picker>
          </v-tab-item>
        </v-tabs-items>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>

<script lang="babel" type="text/babel">
import moment from 'moment'
export default {
  props: {
    width: {
      type: [String, Number],
      default: '330px',
    },
    value: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'datetime',
    },
    dateFormat: {
      type: String,
      default: 'YYYY-MM-DD',
    },
    timeFormat: {
      type: String,
      default: 'HH:mm:ss',
    },
    textFieldProps: {
      type: Object,
      default: () => {},
    },
    datePickerProps: {
      type: Object,
      default: () => {},
    },
    timePickerProps: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    focusTab: 0,
    date: null,
    time: null,
  }),
  methods: {
    focusTimePicker() {
      if(!this.isDatetime) return
      this.focusTab = 1
    },
  },
  computed: {
    containerStyle() {
      return {
        width: `${this.width}`,
      }
    },
    locale() {
      return this.$vDatetimePicker.locale
    },
    isDatetime() {
      if(this.type == 'datetime') return true
      return false
    },
    hasDate() {
      if(this.type == 'time') return false
      return true
    },
    hasTime() {
      if(this.type == 'date') return false
      return true
    },
    formattedDate() {
      if(!this.date) return null
      return moment(this.date).format(this.dateFormat)
    },
    formattedTime() {
      if(!this.time) return null
      const today = moment().format('YYYY-MM-DD')
      return moment(`${today} ${this.time}`).format(this.timeFormat)
    },
    result() {
      if(this.isDatetime) {
        if(this.formattedDate == null && this.formattedTime == null) return null
        if(this.formattedTime == null) return `${this.formattedDate} 00:00:00`
        return `${this.formattedDate} ${this.formattedTime}`
      }
      if(this.hasDate) return this.formattedDate
      if(this.hasTime) return this.formattedTime
      return null
    },
  },
  watch: {
    result() {
      if(this.value === this.result) return
      this.$emit('change', this.result)
      this.$emit('input', this.result)
    },
  }
}
</script>

<style lang="sass" type="text/sass"></style>