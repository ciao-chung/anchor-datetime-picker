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
        }
      ]
    },
  },
  components: {
    demoBlock: () => import('views/demoBlock.vue'),
  },
}
</script>
