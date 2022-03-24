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
      url: "/user/info/getByUid",
      method: "GET",
      data: {
        uid: uid,
      },
      success: callBack,
    });
  },
  updata: function (data, callBack) {
    request({
      url: "/user/info/update",
      method: "GET",
      data: data,
      success: callBack,
    });
  },
};
