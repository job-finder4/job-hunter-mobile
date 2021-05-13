/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import user from './user'
import notifications from "./notifications";
import {messaging} from "@nativescript/firebase/messaging";

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
        RETRIEVE_TOKEN(state, data) {
            state.accessToken = data.access_token
            state.refreshToken = data.refresh_token
            appSettings.setString('access_token', state.accessToken)
            appSettings.setString('refresh_token', state.refreshToken)
        },
    },
    actions: {
        initApp({getters, dispatch}) {
            if (getters.isLoggedIn) {
                dispatch('retrieveUser')
            }
        },
        subscribeForNotifications() {
            messaging.registerForPushNotifications({
                onPushTokenReceivedCallback: (token) => {
                    console.log("Firebase plugin received a push token: " + token);
                },

                onMessageReceivedCallback: (message) => {
                    this.scheduleNotification(message)
                    console.log("Push message received: " + message);
                },

                // Whether you want this plugin to automatically display the notifications or just notify the callback. Currently used on iOS only. Default true.
                showNotifications: true,

                // Whether you want this plugin to always handle the notifications when the app is in foreground. Currently used on iOS only. Default false.
                showNotificationsWhenInForeground: true
            }).then(() => console.log("Registered for push"));

            messaging.subscribeToTopic("news").then(() => {
                console.log('subscriped To news Topic')
            });
        }
    },
    modules: {
        user,
        notifications
    }
})
