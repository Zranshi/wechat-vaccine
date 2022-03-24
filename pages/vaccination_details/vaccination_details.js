// pages/vaccination_details/vaccination_details.js
import user from "../../apis/user";
import vaccine from "../../apis/vaccine";
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    vaccination_details: [],
  },

  del_vac_info: function (e) {
    let data = e.currentTarget.dataset;
    this.setData({ del_id: data.bean.id });
  },

  onClose(event) {
    let that = this;

    const { position, instance } = event.detail;
    Dialog.confirm({
      message: "确定删除吗？",
    })
      .then(() => {
        vaccine.detailDelete(parseInt(that.data.del_id), function (res) {
          that.setData({ vaccination_details: [] });
          that.onLoad();
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
    let that = this;

    vaccine.detailGetAll(function (res) {
      for (let i = 0; i < res.data.vdList.length; i++) {
        res.data.vdList[i].vaccinateTime = res.data.vdList[
          i
        ].vaccinateTime.replace("T", " ");
        vaccine.infoFind(res.data.vdList[i].viid, function (res) {
          res.data.vdList[i].place = res.data.vnInfo.place;
          vaccine.infoById(res.data.vnInfo.vid, function (respp) {
            res.data.vdList[i].type = respp.data.vaccineInfo.type;
            user.userInfo(res.data.vdList[i].uid, function (res) {
              res.data.vdList[i].real_name = respp.data.us.realName;
              let content = that.data.vaccination_details;
              content.push(res.data.vdList[i]);
              that.setData({ vaccination_details: content });
            });
          });
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
