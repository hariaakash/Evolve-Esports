<template>
  <div class="table-responsive" v-if="getScore && getScore.length">
    <table class="table table-borderless text-white px-4">
      <thead class="py-1 head">
        <tr>
          <th scope="col">#</th>
          <th scope="col">TEAM</th>
          <th scope="col">MATCHES</th>
          <th scope="col">KILLS</th>
          <th scope="col">POINTS</th>
          <th scope="col">Members</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(group, index) in getScore" :key="index">
          <th scope="row">{{ index+1 }}</th>
          <td>{{ group.teamName }}</td>
          <td colspan="3" v-if="!group.status" class="text-center">
            <span class="badge badge-danger">Disqualified / Inactive</span>
          </td>
          <td v-if="group.status">{{ group.matches }}</td>
          <td v-if="group.status">{{ group.kills }}</td>
          <td v-if="group.status">{{ group.points }}</td>
          <td v-html="group.members.join('<br>')" class="font-weight-lighter"></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="h5 text-center">Come back later</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async created() {
    try {
      await this.$store.dispatch("ui/fetchScore");
    } catch (err) {
      this.$swal("Oops", "Fetching score failed, try reloading", "error");
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