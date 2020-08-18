<template>
  <div class="table-responsive">
    <table class="table table-borderless text-white px-4">
      <thead class="py-1 head">
        <tr>
          <th scope="col">#</th>
          <th scope="col">COMPETITOR</th>
          <th scope="col">MATCHES</th>
          <th scope="col">KILLS</th>
          <th scope="col">POINTS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(group, index) in getScore" :key="index">
          <th scope="row">{{ index+1 }}</th>
          <td>{{ group.teamName }}</td>
          <td>{{ group.matches }}</td>
          <td>{{ group.kills }}</td>
          <td>{{ group.kills }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async created() {
    try {
      await this.$store.dispatch("ui/fetchScore");
    } catch (err) {
      this.$swal("Oops", "Fetching score failed, try again", "error");
    }
  },
  computed: {
    ...mapGetters({
      getScore: "ui/getScore",
    }),
  },
};
</script>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0 15px;
}
.head {
  background: linear-gradient(to left, #3b1f75, #4f64de);
}
</style>