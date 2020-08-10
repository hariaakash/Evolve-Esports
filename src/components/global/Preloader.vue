<template>
  <div class="preloader" v-if="init">
    <div class="loader loader-1">
      <div class="loader-outter"></div>
      <div class="loader-inner"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    init() {
      return !this.$store.state.ui.init;
    },
  },
};
</script>

<style src="@/assets/css/global/preloader.css" scoped />
