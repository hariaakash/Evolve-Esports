<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }">
    <Modal :id="modals.endMatch" size="modal-xl">
      <template v-slot:header>
        <h5 class="modal-title text-center w-100">End Match</h5>
      </template>
      <template v-slot:body>
        <form @submit.prevent="handleSubmit(saveData)" id="endMatchForm">
          <table class="table table-borderless table-hover text-white">
            <thead class="head">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Team</th>
                <th scope="col">Members</th>
                <th scope="col">Status</th>
                <th scope="col">Position</th>
                <th scope="col">Kills</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(team, index) in data" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ team.teamName }}</td>
                <td v-html="team.members.join('<br>')"></td>
                <td>{{ team.status ? 'Active': 'Disqualified' }}</td>
                <td>
                  <ValidationProvider :rules="positionRule" v-slot="{ errors, classes }">
                    <input
                      v-model.number="team.position"
                      type="number"
                      class="form-control"
                      placeholder="Position"
                      :disabled="!team.status"
                      :class="classes"
                    />
                    <div v-if="errors[0]" class="invalid-feedback">Minimum value is -1</div>
                  </ValidationProvider>
                </td>
                <td>
                  <ValidationProvider :rules="pointsRule" v-slot="{ errors, classes }">
                    <input
                      v-model.number="team.kills"
                      type="number"
                      class="form-control"
                      placeholder="Kills"
                      :disabled="!team.status"
                      :class="classes"
                    />
                    <div v-if="errors[0]" class="invalid-feedback">Minimum value is 0</div>
                  </ValidationProvider>
                </td>
                <td>
                  <ValidationProvider :rules="pointsRule" v-slot="{ errors, classes }">
                    <input
                      v-model.number="team.points"
                      type="number"
                      class="form-control"
                      placeholder="Points"
                      :disabled="!team.status"
                      :class="classes"
                    />
                    <div v-if="errors[0]" class="invalid-feedback">Minimum value is 0</div>
                  </ValidationProvider>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="h5 text-right">{{ getStats }}</div>
        </form>
      </template>
      <template v-slot:footer>
        <button class="btn btn-primary mr-auto" @click="sort">Sort</button>
        <button type="submit" class="btn btn-primary" :disabled="invalid" form="endMatchForm">Submit</button>
      </template>
    </Modal>
  </ValidationObserver>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import Modal from "@/components/global/Modal.vue";
import { helpersMixin } from "@/mixins";
import cloneDeep from "lodash/cloneDeep";

import MatchService from "@/api/match.api";

export default {
  components: { Modal },
  mixins: [helpersMixin],
  data: () => ({
    modals: {
      endMatch: "admin/endMatch",
    },
    form: {
      fields: [],
    },
    data: [],
    positionRule: { required: true, min_value: -1 },
    pointsRule: { required: true, min_value: 0 },
  }),
  methods: {
    async saveData() {
      try {
        const data = cloneDeep(this.data);
        const reqData = {
          id: this.getMatch._id,
          groups: data.map((x) => ({
            _id: x._id,
            position: x.position,
            kills: x.kills,
            points: x.points,
          })),
        };
        await MatchService.end(reqData);
        this.$swal("Success", "Successfully updated", "info");
        this.$store.dispatch("ui/refetchPage", {
          id: "admin/tournament/matches",
        });
        this.$store.commit("ui/TOGGLE_MODAL", this.modals.endMatch);
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
    sort() {
      const groups = cloneDeep(this.data);
      const positioned = groups.filter((x) => x.position !== -1);
      const non = groups.filter((x) => x.position === -1);
      this.data = positioned.sort((a, b) => a.position - b.position);
      this.data.push(...non);
    },
    setEditData() {
      if (this.getMatch.groups) {
        this.getMatch.groups.forEach((group) => {
          const index = this.data.findIndex((x) => x._id === group._id);
          if (index !== -1) {
            this.data[index].position = group.position;
            this.data[index].kills = group.kills;
            this.data[index].points = group.points;
          }
        });
        this.data.sort((x, y) => y.status - x.status);
      }
    },
  },
  computed: {
    ...mapGetters({
      getMatch: "admin/getMatch",
      getTournament: "admin/getTournament",
    }),
    getStats() {
      let kills = 0;
      let points = 0;
      this.data.forEach((x) => {
        kills += x.kills;
        points += x.points;
      });
      return `Kills: ${kills}, Points: ${points}`;
    },
  },
  watch: {
    getTournament() {
      this.data = [];
      const groups = cloneDeep(this.getTournament.groups);
      this.data = groups.map((x) => ({
        ...x,
        position: -1,
        kills: 0,
        points: 0,
      }));
      if (this.getMatch) this.setEditData();
    },
    getMatch() {
      this.setEditData();
    },
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
  border-radius: 40px;
}
.table-hover tbody tr:hover {
  color: #fff;
}
</style>