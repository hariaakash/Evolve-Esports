<template>
  <section class="question">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <img src="@/assets/img/support/question-left.png" alt />
        </div>
        <div class="col-lg-6">
          <div class="section-heading">
            <h5 class="subtitle">If you have any</h5>
            <h2 class="title">questions</h2>
            <p
              class="text"
            >Providing a seamless platform for your gaming experience is our top priority.</p>
            <p class="text">
              When you're ready to play, registering an
              account is required so we know you're of legal age and so no one else can use your account. We answer the most commonly asked lotto
              questions,..
            </p>
            <router-link to="faq" class="mybtn1">Check FAQs</router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.question {
  background-color: #0b122e;
  padding: 50px 0px 150px;
}
.section-heading {
  text-align: left;
}
.title {
  margin-bottom: 30px;
}
.mybtn1 {
  margin-top: 22px;
}
</style>