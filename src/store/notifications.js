import {apiClient} from "../services/apiService";

export default {
    state: {
        notifications: []
    },
    getters: {
        notifications(state) {
            return state.notifications
        },
        getUnreadedNotifications(state) {
            return state.notifications.filter(item => item.read_at == null);
        }
    },
    mutations: {
        RETRIEVE_NOTIFICATIONS(state, notifications) {
            state.notifications = notifications
        },
        MARK_NOTIFICATION_AS_READ(state, notificationId) {
            state.notifications.find(item => item.id === notificationId).read_at = new Date()
        },
        CLEAR_NOTIFICATION(state){
            state.notifications=[]
        },
        ADD_NOTIFICATION(state, notification) {
            state.notifications.unshift(notification)
        }
    },
    actions: {
         retrieveNotification({commit}) {
            apiClient.get('notifications').then((res) => {
                commit('RETRIEVE_NOTIFICATIONS', res.data)
            })
        },
        async markNotificationAsRead({commit}, {notificationId}) {
            apiClient.put(`notifications/${notificationId}`, {
                notification_id: notificationId
            })
            commit('MARK_NOTIFICATION_AS_READ', notificationId)
        },
    },
}
