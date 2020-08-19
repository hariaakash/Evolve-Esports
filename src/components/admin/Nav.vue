<template>
  <ul class="nav nav-pills nav-fill">
    <li class="nav-item" v-for="(item, index) in getNav" :key="index">
      <router-link class="nav-link" :to="item.route">{{ item.name }}</router-link>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    items: [
      { name: "Tournaments", route: { name: "admin/tournaments" } },
      { name: "Users", route: { name: "admin/users" } },
    ],
  }),
  computed: {
    getNav() {
      if (this.$route.params.id) {
        const items = [];
        items.push({
          name: "Matches",
          route: {
            name: "admin/tournaments/matches",
            params: this.$route.params,
          },
        });
        items.push({
          name: "Teams",
          route: {
            name: "admin/tournaments/teams",
            params: this.$route.params,
          },
        });
        return items;
      }

      return this.items;
    },
  },
};
</script>

<style src="@/assets/css/global/nav.css" scoped />