<template>
  <div>
    <div v-if="docs.length" class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <slot name="header">
              <th scope="col">#</th>
              <th
                scope="col"
                v-for="(item, index) in tableData.fields"
                :key="'head' + index"
              >{{ item.name }}</th>
            </slot>
          </tr>
        </thead>
        <tbody>
          <slot name="body" :docs="docs" :page="page" :limit="limit">
            <tr v-for="(columnData, index) in docs" :key="'docs' + index">
              <td>{{ ((page-1) * limit) + index+1 }}</td>
              <td
                v-for="(item, index) in tableData.fields"
                :key="'body' + index"
              >{{ columnData[item.field] }}</td>
            </tr>
          </slot>
        </tbody>
      </table>
      <nav>
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ 'disabled': page === 1 }">
            <button class="page-link" @click="prevPage">Previous</button>
          </li>
          <li
            class="page-item"
            v-for="(item, index) in totalPages"
            :key="'pagination' + index"
            :class="{'active': item === page}"
          >
            <button class="page-link" @click="selectedPage(item)">{{item}}</button>
          </li>
          <li class="page-item" :class="{ 'disabled': page === totalPages }">
            <button class="page-link" @click="nextPage">Next</button>
          </li>
        </ul>
      </nav>
    </div>
    <h5 v-else class="text-center">Empty data</h5>
  </div>
</template>

<script>
export default {
  props: {
    tableData: { type: Object },
  },
  async created() {
    await this.fetchData(1);
  },
  data: () => ({
    totalDocs: 0,
    docs: [],
    limit: 10,
    totalPages: 1,
    page: 1,
  }),
  methods: {
    async fetchData(page) {
      try {
        const { data } = await this.tableData.ApiService.main({
          id: "list",
          filters: [],
          options: {
            select: [],
            pagination: true,
            page,
            limit: this.limit,
            search: "",
          },
        });
        this.docs = data.docs;
        this.totalDocs = data.meta.totalDocs;
        this.totalPages = data.meta.totalPages;
        this.page = data.meta.page;
      } catch (err) {
        console.log(err);
        this.$swal("Oops", "Fetching data failed", "error");
      }
    },
    async nextPage() {
      if (this.page !== this.totalPages) await this.fetchData(this.page + 1);
    },
    async prevPage() {
      if (this.page !== 1) await this.fetchData(this.page - 1);
    },
    async selectedPage(selection) {
      if (this.page !== selection) await this.fetchData(selection);
    },
  },
};
</script>

<style src="@/assets/css/global/table.css" scoped />