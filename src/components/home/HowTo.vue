<template>
  <section class="how-to">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <div class="section-heading">
            <h5 class="subtitle">How you can Play</h5>
            <h2 class="title">more smartly</h2>
            <p>Play competitive tournaments and win amazing cash prizes instantly! Join any of the multiple tournaments happening.</p>
          </div>
        </div>
      </div>
      <div class="row text-center">
        <div v-for="(step, index) in steps" :key="index" class="col-lg-3 col-md-6">
          <div class="single-h-play">
            <img :src="step.src" alt />
            <p class="steps">
              {{ step.step }} step
              <i class="fas fa-arrow-right"></i>
            </p>
            <h4 class="title">{{ step.title }}</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    steps: [
      {
        title: "Sign Up",
        step: "FIRST",
        src: require("@/assets/img/h-play/ic1.png"),
      },
      {
        title: "Join Games",
        step: "SECOND",
        src: require("@/assets/img/h-play/ic2.png"),
      },
      {
        title: "Earn Rewards",
        step: "THIRD",
        src: require("@/assets/img/h-play/ic3.png"),
      },
      {
        title: "Instant Withdraw",
        step: "FOURTH",
        src: require("@/assets/img/h-play/ic4.png"),
      },
    ],
  }),
};
</script>

<style scoped>
.how-to {
  padding: 110px 0px 113px;
  position: relative;
  text-transform: uppercase;
}
.how-to:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #070b28;
  z-index: -99;
}
.how-to .section-heading {
  margin-bottom: 58px;
}
.how-to img {
  margin-bottom: 25px;
}
.how-to .steps {
  font-size: 14px;
  color: #f9314b;
}
.how-to .steps i,
svg {
  margin-left: 8px;
}
</style>