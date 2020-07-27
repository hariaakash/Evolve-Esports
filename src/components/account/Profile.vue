<template>
  <section class="profile-info">
    <div class="row">
      <div class="col-4">
        <div class="card bg-main">
          <div class="card-body text-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7pmT3lMtcAaI0HyFel0IYCH9KnZnmU0ivlsl96QdtFVhq8FvB"
            />
            <h5 class="card-title text-white pt-4">Name: Hari</h5>
            <h6 class="card-subtitle text-white pt-2">Gamer Tag: Hari</h6>
            <p class="card-text text-white text-justify pt-3">I'm a Gamer, I have lot's of lives.</p>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="card">
          <div class="card-body text-center">
            <h5 class="card-title text-dark">Social Accounts</h5>
            <button
              v-for="(button, index) in socialAuth"
              :key="index"
              class="btn btn-lg btn-block btn-social mb-3"
              :class="button.class"
              @click="auth(button.name)"
            >
              <font-awesome-icon
                :icon="['fab', button.icon]"
                class="mr-2"
                size="lg"
                style="color: #FFF;"
              />
              {{ "Link with " + button.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    socialAuth: [
      { name: "Google", icon: "google", class: "google" },
      { name: "Facebook", icon: "facebook-f", class: "facebook" },
    ],
    name: "Hari",
    tag: "Hari",
  }),
};
</script>

<style src="@/assets/css/account/profile.css" scoped />