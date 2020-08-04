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
              <td
                v-for="(item, index) in tableMeta.fields"
                :key="'body' + index"
              >{{ tournament[item.field] }}</td>
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
    <CreateTournament />
  </section>
</template>

<script>
import CreateTournament from "./CreateTournament.vue";
import Table from "@/components/global/Table.vue";

import { helpersMixin } from "@/mixins";

export default {
  components: { CreateTournament, Table },
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
        { name: "Team Type", field: "teamType" },
        { name: "Frequency", field: "frequency" },
        { name: "Payment", field: "payment" },
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