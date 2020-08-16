<template>
  <section class="tournament">
    <div class="row">
      <div class="col-12"></div>
      <div class="col-12">
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
                <th scope="col">Edit</th>
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
                      class="btn btn-primary"
                      @click="editMatchDispatcher(match)"
                    >
                      <font-awesome-icon :icon="['fa', 'edit']" />
                    </button>
                  </td>
                </tr>
              </template>
            </Table>
          </div>
        </div>
      </div>
    </div>
    <CreateMatch />
    <EditMatch />
    <EditTournament />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import CreateMatch from "./CreateMatch.vue";
import EditMatch from "./EditMatch.vue";
import EditTournament from "./EditTournament.vue";
import Table from "@/components/global/Table.vue";

import { helpersMixin } from "@/mixins";

export default {
  async created() {
    try {
      await this.$store.dispatch("admin/fetchTournament", {
        id: this.$route.params.id,
      });
      if (!this.getTournament) {
        this.$router.push({ name: "admin/tournaments" });
        this.$swal("Oops", "Tournament not found", "error");
      }
    } catch (err) {
      this.$router.push({ name: "admin/tournaments" });
    }
  },
  components: { Table, CreateMatch, EditMatch, EditTournament },
  mixins: [helpersMixin],
  data() {
    return {
      modals: {
        createMatch: "admin/createMatch",
        editMatch: "admin/editMatch",
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
    editMatchDispatcher(match) {
      this.$store.commit("admin/SET_MATCH", match);
      this.toggleModal(this.modals.editMatch);
    },
  },
};
</script>

<style scoped>
.tournament {
  padding: 50px 0px;
}
.bg-main {
  background: #0c1330;
}
</style>