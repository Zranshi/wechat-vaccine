const r = require("./request");

module.exports = {
  getVaccines: function (callBack) {
    r({
      url: "/vaccine/getAll",
      method: "GET",
      success: callBack,
    });
  },
  getValidInfoById: function (vid, callBack) {
    r({
      url: "/vi/info/validInfo",
      method: "GET",
      data: {
        vid: vid,
      },
      success: callBack,
    });
  },
  reserve: function (vid, uid, viid, callBack) {
    r({
      url: "/", // TODO 不知道接口url
      method: "GET",
      data: {
        vid: vid,
        uid: uid,
        viid: viid,
      },
      success: callBack,
    });
  },
  remove: function (id, callBack) {
    r({
      url: "/vaccine/remove",
      data: {
        id: id,
      },
      success: callBack,
    });
  },
  addOrUpdate: function (addOrUpdate, param, callBack) {
    r({
      url: `/vaccine/${addOrUpdate}`,
      data: param,
      success: callBack,
    });
  },
  infoDelete: function (id, callBack) {
    r({
      url: "/vi/info/delete",
      data: {
        id: id,
      },
      success: callBack,
    });
  },
  infoGetAll: function (callBack) {
    r({
      url: "/vi/info/getAll",
      method: "GET",
      success: callBack,
    });
  },
  infoById: function (id, callBack) {
    r({
      url: "/vaccine/getInfo",
      data: {
        id: id,
      },
      success: callBack,
    });
  },
  infoAddOrUpdate: function (addOrUpdate, param, callBack) {
    r({
      url: `/vi/info/${addOrUpdate}`,
      data: param,
      success: callBack,
    });
  },
  detailDelete: function (id, callBack) {
    r({
      url: "/vn/details/delete",
      data: {
        id: id,
      },
      success: callBack,
    });
  },
  detailGetAll: function (callBack) {
    r({
      url: "/vn/details/getAll",
      success: callBack,
    });
  },
  infoFind: function (id, callBack) {
    r({
      url: "/vi/info/find",
      data: {
        id: id,
      },
      success: callBack,
    });
  },
  detailAddOrUpdate: function (addOrUpdate, param, callBack) {
    r({
      url: `/vn/details/${addOrUpdate}`,
      data: param,
      success: callBack,
    });
  },
};
