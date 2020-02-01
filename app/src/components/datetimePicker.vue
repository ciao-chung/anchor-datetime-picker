<template>
  <v-card anchor-datetime-picker-container :style="containerStyle">
    <v-card-text class="px-0 py-0">
      <v-tabs fixed-tabs v-model="focusTab">
        <v-tab v-if="hasDate">
          <slot name="date-icon">
            <v-icon>fa fa-calendar</v-icon>
          </slot>
        </v-tab>
        
        <v-tab v-if="hasTime">
          <slot name="time-icon">
            <v-icon>fa fa-clock</v-icon>
          </slot>
        </v-tab>

        <v-tabs-items v-model="focusTab">
          <!--date-->
          <v-tab-item v-if="hasDate">
            <v-date-picker
              full-width
              v-model="date"
              v-bind="datePickerProps"
              @click:date="onDateClick"
              @input="focusTimePicker"
              :locale="locale"
              :disabled="disabled"
              :readonly="readonly"
            ></v-date-picker>
          </v-tab-item>

          <!--time-->
          <v-tab-item v-if="hasTime">
            <v-time-picker
              full-width
              use-seconds
              @click:second="onSecondClick"
              v-model="time"
              v-bind="timePickerProps"
              :locale="locale"
              :readonly="readonly"
              :disabled="disabled"
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
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    focusTab: 0,
    date: null,
    time: null,
  }),
  created() {
    this.init()
  },
  methods: {
    init() {
      if(!this.value || typeof this.value != 'string') {
        this.date = null
        this.time = null
        return
      }

      const partials = this.value.split(' ')

      if(this.isDatetime) {
        this.date = partials[0]
        this.time = partials[1]
        return
      }

      if(this.isDate) {
        this.date = partials[0]
        this.time = null
        return
      }

      if(this.isTime) {
        this.date = null
        this.time = partials[0]
        return
      }
    },
    focusTimePicker() {
      if(!this.isDatetime) return
      this.focusTab = 1
    },
    onDateClick() {
      if(this.isDate) this.$emit('finish')
    },
    onSecondClick() {
      this.$emit('finish')
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
      return this.type == 'datetime'
    },
    isDate() {
      return this.type == 'date'
    },
    isTime() {
      return this.type == 'time'
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
      if(this.isDate) return this.formattedDate
      if(this.isTime) return this.formattedTime
      return null
    },
  },
  watch: {
    result() {
      if(this.value === this.result) return
      this.$emit('change', this.result)
      this.$emit('input', this.result)
    },
    value() {
      this.init()
    },
  }
}
</script>

<style lang="sass" type="text/sass"></style>