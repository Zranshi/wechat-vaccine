// pages/setting/setting.js
const user = require("../../apis/user");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    uid: 0,
    username: "",
    newUsername: "",
    usernameEditShow: false,
    phoneNum: "",
    newPhoneNum: "",
    phoneNumEditShow: false,
    newPassword: "",
    passwordEditShow: false,
    age: "",
    newAge: "",
    ageEditShow: false,
    gender: "",
    newGender: "",
    genderEditShow: false,
    allergy: "",
    newAllergy: "",
    adverseReaction: "",
    newAdverseReaction: "",
    userInfoEditShow: false,
  },

  showEditUsername: function () {
    this.setData({
      usernameEditShow: true,
    });
  },
  submitEditUsername: function () {
    const that = this;
    user.updata(
      { uid: that.data.uid, username: that.data.newUsername },
      function (res) {
        that.setData({
          username: that.data.newUsername,
          newUsername: "",
        });
        wx.showToast({
          title: "更改成功",
          icon: "success",
        });
      }
    );
  },

  showEditPhone: function () {
    this.setData({
      phoneNumEditShow: true,
    });
  },
  submitEditPhone: function () {
    const that = this;
    if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(that.data.newPhoneNum)) {
      wx.showToast({
        title: "不正确的手机号",
        icon: "error",
      });
    } else {
      user.updata(
        { uid: that.data.uid, phone: that.data.newPhoneNum },
        function (res) {
          wx.showToast({
            title: "更改成功",
            icon: "success",
          });
        }
      );
      that.setData({
        phoneNum: that.data.newPhoneNum,
        newPhoneNum: "",
      });
    }
  },

  showEditAge: function () {
    this.setData({
      ageEditShow: true,
    });
  },
  submitEditAge: function () {
    const that = this;
    user.updata(
      { uid: that.data.uid, age: Number(that.data.newAge) },
      function (res) {
        wx.showToast({
          title: "更改成功",
          icon: "success",
        });
      }
    );
    that.setData({
      age: that.data.newAge,
      newAge: 0,
    });
  },

  showEditGender: function () {
    this.setData({
      genderEditShow: true,
    });
  },
  submitEditGender: function () {
    const that = this;
    user.updata(
      { uid: that.data.uid, gender: that.data.newGender },
      function (res) {
        wx.showToast({
          title: "更改成功",
          icon: "success",
        });
      }
    );
    that.setData({
      gender: that.data.newGender,
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
      newAllergy: this.data.allergy,
      newAdverseReaction: this.data.newAdverseReaction,
    });
  },
  submitEditUserInfo: function () {
    const that = this;
    user.updata(
      {
        uid: that.data.uid,
        allergy: that.data.newAllergy,
        adverseReaction: that.data.newAdverseReaction,
      },
      function (res) {
        that.setData({
          allergy: that.data.newAllergy,
          adverseReaction: that.data.newAdverseReaction,
        });
        wx.showToast({
          title: "更改成功",
          icon: "success",
        });
      }
    );
  },

  signOut: function () {
    wx.clearStorage();
    wx.redirectTo({
      url: "/pages/login/login",
    });
  },

  logOut: function () {
    wx.clearStorage();
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
    const that = this;
    wx.getStorage({
      key: "uid",
      success: function (res) {
        const uid = res.data;
        user.userInfo(uid, function (res) {
          const data = res.data;
          // this.data.username = data.username;
          that.setData({
            uid: uid,
            username: data.username,
            phoneNum: data.us.phone,
            gender: data.us.gender,
            age: data.us.age,
            allergy: data.us.allergy,
            adverseReaction: data.us.adverseReaction,
          });
        });
      },
    });
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
