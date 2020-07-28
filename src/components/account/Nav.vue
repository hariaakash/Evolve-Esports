<template>
  <ul class="nav nav-pills nav-fill">
    <li class="nav-item" v-for="(item, index) in items" :key="index">
      <router-link
        class="nav-link"
        v-if="profileSet || item.route == 'edit'"
        :to="item.route"
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
      { name: "Profile", route: "profile" },
      { name: "edit", route: "edit" },
      { name: "Tournaments", route: "tournaments" },
    ],
  }),
  methods: {
    setProfileMsg() {
      this.$swal("Oops..", "Set your profile information to continue", "info");
    },
  },
};
</script>

<style src="@/assets/css/account/nav.css" scoped />