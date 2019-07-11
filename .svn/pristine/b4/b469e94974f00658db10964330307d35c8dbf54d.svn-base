// pages/redIndexSpecial/special.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    // 'https://jcdjadmin.shyunhua.com/footprint/#/?nickName=' + app.globalData.userInfo.nickName + '&openid=' + app.globalData.openid
    // openid: app.globalData.openid,
    // nickName: app.globalData.userInfo.nickName,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.data.url = 'https://jcdjadmin.shyunhua.com/zu_ji_special/#/?t=' + new Date().getTime();
    // this.data.url = 'https://jcdjadmin.shyunhua.com/zu_ji/zu_ji_special_h5/#/?t=' + new Date().getTime();
    // this.data.url = 'http://192.168.6.134:8080/#/?t=' + new Date().getTime();
    //this.data.url = 'http://192.168.6.141:8080/#/?nickName=' + app.globalData.userInfo.nickName + '&openid=' + app.globalData.openid;;
    // debugger;
    this.setData({
      // url: this.data.url
      url: 'https://jcdjadmin.shyunhua.com/zu_ji/zu_ji_special_h5/#/?nickName=' + app.globalData.userInfo.nickName + '&openid=' + app.globalData.personInfo.openid + '&t=' + new Date().getTime()
      // url: 'http://192.168.6.134:8080/#/?nickName=' + app.globalData.userInfo.nickName + '&openid=' + app.globalData.personInfo.openid + '&t=' + new Date().getTime()
      // url: 'http://localhost:8080/#/?nickName=' + app.globalData.userInfo.nickName + '&openid=' + app.globalData.openid +'&t=' + new Date().getTime()
    })
    // console.log('webview url 地址：：', this.data.url);
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
    this.onLoad();
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