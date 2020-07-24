<template>
  <header class="header">
    <div class="mainmenu-area">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <nav class="navbar navbar-expand-lg navbar-light">
              <a class="navbar-brand" href="index.html">
                <img src="@/assets/img/logo.png" height="50" alt />
              </a>
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
                  <li class="nav-item">
                    <a class="nav-link active">
                      Home
                      <div class="mr-hover-effect"></div>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="tournaments.html">
                      tournaments
                      <div class="mr-hover-effect"></div>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="contact.html">
                      Contact
                      <div class="mr-hover-effect"></div>
                    </a>
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

<style src="@/assets/css/header.css" />