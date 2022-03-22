// pages/setting/setting.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: "我是一个用户名",
    newUsername: "",
    usernameEditShow: false,
    phoneNum: "我是一个手机号",
    newPhoneNum: "",
    phoneNumEditShow: false,
    newPassword: "",
    passwordEditShow: false,
    age: 20,
    newAge: 0,
    ageEditShow: false,
    gender: "我是一个性别",
    newGender: "",
    genderEditShow: false,
    allergy: "我是一个过敏史，我是一个过敏史，我是一个过敏史。",
    newAllergy: "",
    adverseReaction:
      "我是一个不良反应史，我是一个不良反应史，我是一个不良反应史。",
    newAdverseReaction: "",
    userInfoEditShow: false,
  },

  showEditUsername: function () {
    this.setData({
      usernameEditShow: true,
    });
  },
  submitEditUsername: function () {
    // TODO 发送修改的数据到后端, 如果成功则更改username和newUsername
    this.setData({
      username: this.data.newUsername,
      newUsername: "",
    });
    wx.showToast({
      title: "更改成功",
      icon: "success",
    });
  },

  showEditPhone: function () {
    this.setData({
      phoneNumEditShow: true,
    });
  },
  submitEditPhone: function () {
    // TODO 发送修改的数据到后端, 如果成功则更改phone和newUsername
    if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.data.newPhoneNum)) {
      wx.showToast({
        title: "不正确的手机号",
        icon: "error",
      });
    } else {
      this.setData({
        phoneNum: this.data.newPhoneNum,
      });
      wx.showToast({
        title: "更改成功",
        icon: "success",
      });
    }
    this.setData({
      newPhoneNum: "",
    });
  },

  showEditAge: function () {
    this.setData({
      ageEditShow: true,
    });
  },
  submitEditAge: function () {
    this.setData({
      age: this.data.newAge,
    });
  },

  showEditGender: function () {
    this.setData({
      genderEditShow: true,
    });
  },
  submitEditGender: function () {
    this.setData({
      gender: this.data.newGender,
      newGender: "",
    });
  },

  showEditPassword: function () {
    this.setData({
      passwordEditShow: true,
    });
  },
  submitEditPassword: function () {
    // TODO 发送修改的数据到后端, 如果成功则更改newPassword
    console.log("新密码:", newPassword);
    wx.showToast({
      title: "更改成功",
      icon: "success",
    });
  },

  showEditUserInfo: function () {
    this.setData({
      userInfoEditShow: true,
      newAdverseReaction: this.data.adverseReaction,
      newAllergy: this.data.allergy,
    });
  },
  submitEditUserInfo: function () {
    this.setData({
      allergy: this.data.newAllergy,
      adverseReaction: this.data.newAdverseReaction,
    });
  },

  signOut: function () {
    wx.redirectTo({
      url: "/pages/login/login",
    });
  },

  logOut: function () {
    wx.redirectTo({
      url: "/pages/login/login",
      success: function () {
        // TODO向后端发送请求，注销账户
      },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // TODO 加载用户数据
  },

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
