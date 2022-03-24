// pages/vaccination_details/vaccination_details.js
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
    let outer = this;

    const { position, instance } = event.detail;
    Dialog.confirm({
      message: "确定删除吗？",
    })
      .then(() => {
        wx.request({
          url: "http://172.20.10.2:8089/vn/details/delete",
          data: {
            id: parseInt(outer.data.del_id),
          },
          header: {
            "content-type": "application/json", // 默认值
          },
          success() {
            outer.setData({ vaccination_details: [] });
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
      url: "http://172.20.10.2:8089/vn/details/getAll",
      data: {},
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        for (let i = 0; i < res.data.vdList.length; i++) {
          res.data.vdList[i].vaccinateTime = res.data.vdList[
            i
          ].vaccinateTime.replace("T", " ");
          wx.request({
            url: "http://172.20.10.2:8089/vi/info/find",
            data: {
              id: res.data.vdList[i].viid,
            },
            header: {
              "content-type": "application/json", // 默认值
            },
            success(resp) {
              res.data.vdList[i].place = resp.data.vnInfo.place;
              wx.request({
                url: "http://172.20.10.2:8089/vaccine/getInfo",
                data: {
                  id: resp.data.vnInfo.vid,
                },
                header: {
                  "content-type": "application/json", // 默认值
                },
                success(respp) {
                  res.data.vdList[i].type = respp.data.vaccineInfo.type;
                  wx.request({
                    url: "http://172.20.10.3:8089/user/info/getByUid",
                    data: {
                      uid: res.data.vdList[i].uid,
                    },
                    header: {
                      "content-type": "application/json", // 默认值
                    },
                    success(resppp) {
                      res.data.vdList[i].real_name = respp.data.us.realName;
                      let content = outer.data.vaccination_details;
                      content.push(res.data.vdList[i]);
                      outer.setData({ vaccination_details: content });
                    },
                  });
                },
              });
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
