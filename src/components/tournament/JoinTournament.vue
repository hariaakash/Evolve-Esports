<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }">
    <Modal :id="modals.joinTournament">
      <template v-slot:header>
        <h5 class="modal-title text-center w-100">Join Tournament</h5>
      </template>
      <template v-slot:body>
        <form @submit.prevent="handleSubmit(createData)" id="joinTournamentForm">
          <div class="form-row">
            <div class="form-group col-md-12" v-for="(field, index) in form.fields" :key="index">
              <label>{{field.label}}</label>
              <ValidationProvider :rules="field.rules" v-slot="{ errors, classes }">
                <select
                  v-if="field.type === 'select'"
                  v-model="data[field.model]"
                  class="form-control"
                >
                  <option disabled value>Please select one</option>
                  <option
                    v-for="(data, index) in field.data"
                    :key="field.model + index"
                    :value="data"
                  >{{ data.toUpperCase() }}</option>
                </select>
                <input
                  v-else
                  :type="field.type"
                  v-model="data[field.model]"
                  class="form-control"
                  :placeholder="field.placeholder"
                  :class="classes"
                />
                <div v-if="errors[0]" class="invalid-feedback">{{ field.errorText }}</div>
              </ValidationProvider>
            </div>
          </div>
        </form>
      </template>
      <template v-slot:footer>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="invalid"
          form="joinTournamentForm"
        >Submit</button>
      </template>
    </Modal>
  </ValidationObserver>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import Modal from "@/components/global/Modal.vue";
import cloneDeep from "lodash/cloneDeep";

import TournamentService from "@/api/tournament.api";

export default {
  async created() {
    for (let i = 0; i < this.getTournament.teamSize; i++) {
      this.form.fields.push({
        label: `Member ${i + 1} IGN (In Game Name)`,
        rules: { required: true },
        type: "text",
        model: `members${i}`,
        errorText: "Member name is required",
      });
    }
  },
  components: { Modal },
  data: () => ({
    modals: {
      joinTournament: "tournament/joinTournament",
    },
    form: {
      fields: [
        {
          label: "Team Name",
          rules: { required: true },
          type: "text",
          model: "teamName",
          errorText: "Team name is required",
        },
      ],
    },
    data: {
      teamName: "",
    },
  }),
  methods: {
    async createData() {
      try {
        const data = cloneDeep(this.data);
        const members = [];
        for (let i = 0; i < this.getTournament.teamSize; i++) {
          members.push(data[`members${i}`]);
        }
        const reqData = {
          id: this.getTournament._id,
          teamName: data.teamName,
          members,
        };
        await TournamentService.join(reqData);
        this.$swal("Success", "Successfully joined", "info");
        this.$store.commit("ui/TOGGLE_MODAL", this.modals.joinTournament);
        await this.$store.dispatch("ui/fetchTournament", {
          id: this.$route.params.id,
        });
        await this.$store.dispatch("user/authUser");
        this.$router.push({
          name: "tournaments/info",
          params: { id: this.$route.params.id },
        });
        this.data = { teamName: "" };
        for (let i = 0; i < this.getTournament.teamSize; i++) {
          this.data[`members${i}`] = "";
        }
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
      getTournament: "ui/getTournament",
    }),
  },
};
</script>