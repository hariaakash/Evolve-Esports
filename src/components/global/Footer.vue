<template>
  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="subscribe-box">
            <form action="#">
              <div class="row">
                <div class="col-lg-12">
                  <div class="heading-area">
                    <h5 class="sub-title">Join our social channel</h5>
                    <h4 class="title">To Get Exclusive Updates</h4>
                  </div>
                </div>
                <div class="col-12 text-center">
                  <ul class="list-inline">
                    <li v-for="(item, index) in socialList" :key="index" class="list-inline-item">
                      <font-awesome-icon :icon="['fab', item.icon]" size="2x" />
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="copy-bg">
      <div class="container">
        <div class="row">
          <div class="col-lg-5">
            <div class="left-area">
              <p>Copyright © {{ this.year }} Evolve Esports</p>
            </div>
          </div>
          <div class="col-lg-7">
            <ul class="copright-area-links">
              <li>
                <a href="#">Terms Of Use</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({
    year: new Date().getFullYear(),
    socialList: [
      { icon: "whatsapp" },
      { icon: "instagram" },
      { icon: "facebook-f" },
      { icon: "youtube" },
      { icon: "twitch" },
    ],
  }),
};
</script>

<style src="@/assets/css/footer.css" />