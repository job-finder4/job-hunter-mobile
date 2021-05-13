import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'
import store from './store'
import Home from './components/Home'

import { Fontawesome } from 'nativescript-fontawesome';
Fontawesome.init();


import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

// TNSFontIcon.debug = true;
TNSFontIcon.paths = {
    'fa': './assets/css/all.css',
    'mdi': './assets/css/materialdesignicons.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);
// import NSVueLifecycleHooks from 'nativescript-vue-lifecycle-hooks'

// Vue.use(NSVueLifecycleHooks)

if (TNS_ENV !== 'production') {
    Vue.use(VueDevtools)
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

const loggedIn=store.getters.isLoggedIn;


// new Vue({
//     store,
//     render: h => h('frame', [h(Home)])
// }).$start()

new Vue({
    store,
    render: h => h("frame", [h(loggedIn ? Home : App)])
}).$start();


//Eddy Implementation
// new v({
//     render: h => h("frame", [h(loggedIn ? routes.home :
//         (applicationSettingsService.getUsername() ? routes.login : routes.onboarding))])
// }).$start();
