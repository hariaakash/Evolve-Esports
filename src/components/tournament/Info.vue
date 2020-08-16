<template>
  <section>
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
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  methods: {
    getDescription() {
      return this.getTournament.desc.split("\n");
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