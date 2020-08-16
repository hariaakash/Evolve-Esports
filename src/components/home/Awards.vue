<template>
  <section class="awards-area">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <div class="section-heading">
            <h5 class="subtitle">Get Recognized</h5>
            <h5 class="title">Awards</h5>
          </div>
        </div>
      </div>
      <div class="row">
        <div v-for="(award, index) in awards" :key="index" class="col-lg-4 col-md-6">
          <div class="single-awards">
            <div class="content">
              <img :src="award.imgSrc" alt />
              <h4 class="title">{{ award.title }}</h4>
              <p>
                <i class="fas fa-users"></i>0
              </p>
              <!-- <a class="mybtn2">Read More</a> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    awards: [
      { title: "Luck Power", imgSrc: require("@/assets/img/awards/ic1.png") },
      { title: "Zero Hunter", imgSrc: require("@/assets/img/awards/ic2.png") },
      { title: "Gold", imgSrc: require("@/assets/img/awards/ic3.png") },
      { title: "King", imgSrc: require("@/assets/img/awards/ic4.png") },
      { title: "Money Bag", imgSrc: require("@/assets/img/awards/ic5.png") },
      { title: "Top", imgSrc: require("@/assets/img/awards/ic6.png") },
    ],
  }),
};
</script>

<style src="@/assets/css/home/awards.css" scoped />
