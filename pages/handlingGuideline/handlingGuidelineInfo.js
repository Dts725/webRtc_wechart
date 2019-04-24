// pages/handlingGuideline/handlingGuidelineInfo.js
const app = getApp();
let dateformat = require('../../utils/dateformat.js');
let WxParse = require('../../utils/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoDatas: {
      // title: '发展党员工作指南',
      // author: '张老师',
      // time: '2018-05-11 11:33',
      // content: '发展党员工作指南围绕',
      // isthumb: false,
      // iscollect: false
    },
    ids: 0,
    active:''
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
  getInfoData(url) {
    let this_ = this;
    //获取数据
    wx.request({
      url: app.globalData.url + url,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.code === 0) {
          wx.hideLoading();
          // if (res.data.data.length <= 0) {
          //   wx.showToast({
          //     title: '已经到底了~~',
          //     icon: 'none',
          //     duration: 2000
          //   });
          //   return false;
          // }
          this_.setData({
            infoDatas: res.data.data,
            'infoDatas.time': dateformat.dateformat.format(new Date(Number(res.data.data.date_time) * 1000), 'yyyy-MM-dd hh:mm')
          });
          var article = this_.data.infoDatas.content;
          WxParse.wxParse('article', 'html', article, this_, 5);
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
      active: options.active
    });

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
    this.getInfoData('admin/online/online_info?id=' + this.data.ids);
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