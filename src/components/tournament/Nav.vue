<template>
  <ul class="nav nav-pills nav-fill">
    <li class="nav-item">
      <router-link
        class="nav-link"
        :to="{ name: 'tournaments/info', params: { id: $route.params.id } }"
      >Info</router-link>
    </li>
    <li class="nav-item">
      <router-link
        class="nav-link"
        :to="{ name: 'tournaments/rules', params: { id: $route.params.id } }"
      >Rules</router-link>
    </li>
  </ul>
</template>

<style src="@/assets/css/global/nav.css" scoped />