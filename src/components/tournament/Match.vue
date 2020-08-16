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
      <div class="card bg-danger clickable" @click="toggleModal">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2 text-uppercase">
              <div class="font-weight-bold">Registration</div>
              <div class="h4 pt-4">{{ getTournament.status ? 'Open' : 'Closed' }}</div>
            </div>
            <div class="col-auto">
              <font-awesome-icon v-if="getTournament.status" :icon="['fa', 'plus']" size="3x" />
              <font-awesome-icon v-else :icon="['fa', 'times']" size="3x" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { helpersMixin } from "@/mixins";

export default {
  mixins: [helpersMixin],
  computed: {
    ...mapGetters({
      getTournament: "ui/getTournament",
    }),
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