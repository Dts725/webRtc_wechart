// partyGroupService.js
var sliderWidth = 99; // 需要设置slider的宽度，用于计算中间位置
let dateformat = require('../../utils/dateformat.js');
const app = getApp();
let YY = new Date().getFullYear(),
  MM = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1),
  DD = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    url: app.globalData.url,
    uid: "0",
    //选项卡
    //tabs: ["活动报名", "场地预约", "参观预约"],
     tabs: ["活动报名"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    //活动报名
    cardDataActive: [],
    status: 1,
    isAdmin: false,
    /* 场地预约 */
    // 预约场地
    indexF: 0,
    field: [],
    aptData: { //保存预约的数据
      uid: '',
      moment: '', //时间段
      field_id: 8, //场地id
      day: `${YY}-${MM}-${DD}`, //预约日期
      start_day: '4',
      end_day: '4',
      people: '', //活动人数
      title: "", //活动用途
      name: "", //联系人  
      phone: '', //联系电话
      code: "" //验证码
    },
    day: '',
    dayStart: `${YY}-${MM}-${DD}`, //预约日期--开始
    dayEnd: (MM + 1 > 12) ? `${YY + 1}-${1}-${DD}` : `${YY}-${MM + 1}-${DD}`, //预约日期--结束
    // 单次预约信息
    timer: 45, //倒计时用的
    codeTitle: '验证码',
    codeDisabled: false,
    isHide: false, //隐藏code
    //上次预约的
    canApt: false, //是否可预约
    canClick: false,
    timeList: [{
      id: "1",
      time: "08:30-09:30"
    },
      {
        id: "2",
        time: "09:30-10:30"
      },
      {
        id: "3",
        time: "10:30-11:30"
      },
      {
        id: "4",
        time: "13:30-14:30"
      },
      {
        id: "5",
        time: "14:30-15:30"
      },
      {
        id: "6",
        time: "15:30-16:30"
      }
    ],
    readyProject: [
      "瓷杯",
      "纸杯",
      "矿泉水",
      "席卡",
      "演讲台",
      "话筒",
      "主席台",
      "投影仪",
      "政务网",
      "互联网"
    ]
  },

  /**
   * medthod
   */
  //选项卡
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  //查看详情
  detailEvent(e) {
    wx.navigateTo({
      url: '../../pages/partyGroupService/partyGroupServiceInfo?id=' + e.detail.con.id + '&status=' + e.detail.con.status
    })
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
    if (e.detail && e.detail.con) {
      is_sign = e.detail.con.is_sign;
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
        type: 4,
        moudle: 2,
        uid: app.globalData.personInfo.id,
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
                that.getFieldList1('admin/active/active_list?uid=' + app.globalData.personInfo.id + '&type=&is_show=true&page=' + _this.data.page);
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
  /** 二维码按钮 */
  customEvent(e) {
    wx.navigateTo({
      url: '../../pages/qrCode/qrCode?id=' + e.detail.con.id
    })
  },
  // 获取预约场地列表
  getFieldList() {
    let this_ = this;
    wx.request({
      url: this.data.url + 'admin/field/field_list?page=1',
      success: (res) => {
        if (res.data.code == 0) {
          wx.hideLoading();
          if (res.data.data.data.length <= 0) {
            wx.showToast({
              title: '已经到底了~~',
              icon: 'none',
              duration: 2000
            });
            return false;
          }

          this_.setData({
            field: res.data.data.data,
            'aptData.field_id': res.data.data.data[0].id
          });
        }
        this.ajax(this.data.url + 'admin/appointment/appointment_day?field_id=' + this.data.aptData.field_id + '&day=' + this.data.aptData.day + '&uid=' + app.globalData.personInfo.id, this.getCanntTime);
      },
      fail: (res) => {
        console.log('fail', res);
      }
    });
  },
  //获取活动报名列表
  getFieldList1(url) {
    let this_ = this;
    wx.request({
      url: this.data.url + url,
      success: (res) => {
        if (res.data.code == 0) {
          wx.hideLoading();
          let newData = res.data.data.data,
            date = new Date().getTime(),
            time = [];
          newData.forEach(element => {
            if (element.end_time) {
              element.time = dateformat.dateformat.format(new Date(Number(element.start_time) * 1000), 'yyyy-MM-dd hh:mm') + '-' + dateformat.dateformat.format(new Date(Number(element.end_time * 1000)), 'yyyy-MM-dd hh:mm');
            } else {
              element.time = dateformat.dateformat.format(new Date(Number(element.start_time) * 1000), 'yyyy-MM-dd hh:mm');
            }
            if (element.limit == element.sign && !element.is_sign) {
              element.is_sign = 2;
            }
            if (element.active_type == 2) {
              element.image = '../../../static/default.jpg';
            }
          });
          if (this_.data.page == 1) {
            this_.setData({
              cardDataActive: newData,
            });
          } else {
            let addData = this_.data.cardDataActive.concat(newData);
            this_.setData({
              cardDataActive: addData,
            })
          }
        }
      },
      fail: (res) => {
        console.log('fail', res);
      }
    });
  },

  /** 判断是否为管理员 */
  isAdmin() {
    // 判断是否为管理员 authority>1 为管理员
    if (app.globalData.personInfo && app.globalData.personInfo.authority && Number(app.globalData.personInfo.authority) > 1) {
      return true;
    } else {
      return false;
    }
  },
  /** 
   *-- -- -- -- -- 场地预约 -- -- -- -- --
   */
  // 选择预约场地
  bindFieldChange(e) {
    let id = this.data.field[e.detail.value].id;
    this.setData({
      indexF: e.detail.value
    });
    this.data.aptData.moment = '';
    this.data.aptData.field_id = id;
    // 获取已被预约的
    this.ajax(this.data.url + 'admin/appointment/appointment_day?field_id=' + this.data.aptData.field_id + '&day=' + this.data.aptData.day + '&uid=' + app.globalData.personInfo.id, this.getCanntTime);
    setTimeout(() => {
      // this.checkCanApt();
      app.globalData.checkRegister(app.globalData.personInfo.if_register)
    }, 100);
  },
  // 选择预约日期
  bindDayChange(e) {
    // this.data.aptData.day = e.detail.value;
    this.setData({
      day: e.detail.value,
      'aptData.day': e.detail.value
    });
    this.data.aptData.moment = '';
    // 获取已被预约的
    if (new Date(e.detail.value).getDay() == 0 || new Date(e.detail.value).getDay() == 6) {
      this.message('非工作日不可预约')
    }
    this.ajax(this.data.url + 'admin/appointment/appointment_day?field_id=' + this.data.aptData.field_id + '&day=' + this.data.aptData.day + '&uid=' + app.globalData.personInfo.id, this.getCanntTime);
    setTimeout(() => {
      // this.checkCanApt();
      app.globalData.checkRegister(app.globalData.personInfo.if_register)
    }, 100);
  },
  // 预约时间段
  checkboxChange(e) {
    this.data.aptData.moment = e.detail.value;
    if (e.detail.value.length != 0)
      this.setData({
        'aptData.moment': e.detail.value,
        'aptData.start_day': e.detail.value[0],
        'aptData.end_day': e.detail.value[e.detail.value.length - 1]
      });
  },

  /** 获取验证码 */
  getCode() {
    let _this = this;
    let username = this.data.aptData.name,
      phone = this.data.aptData.phone;

    if (phone == '' || !/[1][2,3,4,5,7,8][0-9]{9}/.test(phone)) {
      return
    }

    this.timeDown();
    wx.request({
      url: this.data.url + 'sms/send?phone=' + phone,
      method: 'get',
      data: {
        phone: this.data.aptData.phone
      },
      success: (res) => {
        if (res.statusCode == 200) {
          _this.message('验证码发送成功！！！');
        }
      },
      fail: (res) => {
        console.log('fail', res);
      }
    });
    let me = this
    let timer = setInterval(function () {
      if (me.data.timer > 0) {
        me.timeDown()
      } else {
        me.setData({
          timer: 60,
          codeTitle: '验证码',
          codeDisabled: false
        })
        clearInterval(timer)
      }
    }, 1000)
    this.setData({
      codeDisabled: true
    });

  },
  //验证码倒计时
  timeDown() {
    let index = --this.data.timer
    this.setData({
      timer: index,
      codeTitle: '(' + index + ')秒'
    });
  },
  /** 确定预约 */
  submitApt() {
    app.globalData.checkRegister(app.globalData.personInfo.if_register)
    let _this = this;
    //未检测到用户
    if (app.globalData.personInfo.if_register == 2) {
      return;
    }
    if (this.data.deviceType == 'iphone') {
      this.data.aptData.day = this.data.aptData.day.replace(/\-/g, '/');
    }
    if (!this.data.aptData.field_id) {
      this.message('请选择预约场地！！！');
      return false;
    }
    if (this.data.aptData.moment != "") {
      if (new Date(this.data.aptData.day).getTime() < new Date().getTime() && Number(this.data.aptData.moment[0]) + 6 < new Date().getHours() + 2) {
        this.message('开始时间至少大于现在两个小时 ！！！');
        return false;
      }

      //数组排序
      let momentTmp = this.sortarr(this.data.aptData.moment);
      //如果是连续的则保存时间段
      if (this.isContinuity(momentTmp) == 'no') {
        this.message('请选择连续的时间段 ！！！');
        return false;
      }
    } else {
      this.message('请选择预约时间 ！！！');
      return false;
    }

    if (!this.data.aptData.people) {
      this.message('请填写活动人数 ！！！');
      return false;
    }

    if (isNaN(this.data.aptData.people)) {
      this.message('人数应该为数字 ！！！');
      return false;
    }

    if (!this.data.aptData.title) {
      this.message('请填写活动用途 ！！！');
      return false;
    }

    if (!this.data.aptData.name) {
      this.message('请填写联系人 ！！！');
      return false;
    }

    this.data.aptData.uid = this.data.uid;
    console.log('_this.data.aptData::::::', _this.data.aptData);
    wx.showModal({
      title: '预约',
      content: '您确定预约吗？',
      success: function (e) {
        if (e.confirm !== true) {
          return false;
        }
        let mhd = 'POST',
          url = _this.data.url + 'admin/appointment/appointment_confirm';
        delete _this.data.aptData.moment;
        // if (_this.data.aptData.id) {
        //   mhd = 'PUT';
        //   url = _this.data.url + 'appointment/' + _this.data.aptData.id;
        //   delete _this.data.aptData.id;
        //   delete _this.data.aptData.code;
        // }

        wx.request({
          url: url,
          method: mhd,
          data: _this.data.aptData,
          success: (res) => {
            if (res.data.code == 0) {
              _this.message('恭喜您预约成功', 'success');
              _this.setData({
                aptData: { day: `${YY}-${MM}-${DD}` },
                field: _this.data.field,
                'aptData.field_id': _this.data.field[0].id
              })
              _this.getFieldList();
            } else {
              wx.showToast({
                title: res.data.status,
                icon: 'none',
                duration: 1000
              });
            }
          },
          fail: (res) => {
            console.log('预约失败:', res);
          },
        });
      }
    });
  },
  /** 获取已被预约的时间段,并设置可选时间段 **/
  getCanntTime(res) {
    let this_ = this;
    if (res.data.data.length > 0) {
      let data = [];
      res.data.data.forEach((element, i) => {
        let day = new Date(element.day).getDay();
        if (day == 6 || day == 0 && element.day == this_.data.aptData.day) {
          data = data.concat(i + 1);
        }
        if (element.day == this_.data.aptData.day && element.status != 1) {
          data = data.concat(i + 1);
        }
      });
      if (data.length > 0) {
        this.setCanntCheck(data);
      } else {
        this.setCanntCheck([]);
      }
    }
  },
  /** 将已被预约的设置为不可选状态 **/
  setCanntCheck(arr) {
    let lis = this.data.timeList;
    for (let j = 0; j < lis.length; j++) {
      lis[j].checked = false;
      lis[j].disabled = false;
      for (let i = 0; i < arr.length; i++) {
        if (Number(arr[i]) == lis[j].id) {
          lis[j].disabled = true;
        }
      }
    }
    this.setData({
      timeList: lis
    });
  },
  /** ajax请求 */
  ajax(url, data, callback) {
    let type = 'GET';
    if (typeof data == 'object') {
      type = 'POST';
    } else if (typeof data == 'function') {
      callback = data;
    }
    wx.request({
      url: url,
      method: type,
      data: data,
      success: (res) => {
        // if (res.data.code == 0) {
        //   this.setData({
        //     team: res.data.data
        //   });
        // }
        if (res) {
          if (callback) {
            return callback(res);
          }
        } else {
          alert('未找到结果：' + res);
        }
      },
      fail: (res) => {
        console.log('fail', res);
      }
    });
  },

  /** 检测姓名 */
  checkName(con) {
    con = con.detail ? con.detail.value : con;
    if (!con) {
      wx.showToast({
        // title: '请输入预约人姓名 ！！！',
        title: '请输入联系人 ！！！',
        icon: 'none',
        duration: 1000
      });
      this.data.canApt = false;
      return false;
    } else {
      this.data.aptData.username = con;
      this.data.canApt = true;
    }
  },

  /** 设置联系人 */
  setName(con) {

    con = con.detail ? con.detail.value : con;


    if (!con) {
      return
    } else {
      this.data.aptData.username = con;

      this.data.canApt = true;
    }
  },

  /** 设置手机号 */
  setPhone(con) {

    con = con.detail ? con.detail.value : con;


    if (!con) {
      return
    } else {

      this.data.aptData.phone = con;

      this.data.canApt = true;
    }
  },
  /** 检测验证码 */
  checkCode(con) {
    con = con.detail ? con.detail.value : con;
    if (!con) {
      wx.showToast({
        title: '请输入验证码 ！！！',
        icon: 'none',
        duration: 1000
      });
      this.data.canApt = false;
      return false;
    } else {
      this.data.aptData.code = con;
      this.data.canApt = true;
    }
  },
  /** 冒泡排序 **/
  sortarr(arr) {
    // if(arr.lenght == 1){
    //   return arr;
    // }
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (Number(arr[j]) > Number(arr[j + 1])) {
          var temp = Number(arr[j]);
          arr[j] = Number(arr[j + 1]);
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  },
  /** 判断是否连续 **/
  isContinuity(arr) {
    var res = 'yes';
    for (let j = 0; j < arr.length; j++) {
      if (arr[j + 1] - arr[j] > 1) {
        res = 'no';
      }
    }
    return res;
  },
  //字段合法检测
  detect(e) {
    //同步绑定input数据到aptData
    switch (e.currentTarget.id) {
      case 'people':
        {
          this.setData({
            'aptData.people': e.detail.value
          });
          break;
        }
      case 'title':
        {
          this.setData({
            'aptData.title': e.detail.value
          });
          break;
        }
      case 'name':
        {
          this.setData({
            'aptData.name': e.detail.value
          });
          break;
        }
      case 'phone':
        {
          this.setData({
            'aptData.phone': e.detail.value
          });
          break;
        }
      case 'code':
        {
          this.setData({
            'aptData.code': e.detail.value
          });
          break;
        }
    }

    // 活动人数
    if (this.data.aptData.people == '' && e.currentTarget.id == 'people')
      this.message('请输入活动人数 ！！！');
    else if (!/^\d*$/.test(this.data.aptData.people) && e.currentTarget.id == 'people')
      this.message('活动人数请输入数字 ！！！');

    //活动用途
    if (this.data.aptData.title == '' && e.currentTarget.id == 'title')
      this.message('请输入活动用途 ！！！');

    //联系人
    if (this.data.aptData.name == '' && e.currentTarget.id == 'name')
      this.message('请输入联系人 ！！！');

    //预约电话
    if (this.data.aptData.phone == '' && e.currentTarget.id == 'phone')
      this.message('请输入预约电话 ！！！');
    else if (!/[1][2,3,4,5,7,8][0-9]{9}/.test(this.data.aptData.phone) && e.currentTarget.id == 'phone')
      this.message('请输入正确的手机号 ！！！');

    //验证码
    if (this.data.aptData.code == '' && e.currentTarget.id == 'code')
      this.message('请输入验证码 ！！！');
  },
  //信息提示
  message(msg, icon = 'none', duration = 1000) {
    wx.showToast({
      title: msg,
      icon: icon,
      duration: duration
    });
  },
  //图片点击事件
  // imgYu(event) {
  //   console.log(event.currentTarget.dataset.src)
  //   var src = event.currentTarget.dataset.src;//获取data-src
  //   var imgList = event.currentTarget.dataset.src;//获取data-list
  //   // 图片预览
  //   wx.previewImage({
  //     // current: '../../ static / test.jpg', // 当前显示图片的http链接
  //     urls: ["../../static/test.jpg"], // 需要预览的图片http链接列表
  //   })
  // },
  //上拉加载
  // getNextPage() {
  //   console.log(11111111111)
  //   this.setData({
  //     page: this.data.page + 1
  //   });
  //   this.getFieldList1('admin/active/active_list?uid=' + app.globalData.personInfo.id + '&type=&is_show=true&page=' + this.data.page);
  // },
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
    // this.reLogin();
    app.globalData.checkRegister(app.globalData.personInfo.if_register)
    this.getFieldList();
    this.getFieldList1('admin/active/active_list?uid=' + app.globalData.personInfo.id + '&type=&is_show=true');

    // 判断是否为管理员
    this.setData({
      isAdmin: this.isAdmin() ? true : false
    });
    console.log('this.data.isAdmin:::::', this.data.isAdmin);
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
    if (this.data.activeIndex == 0){
      this.getFieldList1('admin/active/active_list?uid=' + app.globalData.personInfo.id + '&type=&is_show=true');
    }
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.activeIndex == 0) {
      this.setData({
        page: this.data.page + 1
      });
      this.getFieldList1('admin/active/active_list?uid=' + app.globalData.personInfo.id + '&type=&is_show=true&page=' + this.data.page);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})