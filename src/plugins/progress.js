import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';

const options = {
    color: '#f9314b',
    thickness: '5px',
    autoFinish: false,
};

Vue.use(VueProgressBar, options);