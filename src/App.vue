<template>
  <div id="app">
    <router-view />
    <vue-progress-bar v-if="appInit" />
    <Preloader v-if="!appInit" />
  </div>
</template>

<script>
import Preloader from "@/components/global/Preloader.vue";

export default {
  components: { Preloader },
  mounted() {
    this.$Progress.finish();
  },
  created() {
    this.$Progress.start();

    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        this.$Progress.parseMeta(meta);
      }
      this.$Progress.start();
      next();
    });

    this.$router.afterEach(() => {
      this.$Progress.finish();
    });
  },
  computed: {
    appInit() {
      return this.$store.state.ui.init;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/css/bootstrap.min.css";
@import "assets/css/global.css";
@import "assets/css/responsive.css";
</style>