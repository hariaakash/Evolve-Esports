<template>
  <div v-if="showModal">
    <div class="modal-backdrop fade show"></div>
    <div
      class="modal fade show"
      tabindex="-1"
      role="dialog"
      style="padding-right: 15px; display: block;"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <button type="button" class="close" @click="close">
            <span>
              <font-awesome-icon :icon="['fa', 'times']" size="lg" />
            </span>
          </button>
          <div class="modal-body text-center">
            <div class="logo-area">
              <img class="logo" src="@/assets/img/logo.png" height="50" width="50" alt />
            </div>
            <div class="header-area">
              <h4 class="title">Great to have you back!</h4>
              <p class="sub-title">Authenticate yourself using any of the following methods.</p>
            </div>
            <a
              v-for="(button, index) in buttons"
              :key="index"
              class="btn-social mb-3"
              :class="button.class"
              :href="auth(button.class)"
            >
              <font-awesome-icon
                :icon="['fab', button.icon]"
                class="mr-2"
                size="lg"
                style="color: #FFF;"
              />
              {{ "Login with " + button.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import socialAuth from "@/plugins/socialAuth";

export default {
  data: () => ({
    buttons: [
      { name: "Google", icon: "google", class: "google" },
      // { name: "Facebook", icon: "facebook-f", class: "facebook" },
    ],
  }),
  methods: {
    close() {
      this.$store.commit("ui/TOGGLE_AUTHMODAL");
    },
    auth(social) {
      return socialAuth[social].link();
    },
  },
  computed: {
    showModal() {
      return this.$store.state.ui.authModal;
    },
  },
};
</script>

<style src="@/assets/css/global/auth.css" scoped />