<template>
  <div class="row">
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card bg-main">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2 text-uppercase">
              <div class="font-weight-bold text-danger">GAME</div>
              <div class="h4 pt-4">{{ getTournament.game }}</div>
            </div>
            <div class="col-auto">
              <font-awesome-icon :icon="['fa', 'gamepad']" size="3x" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card bg-main">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2 text-uppercase">
              <div class="font-weight-bold text-danger">MODE</div>
              <div class="h4 pt-4">{{ getTournament.gameMode }}</div>
            </div>
            <div class="col-auto">
              <font-awesome-icon :icon="['fa', 'cog']" size="3x" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card bg-main">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2 text-uppercase">
              <div class="font-weight-bold text-danger">Registrations</div>
              <div class="h4 pt-4">{{ getTournament.activeTeams + ' / ' + getTournament.teams }}</div>
            </div>
            <div class="col-auto">
              <font-awesome-icon :icon="['fa', 'sign-in-alt']" size="3x" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card bg-danger clickable" @click="joinTournamentModalDispatcher()">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2 text-uppercase">
              <div class="font-weight-bold">Registration</div>
              <div class="h4 pt-4">{{ getTournament.registration ? 'Open' : 'Closed' }}</div>
            </div>
            <div class="col-auto">
              <font-awesome-icon
                :icon="['fa', getTournament.registration ? 'plus':'times']"
                size="3x"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <JoinTournament />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { helpersMixin } from "@/mixins";
import JoinTournament from "@/components/tournament/JoinTournament.vue";

export default {
  components: { JoinTournament },
  mixins: [helpersMixin],
  computed: {
    ...mapGetters({
      getTournament: "ui/getTournament",
      getUser: "user/getUser",
    }),
  },
  methods: {
    joinTournamentModalDispatcher() {
      if (this.getTournament.registration) {
        if (this.getUser.auth) {
          if (
            this.getUser.tournaments.some((x) => x === this.$route.params.id)
          ) {
            this.$swal("Info", "Already registered", "info");
          } else this.toggleModal("tournament/joinTournament");
        } else this.$swal("Oops", "Login to join tournament", "warning");
      } else this.$swal("Oops", "Registration closed", "info");
    },
  },
};
</script>

<style scoped>
.bg-main {
  background: #252f5a;
}
.clickable {
  cursor: pointer;
}
</style>