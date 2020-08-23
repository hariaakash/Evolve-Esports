<template>
  <section class="pt-2 pb-5">
    <div class="row">
      <div class="col-md-4 pt-2">
        <div class="card bg-main">
          <div class="card-body text-center" v-if="getUser.info">
            <img class="img-fluid round" src="@/assets/img/extras/profile.jpg" />
            <h5 class="card-title text-white pt-4">Name: {{ getUser.info.name }}</h5>
            <h6 class="card-subtitle text-white pt-2">IGN: {{ getUser.info.gamerTag }}</h6>
            <p class="card-text text-white text-center pt-3">{{ getUser.info.desc }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-8 pt-2">
        <div class="card mt-2">
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
        <div class="card mt-4 pt-2">
          <div class="card-body text-center">
            <h5 class="card-title text-dark">Game Stats</h5>
            <p class="card-text text-dark">Coming Soon...</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row pt-4">
      <div class="col-12">
        <Tournaments />
      </div>
    </div>
  </section>
</template>

<script>
import Tournaments from "./Tournaments.vue";
import { mapGetters } from "vuex";

export default {
  components: { Tournaments },
  data: () => ({
    socialAuth: [
      { name: "google", icon: "google", class: "google" },
      { name: "facebook", icon: "facebook-f", class: "facebook" },
    ],
  }),
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
    }),
  },
};
</script>

<style src="@/assets/css/account/profile.css" scoped />