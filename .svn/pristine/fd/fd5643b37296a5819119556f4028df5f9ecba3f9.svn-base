// pages/partyGroupService/partyGroupServiceInfo.js
let WxParse = require('../../utils/wxParse/wxParse.js');
let dateformat = require('../../utils/dateformat.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,
    fileUrl: app.globalData.fileUrl,
    status: 1,
    detail: {
      // image: 'appointmentfile/5b4ef675d212b__!test.jpg',
      // // image: '../../../static/test.jpg',
      // name: '传承五四薪火，弘扬泰达精神',
      // create_time: '2016-04-28 11:00',
      // time: '2016-04-29 11:00-12:00',
      // place: '美克公寓餐厅一楼活动室',
      // team: '兰亭秀书画社',
      // author: '张三',
      // contact: '13754265984',
      // num: 5,
      // introduction: "为了纪念“五四”青年节，弘扬五四精神，丰富外来建设者的业余文化生活，充分展示当代新市民昂扬向上的精神面貌，加强团队组织建设，继承、发扬优良传统，激发爱国热情，特举办“传承五四薪火，弘扬泰达精神”的活动。",
      // start_time: "1531882800000",
      // status: 0
    }
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
  //立即报名 / 取消报名
  signEvent(e) {
    app.globalData.checkRegister(app.globalData.personInfo.if_register)
    //未检测到用户
    if (app.globalData.personInfo.if_register == 2) {
      return;
    }
    let _this = this,
      url = '',
      type = '',
      dat = '',
      con = '',
      is_sign = 0;
    if (this.data.detail && this.data.detail.is_sign) {
      is_sign = this.data.detail.is_sign;
    }
    // 报名
    if (is_sign == 0) {
      url = 'record/increase';
      type = 'POST';
      dat = {
        type: 4,
        moudle: 2,
        uid: app.globalData.personInfo.id,
        date_time: Math.ceil(new Date().getTime() / 1000),
        record_id: this.data.detail.id
      };
      con = '您确定报名此活动吗？';
      console.log('dat:::', dat);
      if (!dat.uid) {
        wx.showToast({
          title: '未获取到用户信息，请重启小程序或微信',
          icon: 'none',
          duration: 2500
        });
        return false;
      }
      // 取消报名
    } else if (is_sign && is_sign == 1) {
      url = `record/delete`;
      type = 'POST';
      dat = {
        type: 4,
        moudle: 2,
        uid: app.globalData.personInfo.id,
        record_id: this.data.detail.id
      };
      con = '您确定取消此活动吗？'
    }
    let that = this;
    wx.showModal({
      title: '温馨提示',
      content: con,
      success: function (res) {

        if (res.confirm) {
          wx.request({
            url: _this.data.url + url,
            method: type,
            data: dat,
            success: (res) => {
              if (res.data.code == 0) {
                that.getDetail(that.data.detail.id, app.globalData.personInfo.id);
                wx.showToast({
                  title: is_sign == 0 ? '报名成功！' : (is_sign == 1 ? '已取消报名！' : ''),
                  icon: is_sign == 0 ? 'success' : 'none',
                  duration: 3000
                })
              } else {
                wx.showToast({
                  title: res.data.is_sign,
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
  getDetail(id, uid) {
    if (!id || !uid) {
      wx.showToast({
        title: '获取详情信息失败，请返回重试！',
        icon: 'none',
        duration: 2000
      })
    }
    wx.showLoading({
      title: '加载中',
    });
    let _this = this;
    wx.request({
      url: this.data.url + 'admin/active/active_info',
      data: {
        id: id,
        uid: uid,
      },
      success: (res) => {
        if (res.data.code == 0) {
          wx.hideLoading();
          let start_time = res.data.data.start_time.length == 13 ? res.data.data.start_time : res.data.data.start_time * 1000;
          let end_time = res.data.data.end_time.length == 13 ? res.data.data.end_time : res.data.data.end_time * 1000;
          let create_time = res.data.data.create_time == 13 ? res.data.data.create_time : res.data.data.create_time * 1000;
          if (start_time) {
            if (end_time) {
              res.data.data.time = dateformat.dateformat.format(new Date(Number(start_time)), 'yyyy-MM-dd hh:mm') + '-' + dateformat.dateformat.format(new Date(Number(end_time)), 'hh:mm')
            } else {
              res.data.data.time = dateformat.dateformat.format(new Date(Number(start_time)), 'yyyy-MM-dd hh:mm')
            }
          }
          res.data.data.create_time = res.data.data.create_time ? dateformat.dateformat.format(new Date(Number(create_time)), 'yyyy-MM-dd hh:mm') : '';
          // if (Number(res.data.data.sign_status) == 1) {
          //   res.data.data.status = 3;
          // }
          if(res.data.data.limit == res.data.data.sign && !res.data.data.is_sign){
            res.data.data.is_sign = 2
          }
          _this.setData({
            detail: res.data.data
          });

          if (res.data.data.content.length <= 1048000 / 3) {
            var article = this.data.detail.content;
            WxParse.wxParse('article', 'html', article, this, 5);
          } else {
            wx.showToast({
              title: '加载失败，文本字段长度超过了微信限制长度1048576，因此无法显示！！！',
              icon: 'none',
              duration: 2000
            })
          }
          // console.log('活动详情数据：：：', res.data.data)
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
    this.setData({
      ids: options.id,
    });
    if (options.id) {
      this.getDetail(options.id, app.globalData.personInfo.id);
    }
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
    // this.setData({
    //   infoDatas: {
    //     title: '让美好愿景变为现实',
    //     author: '张老师',
    //     time: '2018-07-26 11:33',
    //     content: '7月26日，金砖国家领导人第十次会晤在南非约翰内斯堡举行。南非总统拉马福萨',
    //     isthumb: false,
    //     iscollect: false
    //   }
    // });
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