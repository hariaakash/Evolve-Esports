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
        <tr v-for="(group, index) in getTournament.groups" :key="index">
          <th scope="row">{{ index+1 }}</th>
          <td>{{ group.teamName }}</td>
          <td>{{ 0 }}</td>
          <td>{{ 0 }}</td>
          <td>{{ 0 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getTournament: "ui/getTournament",
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