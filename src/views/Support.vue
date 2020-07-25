<template>
  <div>
    <Question />
    <Platforms />
  </div>
</template>

<script>
import Question from "@/components/support/Question.vue";
import Platforms from "@/components/support/Platforms.vue";

export default {
  name: "Home",
  components: {
    Question,
    Platforms,
  },
};
</script>
