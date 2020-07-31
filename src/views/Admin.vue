<template>
  <section class="admin">
    <div class="info-table">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <Nav />
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
  computed: {
    ...mapGetters({
      getProfile: "user/getProfile",
    }),
    adminSet() {
      return (
        this.getProfile &&
        this.getProfile.role &&
        this.getProfile.role === "admin"
      );
    },
  },
};
</script>

<style src="@/assets/css/admin/admin.css" scoped />