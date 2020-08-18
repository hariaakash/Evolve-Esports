<template>
  <div class="row">
    <div class="col-md-3 col-sm-12 pt-4">
      <img :src="getPoster()" class="img-fluid round" alt="Game Poster" />
    </div>
    <div class="col-md-9 col-sm-12 pt-4">
      <Nav />
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Nav from "@/components/tournament/Nav.vue";

export default {
  components: { Nav },
  methods: {
    getPoster(game) {
      return `./assets/img/games/${this.getTournament.game}/poster.jpg`;
    },
  },
  computed: {
    ...mapGetters({
      getTournament: "ui/getTournament",
    }),
  },
};
</script>

<style scoped>
.round {
  border-radius: 8px;
  /* border: 2px solid #4f64de; */
  /* max-height: 400px; */
}
</style>