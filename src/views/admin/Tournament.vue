<template>
  <section class="tournament">
    <div class="row">
      <div class="col-12">
        <router-view />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  async created() {
    try {
      await this.$store.dispatch("admin/fetchTournament", {
        id: this.$route.params.id,
      });
      if (!this.getTournament) {
        this.$router.push({ name: "admin/tournaments" });
        this.$swal("Oops", "Tournament not found", "error");
      }
    } catch (err) {
      this.$router.push({ name: "admin/tournaments" });
    }
  },
  computed: {
    ...mapGetters({
      getTournament: "admin/getTournament",
    }),
  },
};
</script>

<style scoped>
.tournament {
  padding: 50px 0px;
}
</style>