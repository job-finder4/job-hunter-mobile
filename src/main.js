import App from './views/App'
import VueDevtools from 'nativescript-vue-devtools'
import store from './store'
import Home from './views/Home'
import Vue from 'nativescript-vue';
import {Fontawesome} from 'nativescript-fontawesome';
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';
import FindJobs from "./views/FindJobs";
import {apiClient} from './services/apiService';
import RadAutoComplete from 'nativescript-ui-autocomplete/vue';
import RadListView from 'nativescript-ui-listview/vue';
import CheckboxGroup from "./components/CheckboxGroup";
import {ToastPosition, Toasty} from "@triniwiz/nativescript-toasty"
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue';
import Drawer from "./views/Drawer";
import NavigationTabs from "./views/NavigationTabs";
import NavigationTabs2 from "./views/NavigationTabs2";


import routes from '~/router'
import sideDrawer from '~/components/sideDrawer'
import drawerContent from '~/components/drawerContent'

// Set up routes as a prototype to use throuhout the app.
Vue.prototype.$routes = routes


//font awesome
Fontawesome.init();
// TNSFontIcon.debug = true;
TNSFontIcon.paths = {
    // 'fa': './assets/css/all.css',
    'fa': './assets/css/font-awesome.css',
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);
Vue.use(RadSideDrawer);
Vue.registerElement("DropDown", () => require("nativescript-drop-down/drop-down").DropDown);
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

Vue.use(RadAutoComplete);
Vue.use(RadListView);
Vue.component('CheckboxGroupd', CheckboxGroup);


const popUpShowToast = function (message) {
    new Toasty({text: message})
        .setToastPosition(ToastPosition.TOP)
        .setBackgroundColor('#91e773')
        .show();
}
Vue.prototype.$showToast = popUpShowToast

if (TNS_ENV !== 'production') {
    Vue.use(VueDevtools)
}

Vue.config.silent = (TNS_ENV === 'production')


// new Vue({
//     store,
//     render: h => h('frame', [h(FindJobs)])
// }).$start()

const appSettings = require("tns-core-modules/application-settings");

// store.commit('LOGOUT')
// appSettings.clear()


Vue.prototype.$axios = apiClient

const loggedIn = store.getters.isLoggedIn;
if (loggedIn) {
    store.dispatch("initApp")
        .then(res => {
            store.dispatch('subscribeForNotifications')
        })
}


new Vue({
    store,
    render(h) {
        return h(
            sideDrawer,
            [
                h(drawerContent, {slot: 'drawerContent'}),
                // h(routes.App, { slot: 'mainContent' }),
                h(loggedIn ? routes.Home : routes.App, {slot: 'mainContent'})
            ]
        )
    }
}).$start()

// new Vue({
//     store,
//     render: h => h("frame", [h(loggedIn ? NavigationTabs : App)])
// }).$start();
