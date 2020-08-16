<template>
  <section class="breadcrumb-area main">
    <img class="bc-img" :src="getImage()" alt />
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h4 class="title">{{ $route.meta.title }}</h4>
          <ul class="breadcrumb-list">
            <li>
              <router-link :to="{ name:'home' }">
                <font-awesome-icon :icon="['fas', 'home']" class="mr-2" />Home
              </router-link>
            </li>
            <li v-if="!($route.meta.breadcrumbs && $route.meta.breadcrumbs.length)">
              <span>
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </span>
              <router-link :to="$route">{{ $route.meta.title }}</router-link>
            </li>
            <li v-else v-for="(crumb, index) in $route.meta.breadcrumbs" :key="index">
              <span>
                <font-awesome-icon :icon="['fas', 'chevron-right']" />
              </span>
              <router-link :to="crumb.route($route)">{{ crumb.title }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    defaultImgSrc: require("@/assets/img/breadcrumb/play.png"),
    images: [
      {
        routes: ["tournaments"],
        imgSrc: require("@/assets/img/breadcrumb/tournaments.png"),
      },
      {
        routes: ["account/profile", "account/edit"],
        imgSrc: require("@/assets/img/breadcrumb/play.png"),
      },
      {
        routes: ["support"],
        imgSrc: require("@/assets/img/breadcrumb/contact.png"),
      },
      {
        routes: ["tournament/info", "tournament/rules"],
        imgSrc: require("@/assets/img/breadcrumb/lottery.png"),
      },
    ],
  }),
  methods: {
    getImage() {
      const image = this.images.find((x) =>
        x.routes.includes(this.$route.name)
      );
      return image ? image.imgSrc : this.defaultImgSrc;
    },
  },
};
</script>

<style src="@/assets/css/global/breadcrumb.css" scoped />