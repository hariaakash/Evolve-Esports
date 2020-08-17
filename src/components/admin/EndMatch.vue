<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }">
    <Modal :id="modals.endMatch">
      <template v-slot:header>
        <h5 class="modal-title text-center w-100">End Match</h5>
      </template>
      <template v-slot:body>
        <form @submit.prevent="handleSubmit(setData)" id="endMatchForm">
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
        <button class="btn btn-danger mr-auto" @click="removeMatch">Delete</button>
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
      id: "",
      date: "",
    },
  }),
  methods: {
    async setData() {
      try {
        const data = cloneDeep(this.data);
        data.date = moment(data.date).utcOffset(-330).format();
        await MatchService.edit(data);
        this.$swal("Success", "Successfully updated", "info");
        this.$store.dispatch("ui/refetchPage", {
          id: "admin/tournament/matches",
        });
        this.$store.commit("ui/TOGGLE_MODAL", this.modals.endMatch);
        this.data = { id: "", date: "" };
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
    async removeMatch() {
      try {
        await MatchService.remove({ id: this.data.id });
        this.$swal("Success", "Successfully removed", "info");
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
    setEditData() {
      this.data.id = this.parseField(this.getMatch, "_id");
      this.data.date = this.parseField(this.getMatch, "date");
      this.data.date = moment(this.data.date).format("YYYY-MM-DDTHH:mm");
    },
  },
  computed: {
    ...mapGetters({
      getMatch: "admin/getMatch",
    }),
  },
  watch: {
    getMatch() {
      this.setEditData();
    },
  },
};
</script>