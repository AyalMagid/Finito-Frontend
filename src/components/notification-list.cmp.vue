<template>
  <div class="notifications-container">
    <h1>Board Notifications</h1>
    <ul class="clean-list">
      <li
        class="notification-container"
        :key="notification.id"
        v-for="(notification, index) in notifications"
      >
        <div class="notification-content-container">
          <div class="notificaiton-content">
            <h4>{{ notification.sender }}</h4>
            <p>{{ notification.content }}</p>
          </div>
          <div class="notification-img-container">
            <img src="@/assets/images/notification-avatar.svg" alt class="notification-img" />
            <span class="top"></span>
            <span class="bottom"></span>
          </div>
        </div>
        <i @click="removeNotification(notification.id, index)" class="el-icon-close"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import socketService from "../services/socket-service";

export default {
  created() {
    socketService.on("boardAction", (notification) => {
      //   if (notification.sender === "tomer") return;
      this.notifications.push(notification);
      console.log(notification);
    });
  },
  data() {
    return {};
  },
  computed: {
    notifications() {
      return this.$store.getters.notifications;
    },
  },
  methods: {
    removeNotification(id, index) {
      this.$store.dispatch({ type: "removeNotificationAction", id, index });
    },
  },
};
</script>

<style lang="scss" scoped>
.notifications-container {
  top: 40px;
  position: absolute;
  z-index: 5000;
  height: 400px;
  background-color: #282828;
  border-radius: 3px;
  width: 300px;
  overflow-y: auto;
  right: 0px;
  h1 {
    padding: 10px 20px;
    color: #fff;
    text-align: left;
    font-family: Montserrat-Bold;
  }
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .notification-container {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    color: #fff;
    border-radius: 3px;
    margin: 5px;
    font-size: 14px;
    padding: 0 10px;
    i {
      position: absolute;
      cursor: pointer;
      top: 4px;
      right: 4px;
    }
    .notification-content-container {
      align-items: center;
      min-width: 100%;
      display: flex;
      padding: 10px 5px;
      text-align: left;

      h4 {
        font-family: Montserrat-Bold;
      }
      p {
        margin: 0;
        margin-right: 10px;
      }
      .notification-img-container {
        width: 50px;
        margin-left: auto;
        display: flex;
        align-items: center;
        position: relative;
        border-radius: 100%;

        .notification-img {
          width: 100%;
          border-radius: 100%;
          border: #fff solid 2px;
        }
      }
    }
  }
}
</style>
