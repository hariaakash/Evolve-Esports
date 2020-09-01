<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }">
    <Modal :id="modals.SMSTournament">
      <template v-slot:header>
        <h5 class="modal-title text-center w-100">SMS Tournament</h5>
      </template>
      <template v-slot:body>
        <form @submit.prevent="handleSubmit(sendSMS)" id="SMSTournamentForm">
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
          form="SMSTournamentForm"
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

import AdminService from "@/api/admin.api";

export default {
  components: { Modal },
  data: () => ({
    modals: {
      SMSTournament: "admin/SMSTournament",
    },
    form: {
      fields: [
        {
          label: "Room id",
          rules: { required: true },
          type: "string",
          model: "roomid",
          errorText: "Roomid is required",
        },
        {
          label: "Room pass",
          rules: { required: true },
          type: "string",
          model: "pass",
          errorText: "Room password is required",
        },
      ],
    },
    data: {
      roomid: "",
      pass: "",
    },
  }),
  methods: {
    async sendSMS() {
      try {
        await AdminService.smsTournament({
          id: this.$route.params.id,
          info: cloneDeep(this.data),
        });
        this.$swal("Success", "Successfully sent", "info");
        this.$store.commit("ui/TOGGLE_MODAL", this.modals.SMSTournament);
        this.data = {
          roomid: "",
          pass: "",
        };
      } catch (err) {
        this.$swal("Oops", "Something wrong, try again", "error");
      }
    },
  },
};
</script>