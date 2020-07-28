<template>
  <section class="profile-edit">
    <form @submit.prevent="setProfileData">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Name</label>
          <input
            type="text"
            v-model="profile.name"
            class="form-control"
            :class="{ 'is-invalid': this.submitted && this.$v.profile.name.$error, 'is-valid': this.submitted && !this.$v.profile.name.$error }"
            placeholder="Noob Master"
          />
          <div v-if="!$v.profile.name.$error" class="valid-feedback">Looks good</div>
          <div
            v-if="$v.profile.name.$error"
            class="invalid-feedback"
          >Required field with a minimum of 4 characters</div>
        </div>
        <div class="form-group col-md-6">
          <label>Phone</label>
          <input
            type="number"
            v-model="profile.phone"
            class="form-control"
            :class="{ 'is-invalid': this.submitted && this.$v.profile.phone.$error, 'is-valid': this.submitted && !this.$v.profile.phone.$error }"
          />
          <div v-if="!$v.profile.phone.$error" class="valid-feedback">Looks good</div>
          <div v-if="$v.profile.phone.$error" class="invalid-feedback">Required field of 10 numbers</div>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label>Gamer Tag</label>
          <input
            type="text"
            v-model="profile.gamerTag"
            class="form-control"
            :class="{ 'is-invalid': this.submitted && this.$v.profile.gamerTag.$error, 'is-valid': this.submitted && !this.$v.profile.gamerTag.$error }"
            placeholder="noobmaster69"
          />
          <div v-if="!$v.profile.gamerTag.$error" class="valid-feedback">Looks good</div>
          <div
            v-if="$v.profile.gamerTag.$error"
            class="invalid-feedback"
          >Required field with a minimum of 4 characters</div>
        </div>
        <!-- <div class="form-group col-md-6">
          <label>PUBG MOBILE ID</label>
          <input
            type="number"
            v-model="profile.pubgmid"
            min="5"
            max="12"
            class="form-control"
            :class="{ 'is-invalid': this.submitted && this.$v.profile.pubgmid.$error, 'is-valid': this.submitted && !this.$v.profile.pubgmid.$error }"
          />
          <div v-if="!$v.profile.pubgmid.$error" class="valid-feedback">Looks good</div>
          <div
            v-if="$v.profile.pubgmid.$error"
            class="invalid-feedback"
          >Required field with a minimum of 5 and maximum of 12 numbers</div>
        </div>-->
      </div>
      <div class="form-row">
        <div class="form-group col-md-12">
          <label>Describe yourself</label>
          <input
            type="text"
            v-model="profile.desc"
            class="form-control"
            :class="{ 'is-invalid': this.submitted && this.$v.profile.desc.$error, 'is-valid': this.submitted && !this.$v.profile.desc.$error }"
            placeholder="I'm a Gamer, I have lot's of lives."
          />
        </div>
        <div v-if="!$v.profile.desc.$error" class="valid-feedback">Looks good</div>
        <div v-if="$v.profile.desc.$error" class="invalid-feedback">Required field</div>
      </div>
      <div class="form-group">
        <div class="form-check">
          <input
            type="checkbox"
            v-model="profile.terms"
            class="form-check-input"
            :class="{ 'is-invalid': this.submitted && this.$v.profile.terms.$error, 'is-valid': this.submitted && !this.$v.profile.terms.$error }"
          />
          <label class="form-check-label">I accept all the terms & conditions</label>
          <div
            v-if="$v.profile.terms.$error"
            class="invalid-feedback"
          >Terms and conditions should be accepted</div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import { required, minLength, between, sameAs } from "vuelidate/lib/validators";

export default {
  data: () => ({
    socialAuth: [
      { name: "Google", icon: "google", class: "google" },
      { name: "Facebook", icon: "facebook-f", class: "facebook" },
    ],
    profile: {
      name: "",
      phone: "",
      gamerTag: "",
      // pubgmid: "",
      desc: "I'm a Gamer, I have lot's of lives.",
      terms: true,
    },
    submitted: false,
  }),
  validations: {
    profile: {
      name: { required, minLength: minLength(4) },
      phone: { required, between: between(6000000000, 9999999999) },
      gamerTag: { required, minLength: minLength(4) },
      // pubgmid: {
      //   required,
      //   pubgIdLenCheck: (x) => {
      //     const len = x.toString().length;
      //     return len >= 5 && len <= 12;
      //   },
      // },
      desc: { required },
      terms: { sameAs: sameAs(() => true) },
    },
  },
  created() {
    this.setEditData();
  },
  methods: {
    async setProfileData() {
      this.submitted = true;
      this.$v.profile.$touch();

      if (this.$v.profile.$error) {
        this.$swal("Oops.", "Validation failed", "error");
      } else {
        try {
          await this.$store.dispatch("user/setProfile", {
            name: this.profile.name,
            phone: this.profile.phone,
            gamerTag: this.profile.gamerTag,
            // pubgmid: this.profile.pubgmid,
            desc: this.profile.desc,
          });
          this.$swal("Success", "Successfully updated", "info");
          this.$router.push({ name: "profile" });
        } catch (err) {
          this.$swal("Oops", "Something wrong, try again", "error");
        }
      }
    },
    setEditData() {
      if (this.getProfile) {
        const { details } = this.getProfile;
        this.profile.name = details.name;
        this.profile.phone = details.phone;
        this.profile.gamerTag = details.gamerTag;
        this.profile.desc = details.desc;
      }
    },
  },
  computed: {
    ...mapGetters({
      getProfile: "user/getProfile",
    }),
  },
};
</script>

<style scoped>
.profile-edit {
  padding: 50px 100px;
}
</style>