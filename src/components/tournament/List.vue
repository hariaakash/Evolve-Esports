<template>
  <div class="col-lg-12">
    <h1 v-if="getTournaments.length === 0" class="display-4">Come back tomorrow for new tournaments.</h1>
    <div class="row" v-else>
      <div class="col-md-6 pt-4" v-for="tournament in getTournaments" :key="tournament._id">
        <div class="card bg-tournaments hvr-float">
          <div class="card-header">
            <img class="game-icon float-left" src="@/assets/img/games/pubgm/icon.png" />
            <h6 class="card-title text-center">PUBG MOBILE</h6>
          </div>
          <div class="game-images">
            <img class="game-banner" src="@/assets/img/games/pubgm/banner.jpg" />
            <img src="@/assets/img/games/pubgm/icon-text.png" class="game-icon-text" />
            <div class="bg-gradient"></div>
          </div>
          <div class="card-body pb-1">
            <div class="card-title h4 font-weight-light text-center">{{ tournament.name }}</div>
          </div>
          <div class="card-footer">
            <span class="badge font-weight-normal" v-if="tournament.dates.next">
              <font-awesome-icon :icon="['fa', 'calendar-day']" />
              {{ tournament.dates.next | formatDay }}
            </span>
            <span class="badge font-weight-normal ml-1" v-if="tournament.dates.next">
              <font-awesome-icon :icon="['fa', 'clock']" />
              {{ tournament.dates.next | formatTime }} {{ ' IST'}}
            </span>
            <span
              class="badge badge-primary font-weight-normal ml-1"
              v-if="tournament.dates.next"
            >{{ tournament.dates.next | fromNow }}</span>
            <router-link
              :to="{ name: 'tournaments/info', params: { id: tournament._id } }"
              class="btn btn-main float-right"
            >
              <font-awesome-icon :icon="['fa', 'gamepad']" class="mr-2" />Join
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { helpersMixin } from "@/mixins";

export default {
  mixins: [helpersMixin],
  async created() {
    await this.$store.dispatch("ui/fetchTournaments");
  },
  computed: {
    ...mapGetters({
      getTournaments: "ui/getTournaments",
    }),
  },
};
</script>

<style src="@/assets/css/tournament/list.css" scoped />