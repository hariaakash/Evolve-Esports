<template>
  <div class="card red-border">
    <div class="card-body bg-main">
      <div class="h1 font-weight-light text-center yellow">{{ getTournament.name }}</div>
      <p
        class="p text-justify pt-2"
        v-for="(line, index) in getDescription()"
        :key="index"
      >{{ line }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    common: [
      "Join the tournament by registering with your team name and in-game names of the team members. Match date and time will be updated in the schedules.",
      "Room ID, Password & Slot number will be sent to your registered mobile nummber before the match.",
      "Live streaming will be available on our official youtube channel and also for updates check out our social media.",
    ],
  }),
  methods: {
    getDescription() {
      const lines = this.getTournament.desc.split("\n");
      lines.push(...this.common);
      return lines;
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
.red-border {
  border: 2px solid #dc3545;
}
.bg-main {
  background: #070b28;
}
.yellow {
  color: #f0ad4e;
}
</style>