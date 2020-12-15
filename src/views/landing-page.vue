<template>
  <div class="landing-page">
    <nav class="navbar-container">
      <span class="logo">Finito</span>
      <ul class="navbar">
        <router-link to="/auth" tag="li">
          <a>Login</a>
        </router-link>
        <router-link to="/auth" tag="li">
          <a>Sign Up</a>
        </router-link>
        <router-link to="/about" tag="li">
          <a>About</a>
        </router-link>
      </ul>
    </nav>
    <section class="hero-container">
      <div class="hero-content-container">
        <div class="hero-content">
          <h1>
            Managing tasks has never been easier
            <div class="line"></div>
          </h1>
          <h3>Take your Task organizing skills far beyond</h3>
          <p>
            Finito offers a cutting edge managment system which make working in
            large teams a breaze and takes you further than before
          </p>
          <router-link tag="button" to="/home" class="cta-btn">Go aboard!</router-link>
        </div>
        <div class="hero-img">
          <img src="../assets/images/hero.svg" alt />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import AddTask from "../components/add-task.cmp";
import TaskLabel from "../components/taskLabel/taks-label.cmp";
import taskDuedate from "../components/task-duedate.cmp";
import TaskCheckList from "../components/task-checklist.cmp";
import TaskMembers from "../components/task-members.cmp";
export default {
  name: "Landing-page",
  components: {
    AddTask,
    TaskLabel,
    taskDuedate,
    TaskCheckList,
    TaskMembers,
  },
};
</script>
