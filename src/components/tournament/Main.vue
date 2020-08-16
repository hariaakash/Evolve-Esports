<template>
  <div class="row">
    <div class="col-3">
      <img :src="image" class="img-fluid poster round" alt="Game Poster" />
    </div>
    <div class="col-9">
      <Nav />
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from "@/components/tournament/Nav.vue";

export default {
  components: { Nav },
  data: () => ({
    image: require("@/assets/img/games/pubgm/poster.jpg"),
  }),
};
</script>

<style scoped>
.round {
  border-radius: 8px;
  /* border: 1px solid #4f64de; */
}
</style>