/** 封装微信小程序 显示和隐藏加载状态，用于限制用户重复点击  
 * 使用方法：1、引入此Loading.js 文件  let Loading = require('../../../utils/Loading.js');
 * 2、Loading.Loading.show('加载中...');
 * 3、Loading.Loading.hide();
 * **/
function Loading(){}
Loading.show = function(message){
  if (wx.showLoading) {
    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.showLoading({
      title: message,
      mask: true
    });
  } else {
    // 低版本采用Toast兼容处理并将时间设为20秒以免自动消失
    wx.showToast({
      title: message,
      icon: 'loading',
      mask: true,
      duration: 20000
    });
  }
};
Loading.hide = function(){
  if (wx.hideLoading) {
    // 基础库 1.1.0 微信6.5.6版本开始支持，低版本需做兼容处理
    wx.hideLoading();
  } else {
    wx.hideToast();
  }
};

module.exports = Loading
