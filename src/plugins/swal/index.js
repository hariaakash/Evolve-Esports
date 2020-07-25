import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import "./swal.min.css";

Vue.use(VueSweetalert2, {
    position: "bottom-end",
    toast: true,
    timerProgressBar: true,
    showConfirmButton: false,
    timer: 2000,
});