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
        <div class="table-responsive">
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
      </div>
    </div>
    <EditTournament />
  </section>
</template>

<script>
import EditTournament from "./EditTournament.vue";
import { DB } from "@/firebase";

export default {
  async created() {
    await this.initPage();
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
    async initPage() {
      const res = await DB.collection("tournaments")
        .orderBy(this.pagination.field)
        .limit(this.pagination.limit)
        .get();
      const data = [];
      res.docs.forEach((x) => {
        data.push(x.data());
      });
      this.pagination.first = data[0];
      this.pagination.last = data[data.length - 1];
      this.tournaments = data;
    },
  },
};
</script>

<style src="@/assets/css/admin/tournaments.css" scoped />