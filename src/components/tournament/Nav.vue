<template>
  <ul class="nav nav-pills nav-fill pt-0">
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
      { title: "Leaderboard", route: "tournaments/leaderboard" },
      { title: "Rules", route: "tournaments/rules" },
    ],
  }),
};
</script>

<style src="@/assets/css/global/nav.css" scoped />