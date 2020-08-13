<template>
  <section class="users">
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
            <tr v-for="(user, index) in docs" :key="'docs' + index">
              <td>{{ ((page-1) * limit) + index+1 }}</td>
              <td
                v-for="(item, index) in tableMeta.fields"
                :key="'body' + index"
              >{{ parseField(user, item.field) }}</td>
              <td>
                <button
                  @click="editUserDispatcher(user)"
                  type="button"
                  class="btn btn-primary btn-sm"
                >
                  <font-awesome-icon :icon="['fa', 'edit']" />
                </button>
              </td>
            </tr>
          </template>
        </Table>
      </div>
    </div>
    <EditUser />
  </section>
</template>

<script>
import EditUser from "./EditUser.vue";
import Table from "@/components/global/Table.vue";
import { helpersMixin } from "@/mixins";

export default {
  components: { Table, EditUser },
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
    editUser: null,
  }),
  methods: {
    editUserDispatcher(user) {
      this.$store.commit("admin/SET_USER", user);
      this.toggleModal(this.modals.editUser);
    },
  },
};
</script>

<style scoped>
.users {
  padding: 50px 0px;
}
.bg-main {
  background: #0c1330;
}
</style>