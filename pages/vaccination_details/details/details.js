// pages/vaccination_details/details/details.js
import Toast from "../../../miniprogram_npm/@vant/weapp/toast/toast";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    uid: "",
    viid: "",
    real_name: "",
    doctorName: "",
    type: "",
    place: "",
    vaccinateTime: "1999-10-24 00:00:00",
    add_or_update: "add",
  },

  handleChange(e) {
    this.setData({
      vaccinateTime: e.detail.dateString,
    });
  },

  check_uid() {
    let outer = this;

    wx.request({
      url: "http://172.20.10.3:8089/user/info/getByUid",
      data: {
        uid: parseInt(outer.data.uid),
      },
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.us == null) {
          outer.setData({ real_name: "" });
          Toast.fail("请核对用户ID");
        } else {
          outer.setData({ real_name: res.data.us.realName });
        }
      },
    });
  },

  check_viid() {
    let outer = this;

    wx.request({
      url: "http://172.20.10.2:8089/vi/info/find",
      data: {
        id: outer.data.viid,
      },
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        if (res.data.vnInfo == null) {
          outer.setData({
            place: "",
            type: "",
          });
          Toast.fail("请核对接种地ID");
          return;
        }
        wx.request({
          url: "http://172.20.10.2:8089/vaccine/getInfo",
          data: {
            id: res.data.vnInfo.vid,
          },
          header: {
            "content-type": "application/json", // 默认值
          },
          success(resp) {
            outer.setData({
              place: res.data.vnInfo.place,
              type: resp.data.vaccineInfo.type,
            });
          },
        });
      },
    });
  },

  save() {
    let outer = this;

    if (this.data.doctorName == "") {
      Toast.fail("请输入接种医生姓名");
      return;
    }

    if (this.data.uid == "") {
      Toast.fail("请核对用户ID");
      return;
    }

    if (this.data.viid == "") {
      Toast.fail("请核对接种地ID");
      return;
    }

    if (this.data.add_or_update == "add") this.setData({ id: -1 });

    let url = "http://172.20.10.2:8089/vn/details/" + this.data.add_or_update;
    let param = {};
    param["doctorName"] = this.data.doctorName;
    param["uid"] = parseInt(this.data.uid);
    param["viid"] = parseInt(this.data.viid);
    param["vaccinateTime"] = this.data.vaccinateTime;
    if (this.data.add_or_update == "update") {
      param["id"] = this.data.id;
    }

    wx.request({
      url: url,
      data: param,
      header: {
        "content-type": "application/json", // 默认值
      },
      success(res) {
        Toast.success("成功");
        setTimeout(function () {
          wx.navigateTo({
            url: "../vaccination_details",
          });
        }, 500);
      },
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
