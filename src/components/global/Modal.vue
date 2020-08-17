<template>
  <div v-if="showModal">
    <div class="modal-backdrop fade show"></div>
    <div class="modal show" tabindex="-1" role="dialog" style="display: block;padding-right: 15px;">
      <div class="modal-dialog modal-dialog-scrollable" :class="size" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <slot name="header">
              <h5 class="modal-title">Modal title</h5>
            </slot>
            <button type="button" class="close" @click="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot name="body">
              <p>Modal body text goes here.</p>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button type="button" class="btn btn-primary">Save changes</button>
            </slot>
            <button type="button" class="btn btn-secondary" @click="close">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    id: { type: String, required: true },
    size: { type: String },
  },
  created() {
    this.$store.commit("ui/SET_MODAL", this.id);
  },
  methods: {
    close() {
      this.$store.commit("ui/TOGGLE_MODAL", this.id);
    },
  },
  computed: {
    ...mapGetters({
      getModalById: "ui/modalById",
    }),
    showModal() {
      return this.getModalById(this.id).status;
    },
  },
};
</script>

<style src="@/assets/css/global/modal.css" scoped />