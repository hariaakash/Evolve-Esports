<template>
  <div class="row pb-5">
    <div class="col-3">
      <img :src="image" class="img-fluid rounded poster" alt="Game Poster" />
    </div>
    <div class="col-9">
      <Nav />
      <router-view />
      <div class="card bg-main mt-4" v-if="getTournament.dates.next">
        <div class="card-header text-center">
          <div class="h5">UPCOMING MATCH</div>
        </div>
        <div class="card-body">
          <Timer :endTime="getTime()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import Timer from "@/components/global/Timer.vue";
import Nav from "@/components/tournament/Nav.vue";

export default {
  components: { Timer, Nav },
  data: () => ({
    image: require("@/assets/img/games/pubgm/poster.jpg"),
  }),
  methods: {
    getTime() {
      return moment(this.getTournament.dates.next).utcOffset(330).unix();
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
.bg-main {
  background: #252f5a;
}
</style>