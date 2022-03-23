const baseUrl = "http://172.20.10.4:8089";

const beforeRequest = function (opt) {
  const callBack = opt.success;
  opt.url = `${baseUrl}${opt.url}`;
  opt.success = function name(res) {
    callBack(afterRequest(res));
  };
  opt.method = opt.method || "GET";
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
