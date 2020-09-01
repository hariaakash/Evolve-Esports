<template>
  <div class="row">
    <div class="col-3">
      <div class="card bg-main">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2 text-uppercase">
              <div class="font-weight-normal">Tournaments</div>
              <div class="h4 pt-4">{{ getUser.tournaments.length }}</div>
            </div>
            <div class="col-auto">
              <font-awesome-icon :icon="['fa', 'gamepad']" size="3x" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="card bg-main">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2 text-uppercase">
              <div class="font-weight-normal">Cash</div>
              <div class="h4 pt-4">{{ getUser.payment.cash.current }}</div>
            </div>
            <div class="col-auto">
              <font-awesome-icon :icon="['fa', 'wallet']" size="3x" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="card bg-main">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2 text-uppercase">
              <div class="font-weight-normal">Credit</div>
              <div class="h4 pt-4">{{ getUser.payment.credit.current }}</div>
            </div>
            <div class="col-auto">
              <font-awesome-icon :icon="['fa', 'star']" size="3x" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="card bg-danger clickable" @click="toggleModal('user/addCash')">
        <div class="card-body">
          <div class="row no-gutters align-items-center">
            <div class="col mr-2 text-uppercase">
              <div class="font-weight-normal">WALLET</div>
              <div class="h4 pt-4">Add Cash</div>
            </div>
            <div class="col-auto">
              <font-awesome-icon :icon="['fa', 'plus']" size="3x" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { helpersMixin } from "@/mixins";

export default {
  mixins: [helpersMixin],
  computed: {
    ...mapGetters({
      getUser: "user/getUser",
    }),
  },
};
</script>

<style scoped>
.bg-main {
  background: #252f5a;
}
</style>