<template>
  <div class="card red-border">
    <div class="card-body bg-main">
      <h3 class="font-weight-light text-center text-uppercase">Tournaments</h3>
      <Table :tableMeta="tableMeta" class="pt-4">
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
import Table from "@/components/global/Table.vue";

export default {
  components: { Table },
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
        fields: [
          { name: "Name", field: "name" },
          { name: "Game", field: "game" },
        ],
      },
    };
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