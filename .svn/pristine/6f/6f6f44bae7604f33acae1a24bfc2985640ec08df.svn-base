// handlingGuideline.js
var sliderWidth = 65; // 需要设置slider的宽度，用于计算中间位置
const app = getApp();
let dateformat = require('../../utils/dateformat.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // titleData: [{
    //   id: 1,
    //   title: '党章',
    //   time: '2018-06-21'
    // }, {
    //   id: 2,
    //   title: '公务员考试录用违纪违规行为处理办法',
    //   time: '2018-06-21'
    // }, {
    //   id: 3,
    //   title: '农村基层干部廉洁履行职责若干规定（试行）',
    //   time: '2018-06-21'
    // }, {
    //   id: 4,
    //   title: '中共中央办公厅印发《事业单位领导人员管理暂行规定》',
    //   time: '2018-06-21'
    // }]
    tabs: ["办事指南", "区级文件","市级文件", "中央文件"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    page:1,
  },

  /**
   * method
   */
  watchInfo(e) {
    wx.navigateTo({
      url: '../../pages/handlingGuideline/handlingGuidelineInfo?id=' + e.currentTarget.id + '&active=' +this.data.activeIndex
    })
  },
  //选项卡
  tabClick: function (e) {
    this.setData({
      page:1,
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    this.getListData('admin/online/online_list?type=' + (Number(this.data.activeIndex) + 1))
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
          if (res.data.data.data.length <= 0) {
            wx.showToast({
              title: '已经到底了~~',
              icon: 'none',
              duration: 2000
            });
            if(this_.data.page == 1){
              this_.setData({
                titleData: [],
              });
            }
            return false;
          }

          let newData = res.data.data.data,
            time = [];
          newData.forEach(element => {
            element.time = dateformat.dateformat.format(new Date(Number(element.date_time) * 1000), 'yyyy-MM-dd');
          });
          if (this_.data.page == 1) {
            this_.setData({
              titleData: newData,
            });
          } else {
            let addData = this_.data.titleData.concat(newData);
            this_.setData({
              titleData: addData,
            })
          }
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
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
    this.getListData('admin/online/online_list?type=' + (Number(this.data.activeIndex) + 1));
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
    this.setData({
      page: 1
    });
    this.getListData('admin/online/online_list?type=' + (Number(this.data.activeIndex) + 1))
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      page: this.data.page + 1
    });
    this.getListData('admin/online/online_list?type=' + (Number(this.data.activeIndex) + 1) + '&page=' + this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})