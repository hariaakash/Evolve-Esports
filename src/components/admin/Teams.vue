<template>
  <div class="card bg-main">
    <div class="card-header" v-if="getScore">
      <span>{{ getScore.map((x) => x.user.info ? x.user.info.phone : x.user.email).join(', ') }}</span>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="py-1 head">
            <tr>
              <th scope="col">#</th>
              <th scope="col">TEAM</th>
              <th scope="col">Status</th>
              <th scope="col">MATCHES</th>
              <th scope="col">KILLS</th>
              <th scope="col">POINTS</th>
              <th scope="col">User</th>
              <th scope="col">Members</th>
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody v-if="getScore">
            <tr v-for="(group, index) in getScore" :key="index">
              <td>{{ index+1 }}</td>
              <td>{{ group.teamName }}</td>
              <td class="font-weight-normal">{{ group.status ? 'Active': 'Disqualified' }}</td>
              <td>{{ group.matches }}</td>
              <td>{{ group.kills }}</td>
              <td>{{ group.points }}</td>
              <td class="font-weight-normal text-lowercase">{{ group.user.email }}</td>
              <td class="font-weight-normal" v-html="group.members.join('<br>')"></td>
              <td>
                <button
                  type="button"
                  class="btn btn-primary btn-sm mr-2"
                  @click="triggerAction('toggleStatus', group._id)"
                >
                  <font-awesome-icon :icon="['fa', 'exclamation']" />
                </button>
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                  @click="triggerAction('kick', group._id)"
                >
                  <font-awesome-icon :icon="['fa', 'times']" />
                </button>
              </td>
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
  methods: {
    async triggerAction(action, id) {
      try {
        await TournamentService[action]({
          id: this.$route.params.id,
          teamId: id,
        });
        await this.$store.dispatch("admin/fetchScore", {
          id: this.$route.params.id,
        });
        this.$swal("Success", "Successfully updated", "info");
      } catch (err) {
        this.$swal(
          "Oops",
          err.response
            ? err.response.data.message
            : "Something wrong, try again",
          "error"
        );
      }
    },
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
