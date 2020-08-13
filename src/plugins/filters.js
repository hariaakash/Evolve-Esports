import Vue from 'vue';
import moment from 'moment';

Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).utcOffset(330).format('ddd, MMM Do h:mm A');
    }
});
Vue.filter('formatDay', function (value) {
    if (value) {
        return moment(String(value)).utcOffset(330).format('ddd, MMM Do');
    }
});
Vue.filter('formatTime', function (value) {
    if (value) {
        return moment(String(value)).utcOffset(330).format('h:mm A');
    }
});
Vue.filter('fromNow', function (value) {
    if (value) {
        return moment(String(value)).utcOffset(330).fromNow();
    }
});