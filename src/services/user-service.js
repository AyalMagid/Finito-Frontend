import axios from "axios";
axios.defaults.withCredentials = true;

export const userService = {
  getUsers,
  getById,
  remove,
};
function _getUrl(id = "") {
  const BASE_URL =
    process.env.NODE_ENV !== "development"
      ? "/api/user"
      : "//localhost:3030/api/user";
  return `${BASE_URL}/${id}`;
}
async function getUsers() {
  let users = await axios.get(_getUrl());
  users=users.data
  return users
}

async function getById(userId) {
  let user = await axios.get(_getUrl(userId));
  user=user.data
  return user;
}
async function remove(userId) {
    let removedUser = await axios.delete(_getUrl(userId));
    removedUser=removedUser.data
    return removedUser;
}
async function update(userId) {
    let savedUser = await axios.put(_getUrl(userId));
    savedUser=savedUser.data
    return savedUser;
}


