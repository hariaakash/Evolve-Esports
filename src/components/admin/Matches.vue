<template>
  <div class="card bg-main">
    <div class="card-header">
      <h3 class="text-center font-weight-light">Matches List</h3>
      <button
        class="btn btn-primary float-left"
        @click="toggleModal(modals.editTournament)"
      >Edit Tournament</button>
      <button
        class="btn btn-primary float-right"
        @click="toggleModal(modals.createMatch)"
      >Create Match</button>
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
          <th scope="col">Options</th>
        </template>
        <template #body="{docs, page, limit}">
          <tr v-for="(match, index) in docs" :key="'docs' + index">
            <td>{{ ((page-1) * limit) + index+1 }}</td>
            <td>{{ match.date | formatDate }}</td>
            <td>{{ match.ended }}</td>
            <td>{{ match.groups.length }}</td>
            <td>
              <button
                type="button"
                class="btn btn-primary btn-sm mr-2"
                @click="nextMatch(match._id)"
              >
                <font-awesome-icon :icon="['fa', 'exclamation']" />
              </button>
              <button
                type="button"
                class="btn btn-primary btn-sm mr-2"
                @click="matchDispatcher('edit', match)"
              >
                <font-awesome-icon :icon="['fa', 'edit']" />
              </button>
              <button
                type="button"
                class="btn btn-primary btn-sm"
                @click="matchDispatcher('end', match)"
              >
                <font-awesome-icon :icon="['fa', 'times']" />
              </button>
            </td>
          </tr>
        </template>
      </Table>
    </div>
    <EditTournament />
    <CreateMatch />
    <EditMatch />
    <EndMatch />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CreateMatch from "@/components/admin/CreateMatch.vue";
import EditMatch from "@/components/admin/EditMatch.vue";
import EndMatch from "@/components/admin/EndMatch.vue";
import EditTournament from "@/components/admin/EditTournament.vue";
import Table from "@/components/global/Table.vue";
import { helpersMixin } from "@/mixins";
import TournamentService from "@/api/tournament.api";

export default {
  components: { Table, CreateMatch, EditMatch, EditTournament, EndMatch },
  mixins: [helpersMixin],
  data() {
    return {
      modals: {
        createMatch: "admin/createMatch",
        editMatch: "admin/editMatch",
        endMatch: "admin/endMatch",
        editTournament: "admin/editTournament",
      },
      tableMeta: {
        id: "admin/tournament/matches",
        entity: "match",
        method: "main",
        filters: [
          { key: "tournament", data: this.$route.params.id, type: "match" },
        ],
        fields: [
          { name: "Date", field: "date" },
          { name: "Ended", field: "ended" },
          { name: "Groups", field: "groups" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      getTournament: "admin/getTournament",
    }),
  },
  methods: {
    matchDispatcher(type, match) {
      this.$store.commit("admin/SET_MATCH", match);
      this.toggleModal(this.modals[`${type}Match`]);
    },
    async nextMatch(matchId) {
      try {
        await TournamentService.nextMatch({
          id: this.getTournament._id,
          matchId,
        });
        this.$swal("Success", "Successfully updated", "info");
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
.bg-main {
  background: #0c1330;
}
</style>