// pages/vaccination_info/vaccination_info.js
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

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
        wx.request({
          url: "http://172.20.10.2:8089/vi/info/delete",
          data: {
            id: parseInt(outer.data.del_id),
          },
          header: {
            "content-type": "application/json", // 默认值
          },
          success() {
            outer.setData({ vaccination_info: [] });
            outer.onLoad();
          },
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

    wx.request({
      url: "http://172.20.10.2:8089/vi/info/getAll",
      data: {},
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        for (let i = 0; i < res.data.viList.length; i++) {
          res.data.viList[i].vtime = res.data.viList[i].vtime.replace("T", " ");
          wx.request({
            url: "http://172.20.10.2:8089/vaccine/getInfo",
            data: {
              id: res.data.viList[i].id,
            },
            header: {
              "content-type": "application/json", // 默认值
            },
            success(resp) {
              delete resp.data.vaccineInfo["id"];
              Object.assign(res.data.viList[i], resp.data.vaccineInfo);
              let content = outer.data.vaccination_info;
              content.push(res.data.viList[i]);
              outer.setData({ vaccination_info: content });
            },
          });
        }
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
