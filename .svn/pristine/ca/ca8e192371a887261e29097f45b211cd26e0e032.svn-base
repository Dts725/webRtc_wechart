const app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.data.url = 'https://jcdjadmin.shyunhua.com/footprint/#/?nickName=' + app.globalData.userInfo.nickName + '&openid=' + app.globalData.openid;
     //this.data.url = 'http://192.168.6.141:8080/#/?nickName=' + app.globalData.userInfo.nickName + '&openid=' + app.globalData.openid;;
     this.setData({
       url:this.data.url
     })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    var that = this
    return {
      title: '红色足迹',
      path: 'pages/redIndex/index',
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: "转发成功",
          icon: 'success',
          duration: 2000
        })

      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})