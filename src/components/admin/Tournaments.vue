<template>
  <section class="tournaments">
    <div class="card bg-main">
      <div class="card-header">
        <button
          class="btn btn-primary float-right"
          @click="toggleModal(modals.createTournament)"
        >Create</button>
      </div>
      <div class="card-body">
        <Table :tableMeta="tableMeta">
          <template #header>
            <th scope="col">#</th>
            <th
              scope="col"
              v-for="(item, index) in tableMeta.fields"
              :key="'head' + index"
            >{{ item.name }}</th>
            <th scope="col">View</th>
          </template>
          <template #body="{docs, page, limit}">
            <tr v-for="(tournament, index) in docs" :key="'docs' + index">
              <td>{{ ((page-1) * limit) + index+1 }}</td>
              <td>{{ tournament.name }}</td>
              <td>{{ tournament.game }}</td>
              <td>{{ tournament.gameMode }}</td>
              <td>{{ tournament.teamSize }}</td>
              <td>{{ tournament.activeTeams + '/' + tournament.teams }}</td>
              <td>{{ tournament.status }}</td>
              <td>
                <router-link
                  :to="{ name: 'admin/tournament', params: { id: tournament._id }  }"
                  type="button"
                  class="btn btn-primary btn-sm mr-2"
                >
                  <font-awesome-icon :icon="['fa', 'arrow-right']" />
                </router-link>
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="deleteTournament(tournament._id)"
                >
                  <font-awesome-icon :icon="['fa', 'times']" />
                </button>
              </td>
            </tr>
          </template>
        </Table>
      </div>
    </div>
    <CreateTournament />
  </section>
</template>

<script>
import CreateTournament from "./CreateTournament.vue";
import Table from "@/components/global/Table.vue";
import { helpersMixin } from "@/mixins";
import TournamentService from "@/api/tournament.api";

export default {
  components: { Table, CreateTournament },
  mixins: [helpersMixin],
  data: () => ({
    modals: {
      createTournament: "admin/createTournament",
    },
    tableMeta: {
      id: "admin/tournaments",
      entity: "tournament",
      method: "main",
      fields: [
        { name: "Name", field: "name" },
        { name: "Game", field: "game" },
        { name: "Game Mode", field: "gameMode" },
        { name: "Team Size", field: "teamSize" },
        { name: "Teams", field: "teams" },
        { name: "Status", field: "status" },
      ],
    },
  }),
  methods: {
    async deleteTournament(id) {
      try {
        await TournamentService.remove({ id });
        this.$swal("Success", "Successfully removed", "info");
        this.$store.dispatch("ui/refetchPage", {
          id: "admin/tournaments",
        });
      } catch (err) {
        this.$swal(
          "Oops",
          err.response
            ? err.response.data.message
            : "Something wrong, try again",
          "error"
        );
      }
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