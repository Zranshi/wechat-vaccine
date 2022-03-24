// pages/vaccine/details/details.js
import Toast from "../../../miniprogram_npm/@vant/weapp/toast/toast";
const vaccine = require("../../../apis/vaccine");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    type: "",
    code: "",
    number: "",
    company: "",
    details: "",
    add_or_update: "add",
  },

  handleChange(e) {
    this.setData({
      vtime: e.detail.dateString,
    });
  },

  save() {
    let outer = this;

    if (this.data.type == "") {
      Toast("请输入疫苗类型");
      return;
    }

    if (this.data.code == "") {
      Toast("请输入产品编号");
      return;
    }

    if (this.data.number == "") {
      Toast("请输入批号");
      return;
    }

    if (this.data.company == "") {
      Toast("请输入生产公司");
      return;
    }

    if (this.data.details == "") {
      Toast("请输入疫苗详情");
      return;
    }

    let param = {};
    param["type"] = this.data.type;
    param["code"] = this.data.code;
    param["number"] = parseInt(this.data.number);
    param["company"] = this.data.company;
    param["details"] = this.data.details;

    if (this.data.add_or_update == "update") {
      param["id"] = this.data.id;
    }
    vaccine.vaccineAddOrUpdate(this.data.add_or_update, param, function (res) {
      Toast.success("成功");
      setTimeout(function () {
        wx.navigateTo({
          url: "../vaccine",
        });
      }, 500);
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!options.data) return;
    this.setData({
      add_or_update: "update",
    });
    let data = JSON.parse(options.data);
    this.setData({
      id: data.id,
      type: data.type,
      code: data.code,
      number: data.number,
      company: data.company,
      details: data.details,
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
