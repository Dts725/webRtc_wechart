//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    logs: [],
    src:'../../static/images/earth.png',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo){
       app.globalData.userInfo = e.detail.userInfo
       app.globalData.userInfoWX = e.detail;
  
        wx.login({
          success:res=>{
            wx.request({
              url: app.globalData.url + 'getWxUserInfo',
              method: 'GET',
              data: {
                code: res.code,
                iv: app.globalData.userInfoWX.iv,
                encryptedData: app.globalData.userInfoWX.encryptedData
              },
              success: function (resp) {
                if (resp.statusCode == 200) {
                  app.globalData.openid = resp.data.data.openid;
                  wx.navigateTo({
                    url: '/pages/redSelect/index'
                  })
                }
              }
            })
          }
        })
    }else{
      wx.showToast({
        title: '重新授权',
        icon: 'success',
        duration: 2000
      })
    }
  },
})
