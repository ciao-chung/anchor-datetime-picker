<template>
  <v-col :xl="grid.xl" :lg="grid.lg" :md="grid.md" :sm="grid.sm" :xs="grid.xs" cols="12">
    <v-card>
      <v-card-title>
        {{block.title| i18n}}
      </v-card-title>

      <v-card-text>
        <component :is="component"></component>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
    },
  },
  computed: {
    grid() {
      return {
        xl: 6,
        lg: 6,
        md: 6,
        sm: 12,
        xs: 12,
        ...this.block.grid,
      }
    },
    component() {
      return this.block.component
    },
  },
}
</script>
