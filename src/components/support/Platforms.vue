<template>
  <div class="platforms-list">
    <div class="container">
      <div class="row">
        <div class="col-md-4" v-for="(platform, index) in platforms" :key="index">
          <div class="single-box">
            <div class="img">
              <img :src="platform.imgSrc" alt />
            </div>
            <div class="content">
              <h4 class="title">
                <a v-if="platform.route" :to="platform.route">
                  {{ platform.name }}
                  <i class="fas fa-arrow-right"></i>
                </a>
                <a v-else-if="platform.click" @click="platform.click">
                  {{ platform.name }}
                  <i class="fas fa-arrow-right"></i>
                </a>
                <a v-else>
                  {{ platform.name }}
                  <i class="fas fa-arrow-right"></i>
                </a>
              </h4>
              <p class="text">{{ platform.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    platforms: [
      {
        name: "FAQ",
        imgSrc: require("@/assets/img/support/faq.png"),
        desc: "Find answers to general questions.",
        route: "faq",
      },
      {
        name: "Live Chat",
        imgSrc: require("@/assets/img/support/live-chat.svg"),
        desc: "Need help? We're here for you.",
      },
      {
        name: "Announcements",
        imgSrc: require("@/assets/img/support/announcements.png"),
        desc: "Lookout for our social feeds.",
      },
    ],
  }),
};
</script>

<style lang="scss" scoped>
.platforms-list {
  padding-bottom: 50px;
  background: #070b28;
}
.single-box {
  background: #1d2850;
  padding: 60px 30px 40px;
  margin: 5px 0px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-transition: all 0.3s ease-in;
  -o-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
  -webkit-transform: translateY(-80px);
  -ms-transform: translateY(-80px);
  transform: translateY(-80px);
}
.single-box .img {
  width: 60px;
  margin-right: 30px;
}
.single-box .content {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.single-box .content .title {
  font-size: 18px;
  line-height: 38px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 15px;
}
.single-box .content .title i {
  font-size: 20px;
  margin-left: 10px;
}
.single-box .content .text {
  font-size: 20px;
  line-height: 34px;
  font-weight: 300;
}
.single-box:hover {
  -webkit-transform: translateY(-90px);
  -ms-transform: translateY(-90px);
  transform: translateY(-90px);
}
</style>