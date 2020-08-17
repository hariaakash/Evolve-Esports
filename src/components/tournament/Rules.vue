<template>
  <div class="card red-border">
    <div class="card-body bg-main">
      <ol>
        <li class="text" v-for="(rule, index) in rules[getTournament.game]" :key="index">{{ rule }}</li>
      </ol>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    rules: {
      pubgm: [
        "Emulators not allowed. If any malicious behavior is reported, you will be removed from the tournament.",
        "Please be respectful to other participants.",
        "Please be on time for the matches, disqualified on no-show.",
        "Only registered players are allowed and in-game names must match, otherwise you will be disqualified.",
        "In case of a dispute or conflict in game the admins will have the last say and will take necessary actions to maintain the smooth flow of the tournament.",
      ],
      valorant: [
        "If any malicious behavior is reported, you will be removed from the tournament.",
        "Please be respectful to other participants.",
        "Please be on time for the matches, disqualified on no-show.",
        "Only registered players are allowed and in-game names must match, otherwise you will be disqualified.",
        "In case of a dispute or conflict in game the admins will have the last say and will take necessary actions to maintain the smooth flow of the tournament.",
      ],
    },
    image: require("@/assets/img/games/pubgm/poster.jpg"),
  }),
  computed: {
    ...mapGetters({
      getTournament: "ui/getTournament",
    }),
  },
};
</script>

<style scoped>
.red-border {
  border: 2px solid #dc3545;
}
.bg-main {
  background: #070b28;
}
.text {
  color: #a1aed4;
}
</style>