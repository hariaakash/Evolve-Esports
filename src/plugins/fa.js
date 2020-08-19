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
} from '@fortawesome/free-solid-svg-icons';
import {
    faDiscord, faWhatsapp, faInstagram, faGoogle,
} from '@fortawesome/free-brands-svg-icons';

const list = [
    faAngleDoubleLeft, faAngleDoubleRight,
    faArrowRight,
    faChevronRight,
    faUsers, faHome, faEdit, faTimes, faPlus, faExclamation,
    faCalendarDay, faClock,
    faGamepad, faCog, faSignInAlt,

    faDiscord, faWhatsapp, faInstagram, faGoogle,
];

library.add(...list);

dom.watch();

Vue.component('font-awesome-icon', FontAwesomeIcon);