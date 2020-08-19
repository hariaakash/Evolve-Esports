<template>
  <div class="card bg-main">
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="py-1 head">
            <tr>
              <th scope="col">#</th>
              <th scope="col">TEAM</th>
              <th scope="col">MATCHES</th>
              <th scope="col">KILLS</th>
              <th scope="col">POINTS</th>
              <th scope="col">User</th>
              <th scope="col">Members</th>
            </tr>
          </thead>
          <tbody v-if="getScore">
            <tr v-for="(group, index) in getScore" :key="index">
              <td>{{ index+1 }}</td>
              <td>{{ group.teamName }}</td>
              <td>{{ group.matches }}</td>
              <td>{{ group.kills }}</td>
              <td>{{ group.points }}</td>
              <td>{{ group.user.email }}</td>
              <td>{{ group.members.join(', ') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { helpersMixin } from "@/mixins";
import TournamentService from "@/api/tournament.api";

export default {
  async created() {
    try {
      await this.$store.dispatch("admin/fetchScore", {
        id: this.$route.params.id,
      });
    } catch (err) {
      this.$swal(
        "Oops",
        err.response ? err.response.data.message : "Something wrong, try again",
        "error"
      );
    }
  },
  computed: {
    ...mapGetters({
      getScore: "admin/getScore",
    }),
  },
};
</script>

<style scoped>
.bg-main {
  background: #0c1330;
}
</style>
<style src="@/assets/css/global/table.css" scoped />
