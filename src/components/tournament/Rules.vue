<template>
  <div class="card red-border">
    <div class="card-body bg-main">
      <ol>
        <li class="text" v-for="(rule, index) in rules" :key="index">{{ rule }}</li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    rules: [
      "Emulators not allowed. If any malicious behavior is reported, you will be removed from the tournament.",
      "Please be respectful to other participants.",
      "Please be on time for the matches, disqualified on no-show.",
      "Only registered players are allowed and in-game names must match, otherwise you will be disqualified.",
      "In case of a dispute or conflict in game the admins will have the last say and will take necessary actions to maintain the smooth flow of the tournament.",
    ],
    image: require("@/assets/img/games/pubgm/poster.jpg"),
  }),
};
</script>

<style scoped>
.red-border {
  border: 1px solid #dc3545;
}
.bg-main {
  background: #0c1330;
}
.text {
  color: #a1aed4;
}
</style>