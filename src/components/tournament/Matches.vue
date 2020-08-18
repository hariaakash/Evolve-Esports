<template>
  <div class="table-responsive" v-if="getMatches.length">
    <table class="table table-borderless text-white px-4">
      <thead class="py-1 head">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Relative</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(match, index) in getMatches" :key="index">
          <th scope="row">{{ index+1 }}</th>
          <td>
            <font-awesome-icon :icon="['fa', 'calendar-day']" />
            {{ match.date | formatDay }}
          </td>
          <td>
            <font-awesome-icon :icon="['fa', 'clock']" />
            {{ match.date | formatTime }}
          </td>
          <td>
            <span class="badge badge-primary">{{ match.date | fromNow }}</span>
          </td>
          <td>{{ match.ended ? 'Ended' : 'Yet to happen' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="h5 text-center">Come back later</div>
</template>

<script>
import { mapGetters } from "vuex";
import { helpersMixin } from "@/mixins";

export default {
  mixins: [helpersMixin],
  async created() {
    try {
      await this.$store.dispatch("ui/fetchMatches");
    } catch (err) {
      this.$swal("Oops", "Fetching matches failed, try again", "error");
    }
  },
  computed: {
    ...mapGetters({
      getMatches: "ui/getMatches",
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