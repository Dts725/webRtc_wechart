// pages/aptHistory/aptHistory.js
let common = require('../../utils/common.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,
    // 所有人的预约
    aptList: [],
    // 字段名对应的中文名
    cnKey: {
      id: '',
      field_name: '预约场地',
      title: "活动用途",
      // day: "预约日期",
      // moment: "预约时间",
      name: "联系人",
      phone: '联系电话'
    },
    //预约时间
    timeList: [{
        id: 1,
        time: '07:00-08:00'
      },
      {
        id: 2,
        time: '08:00-09:00'
      },
      {
        id: 3,
        time: '09:00-10:00'
      },
      {
        id: 4,
        time: '10:00-11:00'
      },
      {
        id: 5,
        time: '11:00-12:00'
      },
      {
        id: 6,
        time: '12:00-13:00'
      },
      {
        id: 7,
        time: '13:00-14:00'
      },
      {
        id: 8,
        time: '14:00-15:00'
      },
      {
        id: 9,
        time: '15:00-16:00'
      },
      {
        id: 10,
        time: '16:00-17:00'
      },
      {
        id: 11,
        time: '17:00-18:00'
      },
      {
        id: 12,
        time: '18:00-19:00'
      }
    ],
    field: [], //团队列表
    // showEditBtn: true,
    showCustomBtn: true,
    customBtnName: '取消预约',
    // customBtnStatu:'已取消'
    // showDelBtn: true,
  },
  // 获取预约列表
  getAptList() {
    let _this = this;
    wx.request({
      url: this.data.url + 'admin/appointment/appointment_list?uid=' + app.globalData.personInfo.id,
      success: (res) => {
        if (res.data.code == 0) {
          let data = res.data.data.data;
          for (var i = 0; i < data.length; i++) {
            let startTime = new Date(data[i].day + ' ' + _this.data.timeList[data[i].moment.split(',')[0] - 1].time.slice(0, 2) + ':00:00').getTime(),
              endTime = new Date(data[i].day + ' ' + _this.data.timeList[data[i].moment.split(',')[data[i].moment.split(',').length - 1] - 1].time.slice(6, 8) + ':00:00').getTime(),
              // let startTime = new Date(data[i].day).getTime() + _this.data.timeList[data[i].moment.split(',')[0] - 1].time.slice(0, 2) * 60 * 60 * 1000,
              //   endTime = new Date(data[i].day).getTime() + _this.data.timeList[data[i].moment.split(',')[0] - 1].time.slice(6, 8) * 60 * 60 * 1000,
              nowTime = new Date().getTime();
            if (data[i].is_show == 1) {
              data[i].is_show_name = '已预约';
              data[i].customBtnStatuClass = 'success';
            } else if (data[i].is_show == 2) {
              data[i].is_show_name = '已取消';
              data[i].customBtnStatuClass = 'cancel';
            }
            if (nowTime > endTime) {
              data[i].is_show_name = '已结束';
              data[i].customBtnStatuClass = 'end';
              data[i].is_show = 2;
            }
          }
          common.exchange(res.data.data.data)
          _this.setData({
            aptList: res.data.data.data
          });
        }
      },
      fail: (res) => {
        console.log('fail', res);
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取预约列表
    this.getAptList();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    // this.dialog = this.selectComponent("#dialog");
  },

  // 编辑
  edit(res) {
    wx.switchTab({
      url: '../appointment/apt'
    });
    app.globalData.optId = res.detail.con.id;
  },
  // 取消
  cancel(res) {
    wx.showModal({
      title: '取消',
      content: '您确定取消吗？',
      // showCancel: true,
      success: (e, d) => {
        if (e.confirm) {
          wx.request({
            url: this.data.url + '/admin/appointment/appointment_delete?id=' + res.detail.con.id,
            method: 'POST',
            data: {
              is_show: 2
            },
            success: (res) => {
              // 获取预约列表
              this.getAptList();
              wx.showToast({
                title: '当前预约取消了 ！！！',
                icon: 'none',
                duration: 1000
              });
              // if (res.data.code == 0) {
              //   this.setData({
              //     aptList: res.data.data
              //   });
              // }
            },
            fail: (res) => {
              console.log('fail', res);
            }
          });

        }
      }
    });
  },
  // 删除
  del(res) {
    wx.showModal({
      title: '删除',
      content: '您确定删除吗？',
      // showCancel: true,
      success: (e, d) => {
        if (e.cancel) {
          return false;
        }
        wx.request({
          url: this.data.url + '/appointment/' + res.detail.con.id,
          method: 'DELETE',
          success: (res) => {
            // 获取预约列表
            this.getAptList();
            // if (res.data.code == 0) {
            //   this.setData({
            //     aptList: res.data.data
            //   });
            // }
          },
          fail: (res) => {
            console.log('fail', res);
          }
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //test
    let dd = [];
    common.exchange(dd);

    this.setData({
      aptList: dd
    });

    // 获取预约列表
    setTimeout(() => {
      this.getAptList();
    }, 100);
    // setTimeout(() => {
    //   if (Number(app.globalData.personInfo.authority) < 2) {
    //     this.setData({
    //       showBtn: false
    //     });
    //   } else {
    //     this.setData({
    //       showBtn: true
    //     });
    //   }
    // }, 200);
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
    this.getAptList();
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