<template>
  <section class="account">
    <div class="info-table">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <Nav />
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Nav from "@/components/account/Nav.vue";

export default {
  components: {
    Nav,
  },
};
</script>

<style src="@/assets/css/account/account.css" scoped />