// pages/vaccination_info/details/details.js
import Toast from "../../../miniprogram_npm/@vant/weapp/toast/toast";
const vaccine = require("../../../apis/vaccine");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    vid: "",
    place: "",
    dose: "",
    rank: "",
    type: "",
    code: "",
    number: "",
    company: "",
    details: "",
    vtime: "1999-10-24 00:00:00",
    add_or_update: "add",
  },

  handleChange(e) {
    this.setData({
      vtime: e.detail.dateString,
    });
  },

  check_vid() {
    let outer = this;
    vaccine.infoById(parseInt(outer.data.vid), function (res) {
      if (res.data.result == "success") {
        outer.setData({
          type: res.data.vaccineInfo.type,
          code: res.data.vaccineInfo.code,
          number: res.data.vaccineInfo.number,
          company: res.data.vaccineInfo.company,
          details: res.data.vaccineInfo.details,
        });
      } else {
        outer.setData({
          type: "",
          code: "",
          number: "",
          company: "",
          details: "",
        });
        Toast.fail("请核对疫苗ID");
      }
    });
  },

  save() {
    let outer = this;

    if (this.data.type == "") {
      Toast.fail("请核对疫苗ID");
      return;
    }

    if (this.data.place == "") {
      Toast.fail("请输入接种点");
      return;
    }

    if (this.data.dose == "") {
      Toast.fail("请输入剩余剂量");
      return;
    }

    if (this.data.add_or_update == "add") this.setData({ rank: 0, id: -1 });

    if (this.data.add_or_update == "update" && this.data.rank == "") {
      Toast.fail("请输入排队人数");
      return;
    }

    let param = {};
    param["place"] = this.data.place;
    param["vtime"] = this.data.vtime;
    param["dose"] = this.data.dose;
    param["rank"] = this.data.rank;
    param["vid"] = this.data.vid;
    if (this.data.add_or_update == "update") {
      param["id"] = this.data.id;
    }
    vaccine.infoAddOrUpdate(this.data.add_or_update, param, function (res) {
      Toast.success("成功");
      setTimeout(function () {
        wx.navigateTo({
          url: "../vaccination_info",
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
      vid: data.vid,
      place: data.place,
      vtime: data.vtime,
      dose: data.dose,
      rank: data.rank,
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
