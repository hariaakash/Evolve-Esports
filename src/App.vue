<template>
  <div id="app">
    <router-view />
    <vue-progress-bar />
  </div>
</template>

<script>
export default {
  name: "App",
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
};
</script>

<style lang="scss" scoped>
@import "assets/css/bootstrap.min.css";
@import "assets/css/global.css";
@import "assets/css/responsive.css";
</style>