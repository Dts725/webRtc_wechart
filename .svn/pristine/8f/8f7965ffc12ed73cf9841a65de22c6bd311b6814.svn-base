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
    diff: 0,
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
        if (res.data.code === 0 && this_.data.diff == 0) {
          var article = res.data.data.content;
          WxParse.wxParse('article', 'html', article, this_, 5);
          this_.setData({
            infoDatas: res.data.data,
            "infoDatas.time": dateformat.dateformat.format(new Date(Number(res.data.data.date_time) * 1000), 'yyyy-MM-dd hh:mm'),
          });


        }
        if (res.data.code === 0 && this_.data.diff == 1) {
          res.data.data.forEach(element => {
            if (element.id == this_.data.ids) {
              var article = element.content;
              WxParse.wxParse('article', 'html', article, this_, 5);

              if (this_.data.url.indexOf('news_list') > 0) {
                this_.setData({
                  infoDatas: element,
                  "infoDatas.time": dateformat.dateformat.format(new Date(Number(element.date_time) * 1000), 'yyyy-MM-dd hh:mm'),
                  //collection thumb_up
                });
              } else {
                this_.setData({
                  infoDatas: element,
                  "infoDatas.time": dateformat.dateformat.format(new Date(Number(element.create_time) * 1), 'yyyy-MM-dd'),
                  "infoDatas.video_src": app.globalData.fileUrl + '/' + element.video_src
                  //collection thumb_up
                });
              }
            }
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
      diff: options.activeIndex,
      url: options.activeIndex == '0' ? 'admin/news/news_info?id=' + options.id : ('admin/e_learn/' + options.id)
    });
    if (this.data.diff == 1) {
      app.globalData.checkRegister(app.globalData.personInfo.if_register)
      //未检测到用户
      if (app.globalData.personInfo.if_register == 2) {
        return;
      }
      wx.request({
        url: 'https://apijcdj.shyunhua.com/admin/e_learn/' + this.data.ids + '?uid=' + app.globalData.personInfo.id,
        method: 'GET',
        success: function (res) {
          if (res.data.code === 0) {
            console.log('infoData: ', res.data.data)
          }
        }
      });
    }
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