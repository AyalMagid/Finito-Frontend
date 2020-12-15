import { authService } from "../services/auth-service.js";
import { userService } from "../services/user-service.js";

export const userStore = {
  state: {
    users: null,
    loggedUser: JSON.parse(sessionStorage.getItem("user")) || null,
    guestUser: {
      username: "Guest",
      img: "https://cdn.onlinewebfonts.com/svg/img_83486.png",
    },
    userPrefs: null,
  },
  getters: {
    users(state) {
      return state.users;
    },
    loggedUser(state) {
      return state.loggedUser ? state.loggedUser : state.guestUser;
    },
  },
  mutations: {
    setUsers(state, { users }) {
      state.users = users;
    },
    setLoggedUser(state, { user }) {
      state.loggedUser = user;
    },
  },
  actions: {
    //Authintication:
    async login({ commit }, { credentials }) {
      try{
        const loggedUser = await authService.login(credentials);
        commit({ type: "setLoggedUser", user: loggedUser });
        return loggedUser;
      }catch(err){
        console.log('Error Login..')
      return null
      }
    },
    async signup({ commit }, { registerDetails }) {
      const registeredUser = await authService.signup(registerDetails);
      commit({ type: "setLoggedUser", user: registeredUser });
      return registeredUser;
    },
    async logout({ commit }) {
      await authService.logout();
      commit({ type: "setLoggedUser", user: null });
    },
    //USERS CURD:
    async loadUsers({ commit }) {
      try {
        const users = await userService.getUsers();
        commit({ type: "setUsers", users });
        return users;
      } catch (err) {
        console.log("Problem getting Users! ");
        throw err;
      }
    },
  },
};
