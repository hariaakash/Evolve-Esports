<template>
  <div v-if="showModal">
    <div class="modal-backdrop fade show"></div>
    <div
      class="modal fade login-modal show"
      id="login"
      tabindex="-1"
      role="dialog"
      aria-labelledby="login"
      style="padding-right: 15px; display: block;"
      aria-modal="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <button type="button" class="close" @click="close">
            <span>&times;</span>
          </button>
          <div class="modal-body text-center">
            <div class="logo-area">
              <img class="logo" src="@/assets/img/logo.png" height="50" width="50" alt />
            </div>
            <div class="header-area">
              <h4 class="title">Great to have you back!</h4>
              <p class="sub-title">Authenticate yourself using any of the following methods.</p>
            </div>
            <button
              v-for="(button, index) in buttons"
              :key="index"
              class="btn-social mb-3"
              :class="button.class"
              @click="auth(button.name)"
            >
              <font-awesome-icon :icon="['fab', button.icon]" size="lg" style="color: #FFF;" />
              {{ "Login with " + button.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    buttons: [
      { name: "Google", icon: "google", class: "google" },
      { name: "Facebook", icon: "facebook-f", class: "facebook" },
    ],
  }),
  methods: {
    close() {
      this.$store.state.ui.authModal = false;
    },
    async auth(social) {
      try {
        await this.$store.dispatch("userAuth", { social });
        this.$router.push("account");
        this.$swal("Hooray", "Authenticated successfully", "success");
      } catch (err) {
        this.$swal("Oops..", "Authentication failed, try again", "error");
        console.log(err);
      }
    },
  },
  computed: {
    showModal() {
      return this.$store.state.ui.authModal;
    },
  },
};
</script>

<style src="@/assets/css/auth.css" />