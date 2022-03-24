// pages/home/home.js
const echarts = require("../../ec-canvas/echarts");
var chart;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    movies: [
      {
        url:
          "https://ranshi-cnd-1305893362.cos.ap-guangzhou.myqcloud.com/wechat-vaccine/swiper1.jpg",
      },
      {
        url:
          "https://ranshi-cnd-1305893362.cos.ap-guangzhou.myqcloud.com/wechat-vaccine/swiper2.jpg",
      },
      {
        url:
          "https://ranshi-cnd-1305893362.cos.ap-guangzhou.myqcloud.com/wechat-vaccine/swiper3.jpg",
      },
      {
        url:
          "https://ranshi-cnd-1305893362.cos.ap-guangzhou.myqcloud.com/wechat-vaccine/swiper4.jpg",
      },
    ],
    permission: false,
    ecPie: {
      onInit: function (canvas, width, height) {
        chart = echarts.init(canvas, null, {
          width: width,
          height: height,
        });
        canvas.setChart(chart);
        var opt = {
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "5%",
            left: "center",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: { show: false, position: "center" },
              emphasis: {
                label: { show: true, fontSize: "40", fontWeight: "bold" },
              },
              labelLine: { show: false },
              data: [
                { value: 1048, name: "Search Engine" },
                { value: 735, name: "Direct" },
                { value: 580, name: "Email" },
                { value: 484, name: "Union Ads" },
                { value: 300, name: "Video Ads" },
              ],
            },
          ],
        };
        chart.setOption(opt);
      },
    },
  },

  navigateToServer: function () {
    wx.switchTab({
      url: "/pages/reserve/reserve",
    });
  },
  navigateToAdmin: function () {
    wx.navigateTo({
      url: "/pages/admin/admin",
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getStorage({
      key: "permission",
      success: function (res) {
        if (res.data === true) {
          that.setData({
            permission: true,
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
