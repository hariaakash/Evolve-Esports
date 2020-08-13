<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }">
    <Modal :id="modals.createMatch">
      <template v-slot:header>
        <h5 class="modal-title text-center w-100">Create Match</h5>
      </template>
      <template v-slot:body>
        <form @submit.prevent="handleSubmit(createData)" id="createMatchForm">
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
          form="createMatchForm"
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

import MatchService from "@/api/match.api";

export default {
  components: { Modal },
  data: () => ({
    modals: {
      createMatch: "admin/createMatch",
    },
    form: {
      fields: [
        {
          label: "Date",
          rules: { required: true },
          type: "datetime-local",
          model: "date",
          errorText: "Date is required",
        },
      ],
    },
    data: {
      date: "",
    },
  }),
  methods: {
    async createData() {
      try {
        const data = cloneDeep(this.data);
        data.tournament = this.getTournament._id;
        data.date = moment(data.date).utcOffset(-330).format();
        await MatchService.create(data);
        this.$swal("Success", "Successfully created", "info");
        this.$store.dispatch("ui/refetchPage", {
          id: "admin/tournament/matches",
        });
        this.$store.commit("ui/TOGGLE_MODAL", this.modals.createMatch);
        this.data = {
          date: "",
        };
      } catch (err) {
        this.$swal("Oops", "Something wrong, try again", "error");
      }
    },
  },
  computed: {
    ...mapGetters({
      getTournament: "admin/getTournament",
    }),
  },
};
</script>