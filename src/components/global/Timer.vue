<template>
  <div id="nextMatchTimer" class="flipdown"></div>
</template>

<script>
import FlipDown from "@/plugins/FlipDown/main.js";

export default {
  props: ["endTime"],
  mounted() {
    const timer = new FlipDown(this.endTime, "nextMatchTimer");
    timer.start();
  },
};
</script>

<style src="@/plugins/FlipDown/main.css" />