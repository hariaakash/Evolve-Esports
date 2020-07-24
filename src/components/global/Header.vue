<template>
  <header class="header">
    <div class="mainmenu-area">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <nav class="navbar navbar-expand-lg navbar-light">
              <router-link class="navbar-brand" to="home">
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
                  <li v-for="item in menuItems" :key="item.key" class="nav-item">
                    <router-link class="nav-link" :to="item.route">
                      {{ item.title }}
                      <div class="mr-hover-effect"></div>
                    </router-link>
                  </li>
                </ul>
                <a href="#" class="mybtn1" data-toggle="modal" data-target="#signin">Join us</a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data: () => ({
    menuItems: [
      { title: "Home", route: "home" },
      { title: "Tournaments", route: "tournaments" },
      { title: "Support", route: "support" },
    ],
  }),
};
</script>

<style src="@/assets/css/header.css" />
