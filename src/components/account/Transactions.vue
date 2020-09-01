<template>
  <div class="card bg-main mt-3 mb-5">
    <div class="card-body">
      <h3 class="font-weight-light text-center text-uppercase">Transactions</h3>
      <Table :tableMeta="tableMeta" class="pt-4">
        <template #header>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Type</th>
          <th scope="col">Amount</th>
          <th scope="col">Status</th>
        </template>
        <template #body="{docs, page, limit}">
          <tr v-for="(transaction, index) in docs" :key="'docs' + index">
            <td>{{ ((page-1) * limit) + index+1 }}</td>
            <td>{{ transaction.created_at | formatDate }}</td>
            <td>{{ transaction.type }}</td>
            <td>{{ transaction.amount }}</td>
            <td>
              <span class="badge" :class="getStatusClass(transaction)">{{ transaction.status }}</span>
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
        id: "account/Transactions",
        entity: "transaction",
        method: "main",
        filters: [
          {
            key: "user",
            data: this.$store.state.user.id,
            type: "match",
          },
        ],
        options: {
          sort: {
            field: "created_at",
            asc: false,
          },
        },
      },
      viewTeam: null,
    };
  },
  methods: {
    getStatusClass(transaction) {
      if (transaction.status === "paid") return "badge-success";
      if (transaction.status === "cancelled") return "badge-danger";
      return "badge-primary";
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