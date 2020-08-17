<template>
  <section class="next-match-section">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="timer-box">
            <h1 class="text-center">Next match starts in</h1>
            <hr />
            <Timer :endTime="time" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Timer from "@/components/global/Timer";

export default {
  data: () => ({
    time: parseInt((new Date("01-01-2022").getTime() / 1000).toFixed(0)),
  }),
  components: { Timer },
};
</script>

<style  lang="scss" scoped>
.next-match-section {
  background: #070b28;
  margin-top: -164px;
  overflow: hidden;
}
.next-match-section .timer-box {
  position: relative;
  padding: 50px 30px 60px;
  background: -webkit-gradient(
    linear,
    right top,
    left top,
    from(#3b1f75),
    to(#4f64de)
  );
  background: -webkit-linear-gradient(right, #3b1f75, #4f64de);
  background: -o-linear-gradient(right, #3b1f75, #4f64de);
  background: linear-gradient(to left, #3b1f75, #4f64de);
}
</style>