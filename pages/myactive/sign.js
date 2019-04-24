// pages/myactive/sign.js
let dateformat = require('../../utils/dateformat.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,
    detail: {
      image: '',
      // image: '../../../static/test.jpg',
      name: '',
      time: '',
      place: '',
      team: '',
      author: '',
      num: 5,
      introduction: "",
      start_time: "",
      status: 1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.id) {
      this.getDetail(options.id);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * methods
   */
  //签到
  sign(e) {
    let _this = this;
    let dat = {
      uid: app.globalData.personInfo.id,
      active_id: _this.data.detail.id,
      date_time: new Date().getTime()
    };
    console.log('dat:::', dat);
    if (!dat.uid) {
      wx.showToast({
        title: '未找到uid',
        icon: 'none',
        duration: 2500
      });
      return false;
    }
    wx.showModal({
      title: '签到',
      content: '您确定签到吗？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: _this.data.url + 'active_sign',
            method: 'POST',
            data: dat,
            success: (res) => {
              if (res.data.code == 0) {
                wx.showToast({
                  title: '签到成功',
                  icon: 'success',
                  duration: 2000
                });
                setTimeout(()=>{
                  wx.navigateBack({
                    delta: 2
                  })
                },2000);
              } else {
                wx.showToast({
                  title: res.data.status,
                  icon: 'none',
                  duration: 2000
                })
              }
            },
            fail: (res) => {
              console.log('fail', res);
            }
          });

        }
      }
    })
  },
  // 获取详情
  getDetail(id) {
    wx.showLoading({
      title: '加载中',
    });
    let _this = this;
    wx.request({
      url: _this.data.url + 'active/' + id,
      success: (res) => {
        if (res.data.code == 0) {
          wx.hideLoading();
          if (res.data.data.start_time && res.data.data.end_time) {
            res.data.data.time = dateformat.dateformat.format(new Date(Number(res.data.data.start_time)), 'yyyy-MM-dd hh:mm') + '-' + dateformat.dateformat.format(new Date(Number(res.data.data.end_time)), 'hh:mm')
          }
          res.data.data.create_time = res.data.data.create_time ? dateformat.dateformat.format(new Date(Number(res.data.data.create_time)), 'yyyy-MM-dd hh:mm') : '';
          this.setData({
            detail: res.data.data
          });
          console.log('活动详情数据：：：', res.data.data)
        }
      },
      fail: (res) => {
        console.log('fail', res);
      }
    });
  },
})