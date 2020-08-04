<template>
  <section class="tournaments">
    <div class="card bg-main">
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
              >{{ parseField(tournament, item.field) }}</td>
              <td>
                <button type="button" class="btn btn-primary btn-sm">
                  <font-awesome-icon :icon="['fa', 'edit']" />
                </button>
              </td>
            </tr>
          </template>
        </Table>
      </div>
    </div>
  </section>
</template>

<script>
import Table from "@/components/global/Table.vue";

import { helpersMixin } from "@/mixins";

export default {
  components: { Table },
  mixins: [helpersMixin],
  data: () => ({
    modals: {
      editUser: "admin/editUser",
    },
    tableMeta: {
      id: "admin/users",
      entity: "user",
      method: "main",
      fields: [
        { name: "Email", field: "email" },
        { name: "Name", field: "info.name" },
        { name: "Gamer Tag", field: "info.gamerTag" },
        { name: "Phone", field: "info.phone" },
        { name: "Role", field: "role" },
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