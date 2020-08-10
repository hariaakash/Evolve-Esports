<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }">
    <Modal :id="modals.editMatch">
      <template v-slot:header>
        <h5 class="modal-title text-center w-100">Edit Match</h5>
      </template>
      <template v-slot:body>
        <form @submit.prevent="handleSubmit(editData)" id="editMatchForm">
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
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="data.ended" />
                <label class="form-check-label">Ended</label>
              </div>
            </div>
          </div>
        </form>
      </template>
      <template v-slot:footer>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="invalid"
          form="editMatchForm"
        >Submit</button>
      </template>
    </Modal>
  </ValidationObserver>
</template>

<script>
import moment from "moment";
import Modal from "@/components/global/Modal.vue";
import { helpersMixin } from "@/mixins";
import cloneDeep from "lodash/cloneDeep";

import MatchService from "@/api/match.api";

export default {
  props: ["editMatch"],
  components: { Modal },
  mixins: [helpersMixin],
  data: () => ({
    modals: {
      editMatch: "admin/editMatch",
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
      ended: "",
    },
  }),
  methods: {
    async editData() {
      try {
        const data = cloneDeep(this.data);
        await MatchService.edit(data);
        this.$swal("Success", "Successfully edited", "info");
        this.$store.dispatch("ui/refetchPage", {
          id: "admin/tournament/matches",
        });
        this.$store.commit("ui/TOGGLE_MODAL", this.modals.editMatch);
        this.data = { date: "", ended: "" };
      } catch (err) {
        this.$swal("Oops", "Something wrong, try again", "error");
      }
    },
  },
  watch: {
    editMatch: function (newvalue) {
      this.data.id = this.parseField(newvalue, "_id");
      this.data.date = this.parseField(newvalue, "date");
      this.data.date = moment(this.data.date).format("YYYY-MM-DDTHH:mm");
      this.data.ended = this.parseField(newvalue, "ended");
    },
  },
};
</script>