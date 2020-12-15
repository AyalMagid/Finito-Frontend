<template>
  <section class="login-cmp">
    <nav>
      <ul class="clean-list">
        <router-link tag="li" to="/home">
          <a class="login-nav-link">Home</a>
        </router-link>
      </ul>
    </nav>
    <div class="login-header-container">
      <h1>{{ introductionText }}</h1>
    </div>
    <form @submit.prevent="authUser" class="login-form">
      <h3>{{ welcomeMessage }}</h3>
      <div class="inputs-container">
        <form-input
          v-if="!isLogin"
          labelText="email"
          v-model="email"
          :showLabel="true"
        />
        <form-input labelText="username" v-model="username" :showLabel="true" />
        <div class="input-password">
          <form-input
            :type="inputType"
            labelText="password"
            v-model="password"
            :showLabel="true"
          />
          <i @click="displayPassword" :class="passwordIcon"></i>
        </div>
        <div v-if="!isLogin" class="confirm-password-container">
          <form-input
            :type="inputType"
            labelText="Confrim Password"
            v-model="confirmPassword"
            :showLabel="true"
          />
          <i @click="displayPassword" :class="passwordIcon"></i>
        </div>
      </div>
      <h4  v-if="loginFailed" style="color:red; font-size: 12px;">Incorrect Username/ Password</h4>
      <button class="login-btn">{{ buttonText }}</button>
      <p @click="isLogin = !isLogin">{{ authMessage }}</p>
    </form>
  </section>
</template>

<script>
import formInput from "../components/FormElements/form-input.cmp";
import {
  required,
  minValue,
  minLength,
  sameAs,
  email,
} from "vuelidate/lib/validators";
export default {
  name: "login-page",

  data() {
    return {
      isLogin: true,
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      showPassword: false,
      inputType: "password",
      loginFailed:false,
    };
  },
  methods: {
    async authUser() {
      const credentials = {
        username: this.username,
        password: this.password,
      };
      if (this.isLogin) {
        let user=await this.$store.dispatch({type: "login",credentials});
        if(user) this.$router.push("/home");
        else{
          this.loginFailed=true
          setTimeout(()=>this.loginFailed=false,4000)
        }
      } else {
        //Register user
        credentials.email = this.email;
        let newUser = await this.$store.dispatch({ type: "signup",registerDetails: credentials});
        if (newUser) this.$router.push("/home");
        else throw new Error("Problem Registering");
      }
    },
    displayPassword() {
      this.showPassword = !this.showPassword;
      this.inputType === "password"
        ? (this.inputType = "text")
        : (this.inputType = "password");
    },
  },
  created() {
    if (this.$store.getters.loggedUser.username !== "Guest") {
      this.$router.push("/home");
    }
    this.isLogin = this.$route.params.isLogin;
  },
  components: {
    formInput,
  },
  computed: {
    introductionText() {
      return this.isLogin
        ? "Ready to continue owning your tasks?"
        : "Make your future more productive";
    },
    welcomeMessage() {
      return this.isLogin
        ? "Welcome back, we've missed you"
        : "Nice to meet you,welcome to Finito";
    },
    authMessage() {
      return this.isLogin ? "Not registered yet?" : "Already Have an account?";
    },
    buttonText() {
      return this.isLogin ? "Log in" : "Create an account";
    },
    passwordIcon() {
      return this.showPassword ? "far fa-eye-slash" : "far fa-eye";
    },
  },
};
</script>
