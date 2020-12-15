import axios from "axios";
axios.defaults.withCredentials = true
 
export const authService = {
  login,
  logout,
  signup,
};
function _getUrl(id = "") {
  const BASE_URL =
    process.env.NODE_ENV !== "development"
      ? "/api/auth"
      : "//localhost:3030/api/auth";
  return `${BASE_URL}/${id}`;
}
async function signup(newCredentials) {
  let user = await axios.post(_getUrl() + `signup`, newCredentials);
  return user.data;
}

async function login(credentials) {
  let user = await axios.post(_getUrl() + `login`, credentials);
  sessionStorage.setItem("user", JSON.stringify(user.data));
  return user.data;
}
async function logout() {
  sessionStorage.removeItem("user");
  return await axios.post(_getUrl() + `logout`);
}

