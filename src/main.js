import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'
import store from './store'
import Home from './components/Home'
import Vue from 'nativescript-vue';
import {Fontawesome} from 'nativescript-fontawesome';
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
import FindJobs from "./components/FindJobs";

import RadAutoComplete from 'nativescript-ui-autocomplete/vue';
Vue.use(RadAutoComplete);


Vue.registerElement(
    'CheckBox',
    () => require('@nstudio/nativescript-checkbox').CheckBox,
    {
        model: {
            prop: 'checked',
            event: 'checkedChange'
        }
    }
);

import CheckboxGroup from "./components/CheckboxGroup";
Vue.component('CheckboxGroupd',CheckboxGroup);

Fontawesome.init();

// TNSFontIcon.debug = true;
TNSFontIcon.paths = {
    // 'fa': './assets/css/all.css',
    'fa': './assets/css/font-awesome.css',
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

// Vue.registerElement('FilterSelect', () => FilterSelect);

if (TNS_ENV !== 'production') {
    Vue.use(VueDevtools)
}

Vue.config.silent = (TNS_ENV === 'production')


// new Vue({
//     store,
//     render: h => h('frame', [h(FindJobs)])
// }).$start()

const loggedIn = store.getters.isLoggedIn;
if (loggedIn) {
    store.dispatch("initApp")
}

new Vue({
    store,
    render: h => h("frame", [h(loggedIn ? Home : App)])
}).$start();
