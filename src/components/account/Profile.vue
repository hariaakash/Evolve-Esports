<template>
  <section class="pt-2 pb-5">
    <div class="row">
      <div class="col-3">
        <div class="card bg-main">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2 text-uppercase">
                <div class="font-weight-normal">Tournaments</div>
                <div class="h4 pt-4">{{ getUser.tournaments.length }}</div>
              </div>
              <div class="col-auto">
                <font-awesome-icon :icon="['fa', 'gamepad']" size="3x" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card bg-main">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2 text-uppercase">
                <div class="font-weight-normal">Cash</div>
                <div class="h4 pt-4">{{ getUser.payment.cash.current }}</div>
              </div>
              <div class="col-auto">
                <font-awesome-icon :icon="['fa', 'wallet']" size="3x" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card bg-main">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2 text-uppercase">
                <div class="font-weight-normal">Credit</div>
                <div class="h4 pt-4">{{ getUser.payment.credit.current }}</div>
              </div>
              <div class="col-auto">
                <font-awesome-icon :icon="['fa', 'star']" size="3x" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="card bg-danger clickable" @click="joinTournamentModalDispatcher()">
          <div class="card-body">
            <div class="row no-gutters align-items-center">
              <div class="col mr-2 text-uppercase">
                <div class="font-weight-normal">WALLET</div>
                <div class="h4 pt-4">Add Cash</div>
              </div>
              <div class="col-auto">
                <font-awesome-icon :icon="['fa', 'plus']" size="3x" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row pt-4">
      <div class="col-md-4">
        <div class="card bg-transparent red-border">
          <div class="card-body text-center" v-if="getUser.info">
            <img class="img-fluid round" src="@/assets/img/extras/profile.jpg" />
            <h5 class="card-title pt-4">Name: {{ getUser.info.name }}</h5>
            <h6 class="card-subtitle pt-2">IGN: {{ getUser.info.gamerTag }}</h6>
            <p class="card-text pt-3">{{ getUser.info.desc }}</p>
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
  }),
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
    }),
  },
};
</script>

<style src="@/assets/css/account/profile.css" scoped />