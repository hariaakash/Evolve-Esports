<template>
  <div>
    <Hero />
    <NextMatch />
    <HowTo />
    <Join />
    <Awards />
  </div>
</template>

<script>
import Hero from "@/components/home/Hero.vue";
import NextMatch from "@/components/home/NextMatch.vue";
import HowTo from "@/components/home/HowTo.vue";
import Join from "@/components/home/Join.vue";
import Awards from "@/components/home/Awards.vue";

export default {
  components: {
    Hero,
    NextMatch,
    HowTo,
    Join,
    Awards,
  },
};
</script>
