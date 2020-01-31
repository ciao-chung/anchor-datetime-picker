<template>
  <div class="home">
    <v-row>
      <v-col lg="12" md="12">
        <installation></installation>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  components: {
    installation: () => import('views/home/installation.vue'),
  },
}
</script>
