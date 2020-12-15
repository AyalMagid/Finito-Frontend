<template>
  <div class="signup-cmp">
    <form @submit.prevent="registerUser" class="signup-form flex col">
      <h1>Sign Up</h1>
    <input type="text" placeholder="Email" v-model="registerDetails.email" required>
    <input  type="text" placeholder="Username" v-model="registerDetails.username" required>
    <input  type="password" placeholder="Password" v-model="registerDetails.password" required>
    <button class="signup-btn" >Register</button>
    </form>
  </div>
</template>

<script>

  export default {
    name:"signup-cmp",
    data () {
      return {
        registerDetails: {
          username:'',
          password:'',
          email:'',
        }
      }
    },
  methods:{
    registerUser(){
      this.$store.dispatch({type:"signup",registerDetails:{...this.registerDetails}})
      this.$router.push('/')
    }
  },
  }
</script>
