<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }">
    <Modal :id="modals.editTournament">
      <template v-slot:header>
        <h5 class="modal-title text-center w-100">Edit Tournament</h5>
      </template>
      <template v-slot:body>
        <form @submit.prevent="handleSubmit(editData)" id="editTournamentForm">
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
                <textarea
                  v-else-if="field.type === 'textarea'"
                  v-model="data[field.model]"
                  class="form-control"
                  :class="classes"
                />
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
            <div class="form-group col-md-12">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="data.status" />
                <label class="form-check-label">Status</label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="data.registration" />
                <label class="form-check-label">Registration</label>
              </div>
            </div>
          </div>
        </form>
      </template>
      <template v-slot:footer>
        <button class="btn btn-danger mr-auto" @click="removeTournament">Delete</button>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="invalid"
          form="editTournamentForm"
        >Submit</button>
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

import TournamentService from "@/api/tournament.api";

export default {
  components: { Modal },
  mixins: [helpersMixin],
  data: () => ({
    modals: {
      editTournament: "admin/editTournament",
    },
    form: {
      fields: [
        {
          label: "Name",
          rules: { required: true },
          type: "text",
          model: "name",
          errorText: "Tournament name is required",
        },
        {
          label: "Description",
          rules: { required: true },
          type: "textarea",
          model: "desc",
          errorText: "Description is required",
        },
        {
          label: "Game",
          rules: { required: true, oneOf: ["pubgm", "valorant"] },
          type: "select",
          data: ["pubgm", "valorant"],
          model: "game",
          errorText: "Game is required",
        },
        {
          label: "Game Mode",
          rules: { required: true },
          type: "text",
          model: "gameMode",
          errorText: "Game Mode is required",
        },
        {
          label: "Team Size",
          rules: { required: true, min_value: 1 },
          type: "number",
          model: "teamSize",
          errorText: "Team Size is required",
        },
        {
          label: "Teams",
          rules: { required: true, min_value: 2 },
          type: "number",
          model: "teams",
          errorText: "Teams is required",
        },
        {
          label: "Frequency",
          rules: { required: true, oneOf: ["once", "manual"] },
          type: "select",
          data: ["once", "manual"],
          model: "frequency",
          errorText: "Frequency of match occurrence is required",
        },
        {
          label: "Payment",
          rules: { required: true, min_value: 0 },
          type: "number",
          model: "payment",
          errorText: "Payment is required",
        },
      ],
    },
    data: {
      id: "",
      name: "",
      desc: "",
      game: "pubgm",
      gameMode: "SQUAD",
      teamSize: 4,
      teams: 25,
      frequency: "",
      payment: 0,
      registration: false,
      status: true,
    },
  }),
  methods: {
    async editData() {
      try {
        const data = cloneDeep(this.data);
        await TournamentService.edit(data);
        this.$store.commit("ui/TOGGLE_MODAL", this.modals.editTournament);
        this.$swal("Success", "Successfully updated", "info");
        await this.$store.dispatch("admin/fetchTournament", {
          id: this.$route.params.id,
        });
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
    async removeTournament() {
      try {
        await TournamentService.remove({ id: this.getTournament._id });
        this.$store.commit("ui/TOGGLE_MODAL", this.modals.editTournament);
        this.$swal("Success", "Successfully removed", "info");
        this.$router.push({ name: "admin/tournaments" });
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
    setEditData() {
      const fields = [
        "name",
        "desc",
        "game",
        "gameMode",
        "teamSize",
        "teams",
        "frequency",
        "payment",
        "registration",
        "status",
      ];
      this.data.id = this.parseField(this.getTournament, "_id");
      fields.forEach((x) => {
        this.data[x] = this.parseField(this.getTournament, x);
      });
    },
  },
  computed: {
    ...mapGetters({
      getTournament: "admin/getTournament",
    }),
  },
  watch: {
    getTournament() {
      this.setEditData();
    },
  },
};
</script>