// pages/vaccination_info/vaccination_info.js
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";
const vaccine = require("../../apis/vaccine");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    vaccination_info: [],
  },

  vaccination_info_details: function (e) {
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
        vaccine.infoDelete(parseInt(outer.data.del_id), function (res) {
          outer.setData({ vaccination_info: [] });
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
    vaccine.infoGetAll(function (res) {
      for (let i = 0; i < res.data.viList.length; i++) {
        res.data.viList[i].vtime = res.data.viList[i].vtime.replace("T", " ");
        vaccine.infoById(res.data.viList[i].id, function (res) {
          delete res.data.vaccineInfo["id"];
          Object.assign(res.data.viList[i], res.data.vaccineInfo);
          let content = outer.data.vaccination_info;
          content.push(res.data.viList[i]);
          outer.setData({ vaccination_info: content });
        });
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
