import axios from "axios";
axios.defaults.withCredentials = true;

export const uploadService = {
  imageUpload,
  upload,
  fileUpload,
};
function upload(ev, type) {
  return type === "file" ? fileUpload(ev) : imageUpload(ev);
}
function fileUpload(ev){
  const FORM_DATA = new FormData();
  FORM_DATA.append("filesUploaded", ev.target.files[0]);
  return fetch("https://srv-file6.gofile.io/upload", {
    method: "POST",
    body: FORM_DATA,
  })
    .then((res) => res.json())
    .then((res) => res.data.code)
    .catch((err) => console.log("Problem Uploading File.. ", err));
}
function imageUpload(ev) {
  const UPLOAD_PRESET = "bomtf2xr";
  const CLOUD_NAME = "dwgaobhor";
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
  const FORM_DATA = new FormData();
  FORM_DATA.append("file", ev.target.files[0]);
  FORM_DATA.append("upload_preset", UPLOAD_PRESET);
  return fetch(UPLOAD_URL, {
    method: "POST",
    body: FORM_DATA,
  })
    .then((res) => res.json())
    .then((res) => res.url)
    .catch((err) => console.log("Problem Uploading Image.. ", err));
}
