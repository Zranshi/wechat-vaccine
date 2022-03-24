const request = require("./request");

module.exports = {
  getVaccines: function (callBack) {
    request({
      url: "/vaccine/getAll",
      method: "GET",
      success: callBack,
    });
  },
  getValidInfoById: function (vid, callBack) {
    request({
      url: "/vi/info/validInfo",
      method: "GET",
      data: {
        vid: vid,
      },
      success: callBack,
    });
  },
  reserve: function (vid, uid, callBack) {
    request({
      url: "/",
      method: "GET",
      data: {
        vid: vid,
        uid: uid,
      },
      success: callBack,
    });
  },
};
