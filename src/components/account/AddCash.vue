<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }">
    <script type="application/javascript" defer src="https://checkout.razorpay.com/v1/checkout.js"></script>
    <Modal :id="modals.addCash">
      <template v-slot:header>
        <h5 class="modal-title text-center w-100">Add Cash</h5>
      </template>
      <template v-slot:body>
        <form @submit.prevent="handleSubmit(createData)" id="addCashForm">
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
          id="rzp-button1"
          class="btn btn-primary"
          :disabled="invalid"
          form="addCashForm"
        >Submit</button>
      </template>
    </Modal>
  </ValidationObserver>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import Modal from "@/components/global/Modal.vue";
import cloneDeep from "lodash/cloneDeep";

import TransactionService from "@/api/transaction.api";

const RAZOR_KEY = process.env.RAZOR_KEY_ID
  ? process.env.RAZOR_KEY_ID
  : "rzp_test_qsELKeb8emh8lr";

export default {
  components: { Modal },
  data: () => ({
    modals: {
      addCash: "user/addCash",
    },
    form: {
      fields: [
        {
          label: "Amount",
          rules: { required: true, min_value: 10 },
          type: "number",
          model: "amount",
          errorText: "Minimum of 10 INR can be added",
        },
      ],
    },
    data: {
      amount: 10,
    },
    res: {
      transactionId: "",
      razorOrderId: "",
    },
  }),
  methods: {
    async createData() {
      try {
        const data = cloneDeep(this.data);
        const {
          data: { id, razorOrderId },
        } = await TransactionService.create({
          ...data,
          type: "addCash",
        });
        this.res.transactionId = id;
        this.res.razorOrderId = razorOrderId;
        this.callRazor();
      } catch (err) {
        this.$swal("Oops", "Something wrong, try again", "error");
      }
    },
    callRazor() {
      var options = {
        key: RAZOR_KEY,
        amount: this.data.amount * 100,
        currency: "INR",
        prefill: {
          name: this.getUser.info.name,
          email: this.getUser.email,
          contact: this.getUser.info.phone,
        },
        order_id: this.res.razorOrderId,
        handler: (response) => {
          this.handlePayment(response);
        },
        modal: {
          ondismiss: () => {
            this.cancelTransaction();
          },
        },
      };
      const rzp1 = new Vue.Razorpay(options);
      rzp1.open();
    },
    async handlePayment(response) {
      try {
        const {
          data: { message },
        } = await TransactionService.paid({
          id: this.res.transactionId,
          ...response,
        });
        this.$store.commit("ui/TOGGLE_MODAL", this.modals.addCash);
        this.$store.dispatch("user/authUser");
        this.$swal("Success", message, "info");
      } catch (err) {
        this.$swal("Oops", "Something wrong, try again", "error");
      }
    },
    async cancelTransaction() {
      try {
        await TransactionService.cancel({ id: this.res.transactionId });
        this.$swal("Oh!", "Transaction was cancelled", "error");
      } catch (err) {
        this.$swal("Oops", "Something wrong, try again", "error");
      }
    },
  },
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
    }),
  },
};
</script>