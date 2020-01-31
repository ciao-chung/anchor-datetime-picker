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
          title: 'Text field slot',
          component: () => import('views/demo/textFieldSlot.vue'),
        },
        {
          title: 'Tab icon slot',
          component: () => import('views/demo/tabIconSlot.vue'),
        },
      ]
    },
  },
  components: {
    demoBlock: () => import('views/demoBlock.vue'),
  },
}
</script>
