// pages/login/login.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
  },

  submit: function () {
    console.log("username:", this.data.username);
    console.log("password:", this.data.password);
    // 发送请求，验证成功则跳转至home页面，如果不成功则
    wx.switchTab({
      url: "/pages/home/home",
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
