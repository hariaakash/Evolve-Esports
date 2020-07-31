<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }">
    <Modal :id="createTournamentModalId">
      <template v-slot:header>
        <h5 class="modal-title text-center w-100">Create Tournament</h5>
      </template>
      <template v-slot:body>
        <form @submit.prevent="handleSubmit(setData)" id="createTournamentForm">
          <div class="form-row">
            <div class="form-group col-md-12" v-for="(field, index) in form.fields" :key="index">
              <label>{{field.label}}</label>
              <ValidationProvider :rules="field.rules" v-slot="{ errors, classes }">
                <select
                  v-if="field.type === 'select'"
                  v-model="editData[field.model]"
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
                  v-model="editData[field.model]"
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
          form="createTournamentForm"
        >Submit</button>
      </template>
    </Modal>
  </ValidationObserver>
</template>

<script>
import Modal from "@/components/global/Modal.vue";
import cloneDeep from "lodash/cloneDeep";
import { Timestamp } from "@/firebase";

export default {
  components: { Modal },
  data: () => ({
    createTournamentModalId: "admin/tournaments/create",
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
          label: "Game",
          rules: { required: true, oneOf: ["pubgm"] },
          type: "select",
          data: ["pubgm"],
          model: "game",
          errorText: "Game is required",
        },
        {
          label: "Team Type",
          rules: { required: true, oneOf: ["squad", "duo", "solo"] },
          type: "select",
          data: ["squad", "duo", "solo"],
          model: "teamType",
          errorText: "Team type is required",
        },
        {
          label: "Frequency",
          rules: { required: true, oneOf: ["once", "manual"] },
          type: "select",
          data: ["once", "manual"],
          model: "frequency",
          errorText: "Team type is required",
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
    uid: "",
    editData: {
      name: "",
      game: "pubgm",
      teamType: "",
      frequency: "",
      payment: 0,
    },
  }),
  methods: {
    async setData() {
      const editData = cloneDeep(this.editData);
      const payload = { uid: this.uid, data: { ...editData, status: true } };
      if (this.uid.length) payload.data.updatedAt = Timestamp.now();
      else payload.data.createdAt = Timestamp.now();
      try {
        await this.$store.dispatch("tournament/setTournament", payload);
        this.$store.commit("ui/TOGGLE_MODAL", this.createTournamentModalId);
        this.$swal("Success", "Successfully processed", "info");
      } catch (err) {
        this.$swal("Oops", "Something wrong, try again", "error");
      }
    },
  },
};
</script>