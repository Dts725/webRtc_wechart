// pages/mystudy/mystudy.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardDataActive: [],
    activeIndex: 1,
  },

  getListData(url) {
    let this_ = this;
    //获取列表数据
    wx.request({
      url: app.globalData.url + url,
      method: 'GET',
      success: function (res) {
        if (res.data.code === 0) {
          wx.hideLoading();
          let data = res.data.data.data,
            oldData = this_.data.cardDataActive;
          data.forEach(element => {
            if (element.album != '') {
              element.image = app.globalData.fileUrl + '/' + element.album;
            }
            element.content = element.content.replace(/\<\/?.*?\>/g, '').replace(/\&nbsp\;/g, '');
           
          });


          data = oldData.concat(data);
          // if (url.charAt(url.length - 1) == 1)
          //   this_.setData({
          //     cardDataActive: data,
          //   });
          // else
          this_.setData({
            cardDataActive: data
          });
        }
      },
      fail: (res) => {
        console.log('fail', res);
      }
    });
  },

  turnToInfo(e) {
    //详情页
    wx.navigateTo({
      url: '../../pages/baselineActivity/baselineActivityInfo?id=' + e.detail.con.id + '&activeIndex=' + this.data.activeIndex
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData('record/record_elearn?uid=' + app.globalData.personInfo.id);
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