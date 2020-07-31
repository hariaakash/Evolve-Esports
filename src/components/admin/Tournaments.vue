<template>
  <section class="tournaments">
    <div class="card bg-main">
      <div class="card-header">
        <button
          class="btn btn-primary float-right"
          @click="toggleModal(createTournamentModalId)"
        >Create</button>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <CreateTournament />
  </section>
</template>

<script>
import CreateTournament from "./CreateTournament.vue";

export default {
  components: { CreateTournament },
  data: () => ({
    createTournamentModalId: "admin/tournaments/create",
  }),
  methods: {
    toggleModal(id) {
      this.$store.commit("ui/TOGGLE_MODAL", id);
    },
  },
};
</script>

<style src="@/assets/css/admin/tournaments.css" scoped />