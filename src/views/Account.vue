<template>
  <section class="account">
    <div class="info-table">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <Nav :profileSet="profileSet" />
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import Nav from "@/components/account/Nav.vue";

export default {
  created() {
    if (!this.profileSet && this.$route.name !== "edit") {
      this.$router.push("edit");
    }
  },
  components: {
    Nav,
  },
  computed: {
    ...mapGetters({
      getProfile: "user/getProfile",
    }),
    profileSet() {
      return this.getProfile ? true : false;
    },
  },
};
</script>

<style src="@/assets/css/account/account.css" scoped />