// pages/mypoints/mypoints.js
const app = getApp();
let dateformat = require('../../utils/dateformat.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    summary: '0',
    detail: [{
      project: '在线学习',
      date: '2018-08-23',
      score: '50',
    },
    {
      project: '签到',
      date: '2018-08-22',
      score: '10',
    },
    {
      project: '在线学习',
      date: '2018-08-21',
      score: '50',
    }
    ]
  },
  /**
   * method
   */
  getInfoData(url) {
    let this_ = this;
    //获取数据
    wx.request({
      url: app.globalData.url + url,
      method: 'GET',
      success: function (res) {
        if (res.data.code === 0) {
          let data = res.data.data.list;
          if (data.length !== 0) {
            data.forEach((element) => {
              element.date_time = dateformat.dateformat.format(new Date(Number(element.date_time) * 1000), 'yyyy-MM-dd')
            })
          }
          this_.setData({
            detail: data,
            summary: res.data.data.total_count
            // 'detail.time': dateformat.dateformat.format(new Date(Number(res.data.data.date_time) * 1000), 'yyyy-MM-dd hh:ss')
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInfoData('record/record_score?uid=' + app.globalData.personInfo.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})