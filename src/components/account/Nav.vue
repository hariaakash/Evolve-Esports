<template>
  <ul class="nav nav-pills nav-fill">
    <li class="nav-item" v-for="(item, index) in items" :key="index">
      <router-link
        class="nav-link"
        v-if="profileSet || item.route == 'account/edit'"
        :to="{ name: item.route }"
      >{{ item.name }}</router-link>
      <a class="nav-link" v-else @click="setProfileMsg">{{ item.name }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    profileSet: { type: Boolean, required: true },
  },
  data: () => ({
    items: [
      { name: "Profile", route: "account/profile" },
      { name: "Edit", route: "account/edit" },
      // { name: "Tournaments", route: "account/tournaments" },
    ],
  }),
  methods: {
    setProfileMsg() {
      this.$swal("Oops..", "Set your profile information to continue", "info");
    },
  },
};
</script>

<style src="@/assets/css/global/nav.css" scoped />