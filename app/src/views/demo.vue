<template>
  <div class="demo">
    <v-row>
      <demoBlock
        v-for="(block, index) in blocks"
        :key="index"
        :index="index"
        :block="block"
      ></demoBlock>
    </v-row>
  </div>
</template>

<script>
export default {
  computed: {
    blocks() {
      return [
        {
          title: 'datetime',
          component: () => import('views/demo/datetime.vue'),
          grid: {
            xl: 12,
            lg: 12,
          },
        },
        {
          title: 'date',
          component: () => import('views/demo/date.vue'),
        },
        {
          title: 'time',
          component: () => import('views/demo/time.vue'),
        },
        {
          title: 'Inline',
          component: () => import('views/demo/inline.vue'),
          grid: {
            xl: 12,
            lg: 12,
            md: 12,
          },
        },
        {
          title: 'Text field slot',
          component: () => import('views/demo/textFieldSlot.vue'),
        },
        {
          title: 'Tab icon slot',
          component: () => import('views/demo/tabIconSlot.vue'),
        },
        {
          title: 'Disabled',
          component: () => import('views/demo/disabled.vue'),
        },
        {
          title: 'Readonly',
          component: () => import('views/demo/readonly.vue'),
        },
        {
          title: 'Transition',
          component: () => import('views/demo/transition.vue'),
          grid: {
            xl: 12,
            lg: 12,
            md: 12,
          },
        },
      ]
    },
  },
  components: {
    demoBlock: () => import('views/demoBlock.vue'),
  },
}
</script>
