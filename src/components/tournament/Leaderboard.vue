<template>
  <div class="card red-border">
    <div class="card-body bg-main">
      <div class="h1 font-weight-light text-center yellow">{{ getTournament.name }}</div>
      <p class="p text-justify pt-2">{{ getTournament.desc }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getTournament: "ui/getTournament",
    }),
  },
};
</script>

<style scoped>
.red-border {
  border: 1px solid #dc3545;
}
.bg-main {
  background: #0c1330;
}
.yellow {
  color: #f0ad4e;
}
</style>