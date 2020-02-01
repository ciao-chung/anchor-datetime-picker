<template>
  <div class="home">
    <v-row>
      <v-col lg="12" md="12">
        <props></props>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  components: {
    props: () => import('views/doc/props.vue'),
  },
}
</script>
