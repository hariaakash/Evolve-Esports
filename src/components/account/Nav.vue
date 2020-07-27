<template>
  <ul class="nav nav-pills nav-fill">
    <li class="nav-item" v-for="(item, index) in items" :key="index">
      <router-link class="nav-link" :to="item.route">{{ item.name }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data: () => ({
    items: [
      { name: "Profile", route: "profile" },
      { name: "Tournaments", route: "tournaments" },
    ],
  }),
};
</script>

<style src="@/assets/css/account/nav.css" scoped />