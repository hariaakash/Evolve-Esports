<template>
  <section class="profile-edit">
    <ValidationObserver ref="editProfileForm" v-slot="{ invalid, handleSubmit }">
      <form @submit.prevent="handleSubmit(setProfileData)">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Name</label>
            <ValidationProvider rules="required|min:4" v-slot="{ errors, classes }">
              <input
                type="text"
                v-model="editData.name"
                class="form-control"
                placeholder="Noob Master"
                :class="classes"
              />
              <div
                v-if="errors[0]"
                class="invalid-feedback"
              >Required field with a minimum of 4 characters</div>
            </ValidationProvider>
          </div>
          <div class="form-group col-md-6">
            <label>Phone</label>
            <ValidationProvider rules="required|digits:10" v-slot="{ errors, classes }">
              <input type="number" v-model="editData.phone" class="form-control" :class="classes" />
              <div v-if="errors[0]" class="invalid-feedback">Enter valid mobile number of length 10</div>
            </ValidationProvider>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label>Gamer Tag</label>
            <ValidationProvider rules="required|min:4" v-slot="{ errors, classes }">
              <input
                type="text"
                v-model="editData.gamerTag"
                class="form-control"
                :class="classes"
                placeholder="noobmaster69"
              />
              <div
                v-if="errors[0]"
                class="invalid-feedback"
              >Required field with a minimum of 4 characters</div>
            </ValidationProvider>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-12">
            <label>Describe yourself</label>
            <ValidationProvider rules="required|min:10" v-slot="{ errors, classes }">
              <input
                type="text"
                v-model="editData.desc"
                class="form-control"
                :class="classes"
                placeholder="I'm a Gamer, I have lot's of lives."
              />
              <div
                v-if="!errors[0]"
                class="invalid-feedback"
              >Describe yourself with atleast 10 characters</div>
            </ValidationProvider>
          </div>
        </div>
        <div class="form-group">
          <div class="form-check">
            <ValidationProvider
              :rules="{ required: { allowFalse: false }  }"
              v-slot="{ errors, classes }"
            >
              <input
                type="checkbox"
                v-model="editData.terms"
                class="form-check-input"
                :class="classes"
              />
              <label class="form-check-label">I accept all the terms & conditions</label>
              <div
                v-if="!errors[0]"
                class="invalid-feedback"
              >Terms and conditions should be accepted</div>
            </ValidationProvider>
          </div>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="invalid">Submit</button>
      </form>
    </ValidationObserver>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";

export default {
  data: () => ({
    socialAuth: [
      { name: "Google", icon: "google", class: "google" },
      { name: "Facebook", icon: "facebook-f", class: "facebook" },
    ],
    editData: {
      name: "",
      phone: "",
      gamerTag: "",
      desc: "I'm a Gamer, I have lot's of lives.",
      terms: true,
    },
  }),
  created() {
    this.setEditData();
  },
  methods: {
    async setProfileData() {
      const editData = cloneDeep(this.editData);
      const originalData = cloneDeep(this.originalData);
      delete editData.terms;
      if (!isEqual(originalData, editData)) {
        try {
          await this.$store.dispatch("user/setProfile", editData);
          this.$swal("Success", "Successfully updated", "info");
          this.$router.push({ name: "account/profile" });
        } catch (err) {
          this.$swal("Oops", "Something wrong, try again", "error");
        }
      } else this.$swal("Oh no", "No change detected", "info");
    },
    setEditData() {
      if (this.getUser && this.getUser.info) {
        this.originalData = cloneDeep(this.getUser.info);
        const fields = ["name", "phone", "gamerTag", "desc"];
        fields.forEach((x) => {
          this.editData[x] = this.originalData[x];
        });
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

<style scoped>
.profile-edit {
  padding: 50px 100px;
}
</style>