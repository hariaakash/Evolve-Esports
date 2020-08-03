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
        <Table :tableData="tableData" />
        <!-- <h5 v-if="tournaments.length === 0" class="text-center">Empty data</h5>
        <div v-else class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Game</th>
                <th scope="col">Team Type</th>
                <th scope="col">Frequency</th>
                <th scope="col">Payment</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(tournament, index) in tournaments" :key="'tournaments' + index">
                <td>{{ ((page-1) * limit) + index+1 }}</td>
                <td>{{ tournament.name }}</td>
                <td>{{ tournament.game }}</td>
                <td>{{ tournament.teamType }}</td>
                <td>{{ tournament.frequency }}</td>
                <td>{{ tournament.payment }}</td>
                <td>{{ tournament.status }}</td>
              </tr>
            </tbody>
          </table>
          <nav>
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ 'disabled': page === 1 }">
                <button class="page-link" @click="prevPage">Previous</button>
              </li>
              <li
                class="page-item"
                v-for="(item, index) in totalPages"
                :key="'pagination' + index"
                :class="{'active': item === page}"
              >
                <button class="page-link" @click="selectedPage(item)">{{item}}</button>
              </li>
              <li class="page-item" :class="{ 'disabled': page === totalPages }">
                <button class="page-link" @click="nextPage">Next</button>
              </li>
            </ul>
          </nav>
        </div>-->
      </div>
    </div>
    <EditTournament />
  </section>
</template>

<script>
import EditTournament from "./EditTournament.vue";
import Table from "@/components/global/Table.vue";

import TournamentService from "@/api/tournament.api";

export default {
  components: { EditTournament, Table },
  data: function () {
    return {
      editTournamentModalId: "admin/tournaments/editTournament",
      tableData: {
        name: "Tournaments",
        ApiService: TournamentService,
        fields: [
          { name: "Name", field: "name" },
          { name: "Game", field: "game" },
          { name: "Team Type", field: "teamType" },
          { name: "Frequency", field: "frequency" },
          { name: "Payment", field: "payment" },
          { name: "Status", field: "status" },
        ],
      },
    };
  },
  methods: {
    toggleModal(id) {
      this.$store.commit("ui/TOGGLE_MODAL", id);
    },
  },
};
</script>

<style scoped>
.tournaments {
  padding: 50px 0px;
}
.bg-main {
  background: #0c1330;
}
</style>