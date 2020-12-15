<template>
  <div class="task-activities-list">
    <ul>
      <li v-for="(activity, idx) in activities" :key="idx">
        <div style="margin:5px 0;" class="flex align-center details-activity-avatar-text-wraper">
          <div class="avatar-container">
            <avatar
              :size="35"
              v-if="activity.byUser.img"
              :src="activity.byUser.img"
              :username="activity.byUser.username"
            />
          </div>

          <section class="details-activity-text flex col">
            <div class="details-activity-user flex">
              <p>
                <span class="details-activity-username">
                  {{
                  activity.byUser.username
                  }}
                </span>
                {{ activity.txt }}
              </p>
            </div>
            <span>{{ activity.createdAt | relativeTime }}</span>
          </section>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Avatar from "vue-avatar";
export default {
  components: {
    Avatar,
  },
  props: ["activities"],
};
</script>

<style lang="scss" scoped>
ul {
  text-align: left;
  font-size: 0.9rem;
  padding-left: 0;
  font-size: 12px;
  max-height: 280px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
@media only screen and(max-width:500px) {
  ul {
    max-height: 250px;
  }
}
.details-activity-text {
  margin-left: 0.7rem;
  justify-content: center;
  .details-activity-user {
    .details-activity-username {
      font-weight: bold;
      font-size: 14px;
      color: #172b4d;
      margin-right: 5px;
    }
    align-items: center;
  }
  .details-activity-user {
    margin: 0;
    font-family: Montserrat;
    margin-right: 5px;
    p {
      margin: 0;
      color: #172b4d;
      font-size: 14px;
      span {
        font-size: 16px;
        font-family: Montserrat-Bold;
        font-weight: bold;
      }
    }
  }
  span {
    font-size: 13px;
    color: #172b4d;
  }
}
</style>
