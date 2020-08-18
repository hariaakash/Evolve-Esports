<template>
  <section class="next-match-section">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <router-link
            v-if="getNextMatch"
            :to="{name: 'tournaments/info', params: { id: getNextMatch.tournament } }"
          >
            <div class="timer-box">
              <h1 class="text-center">Next match starts in</h1>
              <hr />
              <Timer :endTime="getTime()" />
            </div>
          </router-link>
          <router-link v-else to="tournaments">
            <div class="timer-box">
              <h1 class="text-center">Check out Tournaments</h1>
              <div class="row">
                <div class="col pt-3 text-center" v-for="(game, index) in games" :key="index">
                  <img
                    class="game-icon mx-auto d-block"
                    :src="`./assets/img/games/${game}/icon.jpg`"
                  />
                  <!-- <div class="h4 text-uppercase text-white pt-2">{{ game }}</div> -->
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import Timer from "@/components/global/Timer";

export default {
  components: { Timer },
  async created() {
    try {
      await this.$store.dispatch("ui/fetchNextMatch");
    } catch (err) {
      // this.$swal(
      //     "Oops",
      //     err.response
      //       ? err.response.data.message
      //       : "Something wrong, try again",
      //     "error"
      //   );
    }
  },
  data: () => ({
    games: ["pubgm", "valorant", "csgo", "codm"],
  }),
  methods: {
    getTime() {
      return moment(this.getNextMatch.date).utcOffset(330).unix();
    },
  },
  computed: {
    ...mapGetters({
      getNextMatch: "ui/getNextMatch",
    }),
  },
};
</script>

<style  lang="scss" scoped>
.next-match-section {
  background: #070b28;
  margin-top: -164px;
  overflow: hidden;
}
.next-match-section .timer-box {
  position: relative;
  padding: 50px 30px 60px;
  background: -webkit-gradient(
    linear,
    right top,
    left top,
    from(#3b1f75),
    to(#4f64de)
  );
  background: -webkit-linear-gradient(right, #3b1f75, #4f64de);
  background: -o-linear-gradient(right, #3b1f75, #4f64de);
  background: linear-gradient(to left, #3b1f75, #4f64de);
}
.game-icon {
  max-height: 100px;
  border-radius: 16px;
}
</style>