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
                  :to="{ name: 'admin/tournaments/matches', params: { id: tournament._id }  }"
                  type="button"
                  class="btn btn-primary btn-sm"
                >
                  <font-awesome-icon :icon="['fa', 'arrow-right']" />
                </router-link>
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
import CreateTournament from "@/components/admin/CreateTournament.vue";
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