<template>
  <div>
    <h5 v-if="tableData.docs.length == 0" class="text-center">Empty data</h5>
    <div v-else class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <slot name="header">
              <th scope="col">#</th>
              <th
                scope="col"
                v-for="(item, index) in tableMeta.fields"
                :key="'head' + index"
              >{{ item.name }}</th>
            </slot>
          </tr>
        </thead>
        <tbody>
          <slot name="body" :docs="tableData.docs" :page="tableData.page" :limit="tableData.limit">
            <tr v-for="(columnData, index) in tableData.docs" :key="'docs' + index">
              <td>{{ ((tableData.page-1) * tableData.limit) + (index + 1) }}</td>
              <td
                v-for="(item, index) in tableMeta.fields"
                :key="'body' + index"
              >{{ columnData[item.field] }}</td>
            </tr>
          </slot>
        </tbody>
      </table>
    </div>
    <nav v-if="tableData.page > 1" class="pt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ 'disabled': tableData.page === 1 }">
          <button class="page-link" @click="prevPage">Previous</button>
        </li>
        <li
          class="page-item"
          v-for="(item, index) in tableData.totalPages"
          :key="'pagination' + index"
          :class="{'active': item === tableData.page}"
        >
          <button class="page-link" @click="selectedPage(item)">{{item}}</button>
        </li>
        <li class="page-item" :class="{ 'disabled': tableData.page === tableData.totalPages }">
          <button class="page-link" @click="nextPage">Next</button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    tableMeta: { type: Object },
  },
  async created() {
    await this.$store.dispatch("ui/initTable", {
      totalDocs: 0,
      docs: [],
      limit: 10,
      totalPages: 1,
      page: 1,
      ...this.tableMeta,
    });
  },
  methods: {
    async nextPage() {
      await this.$store.dispatch("ui/nextPage", { id: this.tableMeta.id });
    },
    async prevPage() {
      await this.$store.dispatch("ui/nextPage", { id: this.tableMeta.id });
    },
    async selectedPage(selectedPage) {
      await this.$store.dispatch("ui/nextPage", {
        id: this.tableMeta.id,
        selectedPage,
      });
    },
  },
  computed: {
    ...mapGetters({
      tableById: "ui/tableById",
    }),
    tableData() {
      return this.tableById(this.tableMeta.id);
    },
  },
  beforeDestroy() {
    this.$store.commit("ui/DEL_TABLE", { id: this.tableMeta.id });
  },
};
</script>

<style src="@/assets/css/global/table.css" scoped />