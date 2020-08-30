<template>
  <div class="row">
    <div class="col-md-3 col-sm-12 pt-4">
      <div class="card bg-main">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2 text-uppercase">
              <div class="font-weight-bold">FEES</div>
              <div
                class="h4 pt-4"
              >{{ getTournament.payment === 0 ? 'FREE' : `₹ ${getTournament.payment}` }}</div>
            </div>
            <div class="col-auto">
              <font-awesome-icon :icon="['fa', 'wallet']" size="3x" />
            </div>
          </div>
        </div>
      </div>
      <img :src="getPoster()" class="img-fluid round mt-4" alt="Game Poster" />
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
.bg-main {
  background: #252f5a;
}
</style>