<template>
  <ul class="nav nav-pills nav-fill">
    <li class="nav-item" v-for="(item, index) in items" :key="index">
      <router-link
        class="nav-link"
        :to="{ name: item.route, params: { id: $route.params.id } }"
      >{{ item.title }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "Info", route: "tournaments/info" },
      { title: "Rules", route: "tournaments/rules" },
      { title: "Leaderboard", route: "tournaments/leaderboard" },
    ],
  }),
};
</script>

<style src="@/assets/css/global/nav.css" scoped />