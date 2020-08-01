<template>
  <section class="tournaments">
    <div class="card bg-main">
      <div class="card-header">
        <button
          class="btn btn-primary float-right"
          @click="toggleModal(editTournamentModalId)"
        >Create</button>
      </div>
      <div class="card-body">
        <div v-if="tournaments.length" class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Game</th>
                <th scope="col">Team Type</th>
                <th scope="col">Frequency</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tournament, index) in tournaments" :key="'tournaments' + index">
                <td>{{ tournament.name }}</td>
                <td>{{ tournament.game }}</td>
                <td>{{ tournament.teamType }}</td>
                <td>{{ tournament.frequency }}</td>
                <td>{{ tournament.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h5 v-else class="text-center">Empty data</h5>
      </div>
    </div>
    <EditTournament />
  </section>
</template>

<script>
import EditTournament from "./EditTournament.vue";

export default {
  async created() {
    // await this.initPage();
  },
  components: { EditTournament },
  data: () => ({
    tournaments: [],
    editTournamentModalId: "admin/tournaments/editTournament",
    pagination: {
      field: "createdAt",
      limit: 10,
      last: null,
      first: null,
    },
  }),
  methods: {
    toggleModal(id) {
      this.$store.commit("ui/TOGGLE_MODAL", id);
    },
  },
};
</script>

<style src="@/assets/css/admin/tournaments.css" scoped />