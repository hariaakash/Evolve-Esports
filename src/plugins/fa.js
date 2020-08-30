import Vue from 'vue';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faAngleDoubleLeft, faAngleDoubleRight,
    faArrowRight,
    faChevronRight,
    faUsers, faHome, faEdit, faTimes, faPlus, faExclamation,
    faCalendarDay, faClock,
    faGamepad, faCog, faSignInAlt,
    faWallet, faStar,
} from '@fortawesome/free-solid-svg-icons';
import {
    faDiscord, faWhatsapp, faInstagram,
    faFacebookF, faGoogle, faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const list = [
    faAngleDoubleLeft, faAngleDoubleRight,
    faArrowRight,
    faChevronRight,
    faUsers, faHome, faEdit, faTimes, faPlus, faExclamation,
    faCalendarDay, faClock,
    faGamepad, faCog, faSignInAlt,
    faWallet, faStar,

    faDiscord, faWhatsapp, faInstagram,
    faFacebookF, faGoogle, faYoutube,
];

library.add(...list);

dom.watch();

Vue.component('font-awesome-icon', FontAwesomeIcon);