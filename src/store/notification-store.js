export const notificationStore = {
  state: {
    notifications: [],
  },
  getters: {
    notifications(state) {
      return state.notifications;
    },
  },
  mutations: {
    removeNotification(state, { id, index }) {
      state.notifications.splice(index, 1);
    },
    addNotification(state, notification) {
      state.notifications.unshift(notification);
    },
  },
  actions: {
    removeNotificationAction({ commit }, notification) {
      commit("removeNotification", notification);
    },
    addNotificationAction({ commit }, payload) {
      commit("addNotification", payload);
    },
  },
};
