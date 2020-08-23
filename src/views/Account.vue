<template>
  <section class="account">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <Nav :profileSet="profileSet" />
          <router-view></router-view>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import Nav from "@/components/account/Nav.vue";

export default {
  components: { Nav },
  created() {
    if (!this.profileSet && this.$route.name !== "account/edit") {
      this.$router.push({ name: "account/edit" });
    }
  },
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
    }),
    profileSet() {
      return !!this.getUser.info;
    },
  },
};
</script>

<style scoped>
.account {
  background: #070b28;
}
</style>