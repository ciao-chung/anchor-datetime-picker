<template>
  <div anchor-datetime-picker-root>
    <v-menu
      v-if="!inline"
      v-model="showMenu"
      :close-on-content-click="false"
      :transition="transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <slot name="text-field"
          :data="data"
          :text-field-props="textFieldProps"
        >
          <v-text-field
            v-on="on"
            v-model="data"
            v-bind="textFieldProps"
            dense
            outlined
            prepend-inner-icon="fa fa-clock"
            readonly
            :disabled="disabled"
            :clearable="textFieldClearable"
          ></v-text-field>
        </slot>
      </template>

      <datetimePicker
        @finish="finish"
        v-bind="$props"
        v-model="data">

        <!--date icon-->
        <template v-slot:date-icon>
          <slot name="date-icon"></slot>
        </template>

        <!--time icon-->
        <template v-slot:time-icon>
          <slot name="time-icon"></slot>
        </template>

      </datetimePicker>

    </v-menu>

    <datetimePicker
      v-if="inline"
      v-bind="$props"
      v-model="data">

      <!--date icon-->
      <template v-slot:date-icon>
        <slot name="date-icon"></slot>
      </template>

      <!--time icon-->
      <template v-slot:time-icon>
        <slot name="time-icon"></slot>
      </template>

    </datetimePicker>
  </div>
</template>

<script lang="babel" type="text/babel">
import datetimePicker from './datetimePicker'
export default {
  props: {
    width: {
      type: [String, Number],
      default: '330px',
    },
    inline: {
      type: Boolean,
      default: false,
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
    transition: {
      type: String,
      default: 'scroll-y-transition',
    },
  },
  data: () => ({
    showMenu: false,
    data: null,
  }),
  created() {
    this.data = this.value
  },
  methods: {
    finish() {
      this.showMenu = false
    },
  },
  computed: {
    textFieldClearable() {
      if(this.disabled) return false
      if(this.readonly) return false
      return true
    },
  },
  watch: {
    value() {
      this.data = this.value
    },
    data() {
      if(this.data === this.value) return
      this.$emit('input', this.data)
    },
  },
  components: {
    datetimePicker,
  },
}
</script>

<style lang="sass" type="text/sass"></style>