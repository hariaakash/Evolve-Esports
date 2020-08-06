<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }">
    <Modal :id="modals.editUser">
      <template v-slot:header>
        <h5 class="modal-title text-center w-100">Edit User</h5>
      </template>
      <template v-slot:body>
        <form @submit.prevent="handleSubmit(editData)" id="editUserForm">
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
                <input class="form-check-input" type="checkbox" v-model="data.status" />
                <label class="form-check-label">Status</label>
              </div>
            </div>
          </div>
        </form>
      </template>
      <template v-slot:footer>
        <button type="submit" class="btn btn-primary" :disabled="invalid" form="editUserForm">Submit</button>
      </template>
    </Modal>
  </ValidationObserver>
</template>

<script>
import Modal from "@/components/global/Modal.vue";
import cloneDeep from "lodash/cloneDeep";
import { helpersMixin } from "@/mixins";
import AdminService from "@/api/admin.api";

export default {
  props: ["editUser"],
  components: { Modal },
  mixins: [helpersMixin],
  data: () => ({
    modals: {
      editUser: "admin/editUser",
    },
    form: {
      fields: [
        {
          label: "Name",
          rules: { required: true },
          type: "text",
          model: "name",
          errorText: "Name is required",
        },
        {
          label: "Gamer Tag",
          rules: { required: true },
          type: "text",
          model: "gamerTag",
          errorText: "Gamer Tag is required",
        },
        {
          label: "Description",
          rules: { required: true },
          type: "text",
          model: "desc",
          errorText: "Description is required",
        },
        {
          label: "Phone",
          rules: { required: true, digits: 10 },
          type: "number",
          model: "phone",
          errorText: "Phone is required",
        },
        {
          label: "Role",
          rules: { required: true, oneOf: ["user", "admin"] },
          type: "select",
          data: ["user", "admin"],
          model: "role",
          errorText: "Role is required",
        },
      ],
    },
    data: {
      name: "",
      gamerTag: "",
      desc: "",
      phone: "",
      role: "",
      status: "",
    },
  }),
  methods: {
    async editData() {
      try {
        const data = cloneDeep(this.data);
        const reqData = {
          info: {
            name: data.name,
            gamerTag: data.gamerTag,
            desc: data.desc,
            phone: data.phone,
          },
          role: data.role,
          status: data.status,
        };
        await AdminService.editUser(reqData);
        this.$swal("Success", "Successfully edited", "info");
        this.$store.dispatch("ui/refetchPage", { id: "admin/users" });
        this.$store.commit("ui/TOGGLE_MODAL", this.modals.editUser);
        this.data = {
          name: "",
          gamerTag: "",
          desc: "",
          phone: "",
          role: "",
          status: "",
        };
      } catch (err) {
        this.$swal("Oops", "Something wrong, try again", "error");
      }
    },
  },
  watch: {
    editUser: function (newvalue) {
      const fields = [
        { from: "info.name", to: "name" },
        { from: "info.gamerTag", to: "gamerTag" },
        { from: "info.desc", to: "desc" },
        { from: "info.phone", to: "phone" },
        "role",
        "status",
      ];
      fields.forEach((x) => {
        if (typeof x === "string") this.data[x] = this.parseField(newvalue, x);
        else this.data[x.to] = this.parseField(newvalue, x.from);
      });
      console.log(this.data);
    },
  },
};
</script>