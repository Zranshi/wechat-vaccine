const r = require("./request");

module.exports = {
  login: function (username, password, callBack) {
    r({
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
    r({
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
    r({
      url: "/user/info/getByUid",
      method: "GET",
        data: {
        uid: uid,
      },
      success: callBack,
    });
  },
  updata: function (data, callBack) {
    r({
      url: "/user/info/update",
      method: "GET",
      data: data,
      success: callBack,
    });
  },
};
