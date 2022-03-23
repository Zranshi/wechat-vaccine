// import r from "./request";
const request = require("./request");

module.exports = {
  login: function (username, password, callBack) {
    request({
      url: "/user/login",
      method: "GET",
      data: {
        username: username,
        password: password,
      },
      success: callBack,
    });
  },
  register: function (username, password, callBack) {
    request({
      url: "/user/register",
      method: "GET",
      data: {
        username: username,
        password: password,
      },
      success: callBack,
    });
  },
  userInfo: function (uid, callBack) {
    request({
      url: "/user/userinfo",
      method: "GET",
      data: {
        id: uid,
      },
      success: callBack,
    });
  },
  editUsername: function (username, callBack) {
    request({
      url: "/user/edit_username",
      method: "PUT",
      data: {
        username: username,
      },
      success: callBack,
    });
  },
  editPhone: function (phone, callBack) {
    request({
      url: "/user/edit_phone",
      method: "PUT",
      data: {
        phone: phone,
      },
      success: callBack,
    });
  },
  editPassword: function (password, callBack) {
    request({
      url: "/user/edit_password",
      method: "PUT",
      data: {
        password: password,
      },
      success: callBack,
    });
  },
};
