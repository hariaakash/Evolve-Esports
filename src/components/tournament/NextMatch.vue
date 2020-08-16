<template>
  <div class="next-match py-3 mb-3 text-center" v-if="checkPossibility()">
    <h5 class="display-4">Next Match Starts In:</h5>
    <div class="next-counter">
      <Timer :endTime="getTime()" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
import Timer from "@/components/global/Timer.vue";

export default {
  components: { Timer },
  methods: {
    getTime() {
      return moment(this.getTournament.dates.next).utcOffset(330).unix();
    },
    checkPossibility() {
      const isAfter = moment(this.getTournament.dates.next)
        .utcOffset(330)
        .isAfter(new Date());
      return this.getTournament.dates.next && isAfter;
    },
  },
  computed: {
    ...mapGetters({
      getTournament: "ui/getTournament",
    }),
  },
};
</script>

<style scoped>
.next-match {
  border-radius: 16px;
  background: linear-gradient(to left, #3b1f75, #4f64de);
}
</style>