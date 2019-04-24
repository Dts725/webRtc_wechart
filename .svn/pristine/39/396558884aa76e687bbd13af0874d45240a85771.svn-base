// baselineActivityInfo.js
let dateformat = require('../../utils/dateformat.js');
let WxParse = require('../../utils/wxParse/wxParse.js');

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,
    fileUrl: app.globalData.fileUrl,
    infoDatas: {},
    ids: 0,
    url: ''
  },

  /**
   * method
   */
  thumbEvent(e) {
    console.log(e)
  },
  collectEvent(e) {
    console.log(e)
  },
  getListData(url) {
    let this_ = this;
    wx.request({
      url: app.globalData.url + url,
      method: 'GET',
      success: function (res) {
        if (res.data.code === 0) {
          var article = res.data.data.content;
          WxParse.wxParse('article', 'html', article, this_, 5);

          let time = '';
          if (res.data.data.create_time.length == 10){
            time = dateformat.dateformat.format(new Date(Number(res.data.data.create_time) * 1000), 'yyyy-MM-dd')
          } else if (res.data.data.create_time.length == 13){
            time = dateformat.dateformat.format(new Date(Number(res.data.data.create_time)), 'yyyy-MM-dd')
          } else{
            time = dateformat.dateformat.format(new Date(Number(res.data.data.create_time.slice(13))), 'yyyy-MM-dd')
          }
          this_.setData({
            infoDatas: res.data.data,
            "infoDatas.time": time,
            "infoDatas.video_src": app.globalData.fileUrl + '/' + res.data.data.video_src
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ids: options.id,
      url: 'live/video_on_demand/' + options.id
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getListData(this.data.url);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.clearStorage()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.clearStorage()
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
    wx.stopPullDownRefresh();
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