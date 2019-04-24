// baselineActivity.js
var sliderWidth = 99; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();
// var WxParse = require('../../utils/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    cardDataActive: [],
    cardDataLearn: [
    ],
    //选项卡
    tabs: ["党建活动", "在线学习"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    //轮播图
    // imgUrls: [
    //   // 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //   // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //   // 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    // ],
    // imgName: [],
    swiper: [],
  },

  /**
   * medthod
   */
  getListData(url) {
    let this_ = this;
    //获取列表数据
    wx.request({
      url: app.globalData.url + url,
      method: 'GET',
      success: function (res) {
        if (res.data.code === 0) {
          wx.hideLoading();
          if (res.data.data.data.length <= 0) {
            wx.showToast({
              title: '已经到底了~~',
              icon: 'none',
              duration: 2000
            });
            return false;
          }
          let data = res.data.data.data,
            oldData = this_.data.cardDataActive,
            // carouselMap = [],
            arr = [],
            swiperDate = [];
          let i = 0;
          data.forEach(element => {
            if (element.image || element.album) {
              element.image = app.globalData.imageUrl + '/' + (element.image || element.album)
            }
            element.content = element.content.replace(/\<\/?.*?\>/g, '').replace(/\&nbsp\;/g, '');
            if (i < 5) {
              if (element.hot == 1) {
                if (element.image) {
                  swiperDate.push(data[i]);
                }else{
                  arr = JSON.stringify(data[i]);
                  arr = JSON.parse(arr)
                  arr.image = '../../static/nopic.jpg';
                  swiperDate.push(arr);
                }
              }
              i++;
            }
          });


          data = oldData.concat(data);
          if (url.charAt(url.length - 1) == 1) {
            this_.setData({
              page: res.data.data.current_page,
              cardDataActive: data,
              swiper: swiperDate,
            });
          }
          else {
            this_.setData({
              page: res.data.data.current_page,
              cardDataActive: data
            });
          }
        }
      }
    });
  },
  turnToInfo(e) {
    //详情页
    wx.navigateTo({
      url: '../../pages/baselineActivity/baselineActivityInfo?id=' + e.detail.con.id + '&activeIndex=' + this.data.activeIndex
    })
  },
  tabClick: function (e) {
    //选项卡
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    this.setData({
      cardDataActive: []
    });
    if (e.currentTarget.id == 0)
      this.getListData('admin/news/news_list?type=1&is_publish=1');
    else
      this.getListData('admin/e_learn?type=4&is_show=1');
  },
  //跑马灯
  scroll() {
    var speed = 50; // 速度 -- px每秒

    var $marquee = document.querySelector('.image-introduction-marquee');
    var $marqueeContent = $marquee.querySelector('.image-introduction-content');
    // 内容复制3份好有连续性
    $marqueeContent.innerHTML = $marqueeContent.innerHTML + $marqueeContent.innerHTML + $marqueeContent.innerHTML
    var contentWidth = $marqueeContent.getBoundingClientRect().width;
    if (contentWidth <= 0) { // 没有内容搞什么动画
      return;
    }

    // 内容复制了3份，宽度也要除以3
    contentWidth = contentWidth / 3

    // 计算一次动画应该要花费多少时间
    var onceTime = contentWidth / speed * 1000; //ms

    $marqueeContent.style.animationDuration = onceTime + "ms"
  },
  jump(e) {
    //详情页
    wx.navigateTo({
      url: '../../pages/baselineActivity/baselineActivityInfo?id=' + e.currentTarget.id + '&activeIndex=' + this.data.activeIndex
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //选项卡
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    this.getListData('admin/news/news_list?type=1&is_publish=1');
    //滚动
    // this.scroll();

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
    // 新版本检测
    wx.getUpdateManager().onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log("是否有新版本：" + res.hasUpdate);
      if (res.hasUpdate) {//如果有新版本
        // 小程序有新版本，会主动触发下载操作（无需开发者触发）
        wx.getUpdateManager().onUpdateReady(function () {//当新版本下载完成，会进行回调
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，单击确定重启应用',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                wx.getUpdateManager().applyUpdate();
              }
            }
          })
        })
        // 小程序有新版本，会主动触发下载操作（无需开发者触发）
        wx.getUpdateManager().onUpdateFailed(function () {//当新版本下载失败，会进行回调
          wx.showModal({
            title: '提示',
            content: '检查到有新版本，但下载失败，请检查网络设置',
            showCancel: false,
          })
        })
      }
    });
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
    this.setData({
      cardDataActive: []
    });
    if (this.data.activeIndex == 0)
      this.getListData('admin/news/news_list?type=1&is_publish=1');
    else
      this.getListData('admin/e_learn?type=4&is_show=1');
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    });

    if (this.data.activeIndex == 0)
      this.getListData('admin/news/news_list?type=1&is_publish=1&page=' + this.data.page);
    else
      this.getListData('admin/e_learn?type=4&is_show=1&page=' + this.data.page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})