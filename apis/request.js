const baseUrl = "http://172.20.10.2:8089";

const beforeRequest = function (opt) {
  const callBack = opt.success;
  opt.success = function name(res) {
    callBack(afterRequest(res));
  };
  opt.url = `${baseUrl}${opt.url}`;
  opt.method = opt.method || "GET";
  opt.timeout = opt.timeout || 60000;
  return opt;
};

const afterRequest = function (res) {
  if (res.statusCode != 200) {
    wx.showToast({
      title: `请求错误${res.statusCode}`,
      icon: "error",
    });
    return "";
  }
  return res;
};

module.exports = function (opt) {
  wx.request(beforeRequest(opt));
};

wx.request({
  url: "url",
  method: "",
  data: "",
  header: "",
  success: function (res) {
    
  },
});
