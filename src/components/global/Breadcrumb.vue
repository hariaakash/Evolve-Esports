<template>
  <section class="breadcrumb-area main">
    <img class="bc-img" src="@/assets/img/breadcrumb/contact.png" alt />
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h4 class="title">{{ this.$route.meta.title }}</h4>
          <ul class="breadcrumb-list">
            <li>
              <router-link to="home">
                <font-awesome-icon :icon="['fas', 'home']" class="mr-2" />Home
              </router-link>
            </li>
            <li>
              <span>
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </span>
            </li>
            <li>
              <router-link :to="this.$route">{{ this.$route.meta.title }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style src="@/assets/css/breadcrumb.css" scoped />