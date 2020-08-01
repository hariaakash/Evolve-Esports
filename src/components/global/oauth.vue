<template>
  <section class="oauth">
    <h1 class="text-center text-white">Authentication in progress...</h1>
  </section>
</template>

<script>
import { oauthUser } from "@/api/user.api";

export default {
  created() {
    const { state: social, code } = this.$route.query;
    if (social && code) this.socialAuth({ social, code });
    else this.$route.push({ name: "home" });
  },
  methods: {
    async socialAuth(req) {
      try {
        const { data: res } = await oauthUser(req);
        this.$cookies.set("authkey", res.authKey);
        this.$router.push({ name: "account" });
      } catch ({ response: { status, data } }) {
        this.$swal("Oops", data.message, "error");
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>

<style scoped>
.oauth {
  padding: 100px;
  background: #070b28;
}
</style>