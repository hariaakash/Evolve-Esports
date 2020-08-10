<template>
  <section class="tournament">
    <div class="card bg-main">
      <div class="card-header">
        <button class="btn btn-primary float-right" @click="toggleModal(modals.createMatch)">Create</button>
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
            <tr v-for="(match, index) in docs" :key="'docs' + index">
              <td>{{ ((page-1) * limit) + index+1 }}</td>
              <td>{{ match.date | formatDate }}</td>
              <td>{{ match.ended }}</td>
              <td>{{ match.groups.length }}</td>
              <td>
                <button type="button" class="btn btn-primary">
                  <font-awesome-icon :icon="['fa', 'arrow-right']" />
                </button>
              </td>
            </tr>
          </template>
        </Table>
      </div>
    </div>
    <CreateMatch />
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import CreateMatch from "./CreateMatch.vue";
import Table from "@/components/global/Table.vue";

import { helpersMixin } from "@/mixins";

export default {
  async created() {
    await this.$store.dispatch("admin/fetchTournament", {
      id: this.$route.params.id,
    });
    if (!this.getTournament) {
      this.$router.push({ name: "admin/tournaments" });
      this.$swal("Oops", "Tournament not found", "error");
    }
  },
  components: { Table, CreateMatch },
  mixins: [helpersMixin],
  data() {
    return {
      modals: {
        createMatch: "admin/createMatch",
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