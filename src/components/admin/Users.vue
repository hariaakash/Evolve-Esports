<template>
  <section class="users">
    <div class="card bg-main">
      <div class="card-header">
        <button class="btn btn-primary float-right" @click="toggleModal(editUserModalId)">Create</button>
      </div>
      <div class="card-body">
        <Table :tableData="tableData" />
      </div>
    </div>
    <EditUser />
  </section>
</template>

<script>
import EditUser from "./EditUser.vue";
import Table from "@/components/global/Table.vue";

import UserService from "@/api/user.api";

export default {
  components: { EditUser, Table },
  data: () => ({
    editUserModalId: "admin/users/edit",
    tableData: {
      name: "Users",
      ApiService: UserService,
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
  methods: {
    toggleModal(id) {
      this.$store.commit("ui/TOGGLE_MODAL", id);
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