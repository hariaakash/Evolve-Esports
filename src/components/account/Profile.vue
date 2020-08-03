<template>
  <section class="profile-info">
    <div class="row">
      <div class="col-4">
        <div class="card bg-main">
          <div class="card-body text-center" v-if="getUser.info">
            <img :src="profile.imgSrc" />
            <h5 class="card-title text-white pt-4">Name: {{ getUser.info.name }}</h5>
            <h6 class="card-subtitle text-white pt-2">Gamer Tag: {{ getUser.info.gamerTag }}</h6>
            <p class="card-text text-white text-justify pt-3">{{ getUser.info.desc }}</p>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="card">
          <div class="card-body text-center">
            <h5 class="card-title text-dark">Social Accounts</h5>
            <button
              v-for="(button, index) in socialAuth"
              :key="index"
              class="btn btn-lg btn-block btn-social mb-3"
              :class="button.class"
            >
              <font-awesome-icon
                :icon="['fab', button.icon]"
                class="mr-2"
                size="lg"
                style="color: #FFF;"
              />
              {{ "Link with " + button.name }}
            </button>
          </div>
        </div>
        <div class="card mt-4">
          <div class="card-body text-center">
            <h5 class="card-title text-dark">Game Stats</h5>
            <p class="card-text text-dark">Coming Soon...</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    socialAuth: [
      { name: "google", icon: "google", class: "google" },
      { name: "facebook", icon: "facebook-f", class: "facebook" },
    ],
    profile: {
      imgSrc:
        "https://www.apklat.com/wp-content/uploads/2019/01/Database-Tracker-for-PUBG-Download-Latest-Version-APK.png",
    },
  }),
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
    }),
  },
};
</script>

<style src="@/assets/css/account/profile.css" scoped />