<template>
  <div class="card bg-main mt-3 mb-5">
    <div class="card-body">
      <h3 class="font-weight-light text-center text-uppercase">Tournaments</h3>
      <Table :tableMeta="tableMeta" class="pt-4">
        <template #header>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Game</th>
          <th scope="col">Mode</th>
          <th scope="col">Team</th>
          <th scope="col">View</th>
        </template>
        <template #body="{docs, page, limit}">
          <tr v-for="(tournament, index) in docs" :key="'docs' + index">
            <td>{{ ((page-1) * limit) + index+1 }}</td>
            <td>{{ tournament.name }}</td>
            <td>{{ tournament.game }}</td>
            <td>{{ tournament.gameMode }}</td>
            <td>{{ getTeam(tournament).teamName }}</td>
            <td>
              <router-link
                type="button"
                :to="{ name: 'tournaments/info', params: { id: tournament._id } }"
                class="btn btn-primary"
              >
                <font-awesome-icon :icon="['fa', 'arrow-right']" />
              </router-link>
            </td>
          </tr>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Table from "@/components/global/Table.vue";
import { helpersMixin } from "@/mixins";

export default {
  components: { Table },
  mixins: [helpersMixin],
  data() {
    return {
      tableMeta: {
        id: "account/tournaments",
        entity: "tournament",
        method: "main",
        filters: [
          {
            key: "groups.user",
            data: this.$store.state.user.id,
            type: "match",
          },
        ],
      },
      viewTeam: null,
    };
  },
  methods: {
    getTeam(tournament) {
      const group = tournament.groups.find((x) => x.user === this.getUser.id);
      return group;
    },
  },
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
    }),
  },
};
</script>

<style scoped>
.bg-main {
  background: #0c1330;
}
.red-border {
  border: 1px solid #dc3545;
}
</style>