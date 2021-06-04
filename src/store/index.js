/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import userData from './userData'
import jobads from './jobads'
import notifications from "./notifications";
import {messaging} from "@nativescript/firebase/messaging";
import Notifications from "../views/Notifications";
import NetworkError from "~/components/Errors/NetworkError";
import {showNetworkError} from "../components/Errors/ErrorController";
import {LocalNotifications} from "nativescript-local-notifications";
import { Color } from "tns-core-modules/color";

import sideDrawer from './modules/sideDrawer'
// appSettings.hasKey("user_id")
const appSettings = require("tns-core-modules/application-settings");

Vue.use(Vuex)
Vue.use(axios)



export default new Vuex.Store({
    state: {
        accessToken: appSettings.getString('access_token') || null,
        refreshToken: appSettings.getString('refresh_token') || null,
    },
    getters: {
        isLoggedIn(state) {
            return !!state.accessToken
        },
        getAccessToken(state) {
            return state.accessToken
        }
    },
    mutations: {
        SHCEDULE_NOTIFICATION(notification){
            LocalNotifications.schedule([{
                id: 1,
                title: "this.title",
                body: "this.body",
                ticker: "this.ticker",
                at: new Date(new Date().getTime() + (100))
            }]).then(() => {
                console.log("Notification scheduled");
            }, (error) => {
                console.log("ERROR", error);
            });

            // LocalNotifications.schedule([
            //     {
            //         id: 1,
            //         title: notification.title,
            //         subtitle: "This poster is awesome!",
            //         body:
            //             "The big brown Vue app jumped over the lazy Angular app. The big brown Vue app jumped over the lazy Angular app. The big brown Vue app jumped over the lazy Angular app. The big brown Vue app jumped over the lazy Angular app.",
            //         bigTextStyle: false, // Allow more than 1 row of the 'body' text on Android, but setting this to true denies showing the 'image'
            //         color: new Color("cyan"),
            //         image: "https://images-na.ssl-images-amazon.com/images/I/61mx-VbrS0L.jpg",
            //         thumbnail:
            //             "https://2.bp.blogspot.com/-H_SZ3nAmNsI/VrJeARpbuSI/AAAAAAAABfc/szsV7_F609k/s200/emoji.jpg",
            //         forceShowWhenInForeground: true,
            //         channel: "vue-channel",
            //         ticker: "Special ticker text for Vue (Android only)",
            //         sound: "customsound-ios.wav",
            //         at: new Date(new Date().getTime() + 50), // 5 seconds from now
            //         actions: [
            //             {
            //                 id: "yes",
            //                 type: "button",
            //                 title: "Yes (and launch app)",
            //                 launch: true,
            //             },
            //             {
            //                 id: "no",
            //                 type: "button",
            //                 title: "No",
            //                 launch: false,
            //             },
            //         ],
            //     },
            // ])
            //     .then(() => {
            //         console.log("local notifciation scheduled");
            //     })
            //     .catch((error) => console.log("doSchedule error: " + error));
            },
        RETRIEVE_TOKEN(state, data) {
            // console.log("data inside retrive token mutation")
            // console.log(data)
            state.accessToken = data.access_token
            state.refreshToken = data.refresh_token
            appSettings.setString('access_token', state.accessToken)
            appSettings.setString('refresh_token', state.refreshToken)
        },
    },
    actions: {
        initApp({getters, dispatch}) {
            console.log("initiating app ....")
            if (getters.isLoggedIn) {
                console.log("retrivennn user ----")
                dispatch('retrieveUser')
            }
        },
        showErrorPage() {
            showNetworkError()
        },
        subscribeForNotifications({getters, dispatch,commit}) {

            messaging.registerForPushNotifications({
                onPushTokenReceivedCallback: (token) => {
                    console.log("Firebase plugin 1received a push token: " + token);
                },

                onMessageReceivedCallback: (message) => {
                    commit("SHCEDULE_NOTIFICATION",message)
                    console.log("Push message received: " + message);
                },
                // Whether you want this plugin to automatically display the notifications or just notify the callback. Currently used on iOS only. Default true.
                showNotifications: false,

                // Whether you want this plugin to always handle the notifications when the app is in foreground. Currently used on iOS only. Default false.
                showNotificationsWhenInForeground: false
            })
                .then(() => console.log("Registered for push"));

            console.log("getters.getUserId")
            console.log(getters.getUserId)

            messaging.subscribeToTopic("users."+getters.getUserId)
                .then(() => {
                    console.log('subscriped To users.'+getters.getUserId)
                });
        }
    },
    modules: {
        userData,
        notifications,
        jobads,
        sideDrawer
    }
})
