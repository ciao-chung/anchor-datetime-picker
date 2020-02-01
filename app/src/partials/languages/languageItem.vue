<template>
  <v-list-item @click="onClick">
    <v-list-item-title>
      <span class="caption">{{item.label}}</span>
    </v-list-item-title>
  </v-list-item>
</template>

<script lang="babel" type="text/babel">
export default {
  props: {
    item: {
      type: Object,
    },
  },
  methods: {
    onClick() {
      this.$emit('click', this.item.code)
    },
  },
}
</script>

<style lang="sass" type="text/sass" scoped></style>