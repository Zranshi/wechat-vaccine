// pages/register/register.js
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
    user.register(this.data.username, this.data.password, function (res) {
      const data = res.data;
      if (data.msg === "注册失败,输入不合法") {
        wx.showToast({
          title: "不合法的输入",
          icon: "error",
        });
      } else if (data.msg === "注册失败,用户名已存在") {
        wx.showToast({
          title: "用户已存在",
          icon: "error",
        });
      } else if (data.msg === "注册成功") {
        wx.navigateTo({
          url: "/pages/login/login",
        });
      }
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
