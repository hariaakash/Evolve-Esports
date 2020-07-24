<template>
  <div>
    <Header />
    <Breadcrumb v-if="showBreadcrumb()" />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/global/Header.vue";
import Breadcrumb from "@/components/global/Breadcrumb.vue";
import Footer from "@/components/global/Footer.vue";

export default {
  name: "Main",
  components: {
    Header,
    Breadcrumb,
    Footer,
  },
  methods: {
    showBreadcrumb() {
      const exceptions = ["/home", "/404"];
      return !exceptions.includes(this.$route.path);
    },
  },
};
</script>
