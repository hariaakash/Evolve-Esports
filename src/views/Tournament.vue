<template>
  <section class="tournament">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <Nav />
          <List />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Nav from "@/components/tournaments/Nav.vue";
import List from "@/components/tournaments/List.vue";

export default {
  name: "Home",
  components: { Nav, List },
};
</script>

<style scoped>
.tournament {
  background: #070b28;
}
</style>