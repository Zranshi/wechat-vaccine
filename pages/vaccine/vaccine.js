// pages/vaccine/vaccine.js
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
const vaccine = require("../../apis/vaccine");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    vaccine: [],
  },

  vaccine_details: function (e) {
    let data = e.currentTarget.dataset;
    wx.navigateTo({
      url: "./details/details?data=" + JSON.stringify(data.bean),
    });
  },

  del_vac_info: function (e) {
    let data = e.currentTarget.dataset;
    this.setData({ del_id: data.bean.id });
  },

  onClose(event) {
    let outer = this;

    const { position, instance } = event.detail;
    Dialog.confirm({
      message: "确定删除吗？",
    })
      .then(() => {
        vaccine.remove(parseInt(outer.data.del_id), function (res) {
          outer.setData({ vaccine: [] });
          outer.onLoad();
        });
      })
      .catch(() => {
        instance.close();
      });
  },

  add_infomation: function () {
    wx.navigateTo({
      url: "./details/details",
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let outer = this;
    vaccine.getVaccines(function (res) {
      for (let i = 0; i < res.data.vList.length; i++) {
        let content = res.data.vList[i];
        content["simple_details"] = content["details"];
        if (content["simple_details"].length > 6) {
          let simple_details = "";
          for (let j = 0; j < 5; j++) simple_details += content["details"][j];
          simple_details += "...";
          content["simple_details"] = simple_details;
        }
        content["simple_company"] = content["company"];
        if (content["simple_company"].length > 9) {
          let simple_company = "";
          for (let j = 0; j < 8; j++) simple_company += content["company"][j];
          simple_company += "...";
          content["simple_company"] = simple_company;
        }

        let this_data = outer.data.vaccine;
        this_data.push(content);
        outer.setData({ vaccine: this_data });
      }
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
