<template>
  <section class="admin">
    <div class="info-table">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <Nav v-if="hideWhen" />
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import Nav from "@/components/admin/Nav.vue";

export default {
  created() {
    if (!this.adminSet) {
      this.$router.push({ name: "home" });
      this.$swal("Naughty !", "You're not admin", "warning");
    }
  },
  components: {
    Nav,
  },
  data: () => ({
    navHideRoutes: ["admin/tournament"],
  }),
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
    }),
    adminSet() {
      return this.getUser.role === "admin";
    },
    hideWhen() {
      return !this.navHideRoutes.includes(this.$route.name);
    },
  },
};
</script>

<style src="@/assets/css/admin/admin.css" scoped />