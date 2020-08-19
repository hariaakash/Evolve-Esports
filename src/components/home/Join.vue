<template>
  <section class="join">
    <div class="container">
      <div class="row">
        <div class="col-md-5 order-md-last text-md-right text-center">
          <img class="img-fluid" src="@/assets/img/extras/join.png" />
        </div>
        <div class="col-md-7 order-md-first pt-5">
          <div class="section-heading text-md-left text-sm-center">
            <h5 class="subtitle">Everyday lots of winners</h5>
            <h2 class="title">be one of them</h2>
            <p class="text">Get started in less than 5 min.</p>
            <router-link :to="{ name: 'tournaments' }" class="mybtn1">Play Now!</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style  lang="scss" scoped>
.join {
  padding: 80px 0px 80px;
  background: #0b122e;
}
</style>