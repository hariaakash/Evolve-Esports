<template>
  <header class="header">
    <div class="mainmenu-area">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <nav class="navbar navbar-expand-lg navbar-light">
              <router-link class="navbar-brand" :to="{ name: 'home' }">
                <img src="@/assets/img/logo.png" height="50" alt />
              </router-link>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#main_menu"
                aria-controls="main_menu"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse fixed-height" id="main_menu">
                <ul class="navbar-nav ml-auto">
                  <li v-for="(item, index) in globalMenu" :key="index" class="nav-item">
                    <router-link class="nav-link" :to="item.route">
                      {{ item.title }}
                      <div class="mr-hover-effect"></div>
                    </router-link>
                  </li>
                  <li class="nav-item" v-if="userSet">
                    <router-link class="nav-link" to="/account">
                      Account
                      <div class="mr-hover-effect"></div>
                    </router-link>
                  </li>
                  <li class="nav-item" v-if="userSet && adminSet">
                    <router-link class="nav-link" to="/admin">
                      Admin
                      <div class="mr-hover-effect"></div>
                    </router-link>
                  </li>
                  <li class="nav-item" v-if="userSet">
                    <a class="nav-link" @click="logoutUser">
                      Logout
                      <div class="mr-hover-effect"></div>
                    </a>
                  </li>
                </ul>
                <button class="mybtn1" @click="toggleModal" v-if="!userSet">Join us</button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    globalMenu: [
      { title: "Home", route: "/home" },
      { title: "Tournaments", route: "/tournaments" },
      // { title: "Support", route: "/support" },
    ],
  }),
  methods: {
    toggleModal() {
      this.$store.commit("ui/TOGGLE_AUTHMODAL");
    },
    async logoutUser() {
      try {
        await this.$store.dispatch("user/logout");
        if (!["/", "/home"].includes(this.$route.path)) this.$router.push("/");
        this.$swal("Success", "Logged out", "success");
      } catch (err) {
        this.$swal("Oops..", "Logout failed", "error");
      }
    },
  },
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
    }),
    userSet() {
      return this.getUser.auth;
    },
    adminSet() {
      return this.getUser.role === "admin";
    },
  },
};
</script>

<style src="@/assets/css/global/header.css" scoped />
