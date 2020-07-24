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
        <div class="col-lg-3 col-md-6">
          <div class="single-h-play">
            <img src="@/assets/img/h-play/ic1.png" alt />
            <p class="steps">
              First step
              <i class="fas fa-arrow-right"></i>
            </p>
            <h4 class="title">SIGN UP</h4>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="single-h-play">
            <img src="@/assets/img/h-play/ic2.png" alt />
            <p class="steps">
              SECOND STEP
              <i class="fas fa-arrow-right"></i>
            </p>
            <h4 class="title">Join GAMES</h4>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="single-h-play">
            <img src="@/assets/img/h-play/ic3.png" alt />
            <p class="steps">
              THIRD STEP
              <i class="fas fa-arrow-right"></i>
            </p>
            <h4 class="title">Earn REWARDS</h4>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="single-h-play">
            <img src="@/assets/img/h-play/ic4.png" alt />
            <p class="steps">
              fourth STEP
              <i class="fas fa-arrow-right"></i>
            </p>
            <h4 class="title">INSTANT WITHDRAW</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

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
</style>