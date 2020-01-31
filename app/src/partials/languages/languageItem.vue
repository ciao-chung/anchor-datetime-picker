<template>
  <v-list-item @click="onClick">
    <v-list-item-title>
      <v-icon v-if="flag" small>{{icon}}</v-icon>
      <span class="pl-2 caption">{{item.label}}</span>
    </v-list-item-title>
  </v-list-item>
</template>

<script lang="babel" type="text/babel">
export default {
  props: {
    item: {
      type: Object,
    },
    flag: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    onClick() {
      this.$emit('click', this.item.code)
    },
  },
  computed: {
    icon() {
      return `flag-icon flag-icon-${this.countryCode}`
    },
    countryCode() {
      return helper.getCountryCodeFromLanguageCode(this.item.code, true)
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped></style>