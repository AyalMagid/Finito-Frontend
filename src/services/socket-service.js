import io from "socket.io-client";
const BASE_URL =
  process.env.NODE_ENV === "production" ? "/" : "//localhost:3030";
var socket;

export default {
  setup,
  terminate,
  on,
  off,
  emit,
};

function setup() {
  //  here we set the connection between socket io and the server
  socket = io(BASE_URL);
}

function terminate() {
  socket = null;
}

function on(eventName, cb) {
  socket.on(eventName, cb);
}

function off(eventName, cb) {
  socket.off(eventName, cb);
}

function emit(eventName, data) {
  socket.emit(eventName, data);
}
