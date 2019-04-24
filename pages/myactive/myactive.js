// pages/myactive/myactive.js
const app = getApp();
let dateformat = require('../../utils/dateformat.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,
    fileUrlurl: app.globalData.fileUrl,
    total: 0,
    cardData: [{
      // image: '../../../static/test.jpg',
      // name: '传承五四薪火，弘扬泰达精神',
      // start_time: '2016-04-29 11:00-12:00',
      // end_time: '',
      // place: '美克公寓餐厅一楼活动室',
      // organization: '兰亭秀书画社',
      // sign_status: '2', // 1已签到 2未签到
      // enroll_time: '', // 报名时间
    },],
    status: 1,
    /** card组件右侧的扫码图标路径 */
    imgSrc: '../../../static/scan.png',
  },
  /**
   * medthod
   */
  //查看详情
  detailEvent(e) {
    wx.navigateTo({
      url: '../../pages/partyGroupService/partyGroupServiceInfo?id=' + e.detail.con.id + '&uid=' + app.globalData.personInfo.id
    })
  },
  // 扫码
  qrcodeEvent(e) {
    wx.scanCode({
      // onlyFromCamera: onlyCamera, // true为只可使用相机扫码
      success: (res) => { },
      complete: res => {
        if (res.result) {
          wx.navigateTo({
            url: res.result
            // url: '../../pages/myactive/sign?id=' + this.data.detail.id + '&uid=' + app.globalData.personInfo.id
          })
        } else {
          console.log('扫码失败:::', res);
        }
      }
    })
  },
  //立即报名 / 取消报名
  signEvent(e) {
    let _this = this,
      url = '',
      type = '',
      dat = '',
      con = '',
      is_sign = 0;
    if (e.detail && e.detail.con) {
      is_sign = e.detail.con.is_sign;
    }
    // 报名
    if (is_sign == 0) {
      url = 'record/increase';
      type = 'POST';
      dat = {
        type:4,
        moudle:2,
        uid: app.globalData.personInfo.id,
        date_time: Math.ceil(new Date().getTime() / 1000),
        record_id: e.detail.con.id
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
        type:4,
        moudle:2,
        uid:app.globalData.personInfo.id,
        record_id: e.detail.con.id
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
                wx.showToast({
                  title: is_sign == 0 ? '报名成功！' : (is_sign == 1 ? '已取消报名！' : ''),
                  icon: is_sign == 0 ? 'success' : 'none',
                  duration: 2500
                })
                  that.getList();
                
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
          console.log(e.detail.con.id, app.globalData.personInfo.id);
        }
      }
    })
  },
  // 获取我报名的活动列表
  getList(page = 1) {

    let _this = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: this.data.url + 'record/record_active',
      method: 'GET',
      data: {
        uid: app.globalData.personInfo.id,
        type: 4,
        moudle: 2,
      },
      success: (res) => {
        if (res.data.code == 0) {
          wx.hideLoading();
          _this.total = res.data.data.total;

          let data = res.data.data.data;
          let time = '';
          // for (let i = 0; i < data.length; i++) {
          //   if (!data[i].start_time || !data[i].end_time) {
          //     time = '';
          //   } else {
          //     time = _this.fmtDate(data[i].start_time).substring(0, 10) + ' ' + _this.fmtDate(data[i].start_time).substring(10) + ' -' + _this.fmtDate(data[i].end_time).substring(10);
          //   }
          //   data[i].time = time;
          // data[i].image = data[i].image ? (_this.data.fileUrlurl + '/' + data[i].image) : '../../../static/default_img.png';
          // data[i].imgSrc = '';
          // if (Number(data[i].sign_status) == 1) {
          //   if (data[i].status !== 0) {
          //     data[i].status = 3;
          //   }
          //   data[i].qrcodeShow = false;
          // } else {
          //   if (data[i].status == 0) {
          //     data[i].qrcodeShow = false;
          //   } else {
          //     data[i].status = 2;
          //     data[i].qrcodeShow = true;
          //     data[i].imgSrc = this.data.imgSrc;
          //   }
          // }
          // }
          data.forEach(element => {
            if (element.end_time) {
              element.time = dateformat.dateformat.format(new Date(Number(element.start_time) * 1000), 'yyyy-MM-dd hh:mm') + '-' + dateformat.dateformat.format(new Date(Number(element.end_time * 1000)), 'yyyy-MM-dd hh:mm');
            } else {
              element.time = dateformat.dateformat.format(new Date(Number(element.start_time) * 1000), 'yyyy-MM-dd hh:mm');
            }
            if (element.limit == element.sign && !element.is_sign) {
              element.is_sign = 2;
            }
          });
          _this.setData({
            cardData: data
          });
        }
      },
      fail: (res) => {
        console.log('fail', res);
      }
    });
  },
  /**
   * 格式化日期时间
   * @param date 时间戳或字符串日期
   * @param fmt 格式化类型如：yyyy-MM-dd hh:mm:ss
   * @returns 返回格式化后的日期字符串
   */
  fmtDate(date, fmt) {
    fmt = fmt ? fmt : 'yyyy-MM-dd hh:mm:ss';
    let browserType = '',
      ua = '';
    if (window && window.navigator) {
      ua = window.navigator.userAgent || window.navigator.appVersion;
    }
    if (/Edge|(rv:11\.0)|MSIE/.test(ua)) {
      browserType = 'IE'
    } else if (ua.toLocaleLowerCase().indexOf('safari') > -1) {
      browserType = 'safari'
    }
    if (String(date).length == 10 || String(date).length == 13) {
      if (String(date).length == 10) {
        date = new Date(Number(date) * 1000)
      } else {
        date = new Date(Number(date))
      }
    } else {
      if (ua && browserType == 'safari') {
        date = new Date(date.substr(0, 10) + 'T' + date.substr(11, 8))
      }
    }

    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
    } else {

    }
    return fmt.substring(0, 16)
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    /** 检测是否登录或认证了 **/
    // app.globalData.checkIsLogin(app.globalData.personInfo.id);
    this.getList();
    //test
    // this.setData({
    //   cardData: [{
    //     author: "徐一颖",
    //     card: "310111111111111111",
    //     community_id: null,
    //     contact: "13120534568",
    //     create_time: "1534143588815",
    //     end_time: "1535688000000",
    //     enroll_number: "",
    //     enroll_time: "1534143953519",
    //     id: 57,
    //     image: "appointmentfile/5b712d3424d00__!201806260711511285.jpg",
    //     introduction: '<p class="ql-align-center"><span style="color: rgb(51, 204, 255);">热烈的夏天伴随大家对羽毛球高涨的兴趣，最新一期的「泰达新市民飞羽羽毛球社团」 夏日训练场 如期而至，准备好你最夯的夏日行头在泰达人气火爆的大热球场大扣杀~</span></p><p class="ql-align-center"><span style="color: rgb(51, 204, 255);">据说夏天和羽毛球更配哦~</span></p><p class="ql-align-center"><img src="http://shetuan.tedaxsm.com/res/act/201806260711511285.jpg" height="220" width="350"></p><p class="ql-align-center"><span style="color: rgb(51, 204, 255);">羽毛球运动是所有运动中排汗效果最好的运动！羽毛球馆处于80%封闭状态，可以用”运动中的桑拿馆“来形容！静态桑拿都可以让你通体舒畅，运动中的桑拿呢？从球馆出来，半斤汗水，绝不为过！其次：夏天高温环境下，人体毛孔极为活跃，稍微运动，毛孔即处于张开排汗状态。因此，夏季是最适合排毒减肥的季节！</span></p><p class="ql-align-center"><img src="http://shetuan.tedaxsm.com/res/act/201806260716247902.jpg" height="240" width="350"></p><p class="ql-align-center"><span style="color: rgb(255, 0, 0);">重点是我们所有的活动全程免费！无需任何费用~</span></p><p><br></p>',
    //     is_show: 2,
    //     name: "泰达新市民社团邀您体验狂热夏日羽毛球~",
    //     number: "20",
    //     organization: "羽毛球社",
    //     phone: "13661477062",
    //     place: "天津经济技术开发区奥运路19号泰达时尚天街",
    //     score: "2",
    //     sign_number: "",
    //     sign_status: 2,
    //     start_time: "1535644800000",
    //     username: "xxx",
    //     time: '2018-08-31'
    //   }]
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