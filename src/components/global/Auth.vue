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
          <div class="modal-body">
            <div class="logo-area">
              <img class="logo" src="@/assets/img/logo.png" height="50" width="50" alt />
            </div>
            <div class="header-area">
              <h4 class="title">Great to have you back!</h4>
              <p class="sub-title">Authenticate yourself using any of the following methods.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$store.state.ui.authModal = false;
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