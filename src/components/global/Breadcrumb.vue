<template>
  <section class="breadcrumb-area main">
    <img class="bc-img" :src="getImage()" alt />
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
        routes: ["account", "profile"],
        imgSrc: require("@/assets/img/breadcrumb/play.png"),
      },
      {
        routes: ["support"],
        imgSrc: require("@/assets/img/breadcrumb/contact.png"),
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

<style src="@/assets/css/breadcrumb.css" scoped />