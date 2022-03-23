// pages/login/login.js

const user = require("../../apis/user");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
  },

  submit: function () {
    // 发送请求，验证成功则跳转至home页面，如果不成功则响应登录失败
    user.login(this.data.username, this.data.password, function (res) {
      const data = res.data;
      if (data.UserId !== -1) {
        wx.setStorage({
          key: "uid",
          data: data.UserId,
        });
        if (data.msg === "管理员") {
          wx.setStorage({
            key: "permission",
            data: true,
          });
        }
        wx.switchTab({
          url: "/pages/home/home",
        });
      } else {
        wx.showToast({
          title: "登录失败",
          icon: "error",
        });
      }
    });
  },

  redirectToRegister: function () {
    wx.navigateTo({
      url: "/pages/register/register",
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
