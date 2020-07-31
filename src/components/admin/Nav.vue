<template>
  <ul class="nav nav-pills nav-fill">
    <li class="nav-item" v-for="(item, index) in items" :key="index">
      <router-link class="nav-link" :to="{ name: item.route }">{{ item.name }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data: () => ({
    items: [
      { name: "Tournaments", route: "admin/tournaments" },
      { name: "Users", route: "admin/users" },
    ],
  }),
};
</script>

<style src="@/assets/css/global/nav.css" scoped />