<template>
  <section class="tournament">
    <div class="container">
      <div class="row">
        <div class="col-12 pt-3" v-if="getTournament">
          <Head />
          <Main />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { helpersMixin } from "@/mixins";
import Head from "@/components/tournament/Head.vue";
import Main from "@/components/tournament/Main.vue";

export default {
  components: { Head, Main },
  mixins: [helpersMixin],
  async created() {
    try {
      await this.$store.dispatch("ui/fetchTournament", {
        id: this.$route.params.id,
      });
      if (!this.getTournament) {
        this.$router.push({ name: "tournaments" });
        this.$swal("Oops", "Tournament not found", "error");
      }
    } catch (err) {
      this.$router.push({ name: "tournaments" });
    }
  },
  computed: {
    ...mapGetters({
      getTournament: "ui/getTournament",
    }),
  },
};
</script>

<style scoped>
.tournament {
  background: #070b28;
}
</style>