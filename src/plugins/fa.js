import Vue from 'vue';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faAngleDoubleLeft, faAngleDoubleRight,
    faArrowRight,
    faChevronRight,
    faUsers, faHome,
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faFacebookF, faInstagram, faYoutube, faTwitch, faGoogle } from '@fortawesome/free-brands-svg-icons';

const list = [
    faAngleDoubleLeft, faAngleDoubleRight,
    faArrowRight,
    faChevronRight,
    faUsers, faHome,
    faWhatsapp, faFacebookF, faInstagram, faYoutube, faTwitch, faGoogle,
];

library.add(...list);

dom.watch();

Vue.component('font-awesome-icon', FontAwesomeIcon);