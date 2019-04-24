// pages/repairInfo/repairInfo.js
let dateformat = require('../../utils/dateformat.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [], //图片列表
    // 所有信息
    personInfo: {},
    gender: '',

    url: app.globalData.fileUrl,


    // 证件部分的
    cards: {
      cardFront: '',
      cardBack: '',
      cardDegree: '',
    },

    whichRoute: '',
    /** 模拟数据 */
    business: [],
    infos: []
  },

  onLoad: function (option) {

    this.setData({
      whichRoute: option
    })
  },

  /** 通过身份证号获取性别 */
  // getGender(con) {
  //   let gender = '',
  //     num = '';
  //   if (con.length == 18) {
  //     num = Number(con.charAt(con.length - 2));
  //     console.log(num)
  //   } else {
  //     num = Number(con.charAt(con.length - 4));
  //     console.log(num)
  //   }
  //   if (num % 2 == 0) {
  //     gender = '女';
  //   } else {
  //     gender = '男';
  //   }
  //   console.log(gender)
  //   return gender;
  // },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      business: []
    });
    let id;
    if (id = wx.getStorageSync('key')) {
      wx.removeStorageSync('key')

    } else {

      id = app.globalData.personInfo.id
    }
    let me = this,
      _this = this;
    wx.request({
      // url: app.globalData.url + `user/${id}`,
      url: app.globalData.url + `user/info?id=${id}`,
      method: 'GET',
      success: function (res) {
        if (res.data.code === 0) {
          // app.globalData.personInfo = res.data.data
          let info = res.data.data
          me.setData({
            personInfo: me.infoConvert(info),
            gender: info.sex
          })
          console.log('personInfo::::', _this.data.personInfo);
          /**************************** 模拟数据部分 ***************************** */
          // let infos = _this.data.infos;
          // for (let i in infos) {
          //   if (infos[i].name == info.username) {
          //     _this.setData({
          //       business: infos[i].infos
          //     });
          //   }
          // }

        }
      }
    })


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
    //  else if (ua) {
    //   if (browserType == 'IE') {
    //     fmt = new Date(date).toLocaleString().replace(/年|月|日/g, '-').replace(/上午|下午/g, '')
    //   } else {
    //     fmt = new Date(date).toLocaleString().replace(/\//g, '-').replace(/上午|下午/g, '')
    //   }
    // }
    return fmt
  },

  infoConvert(old) {
    if (old.political == 0) {
      old.political = ''
    } else if (old.political == 1) {
      old.political = '党员'
    } else if (old.political == 2) {
      old.political = '团员'
    } else if (old.political == 3) {
      old.political = '其他'
    }
    if (old.marriage == 0) {
      old.marriage = ''
    } else if (old.marriage == 1) {
      old.marriage = '未婚'
    } else if (old.marriage == 2) {
      old.marriage = '已婚'
    } else if (old.marriage == 3) {
      old.marriage = '离异'
    }

    if (old.record == 0) {
      old.record = ''
    } else if (old.record == 1) {
      old.record = '小学'
    } else if (old.record == 2) {
      old.record = '初中'
    } else if (old.record == 3) {
      old.record = '高中'
    } else if (old.record == 4) {
      old.record = '专科'
    } else if (old.record == 5) {
      old.record = '本科'
    } else if (old.record == 6) {
      old.record = '硕士'
    } else if (old.record == 7) {
      old.record = '博士'
    }

    if (old.image) {
      old.image = `${app.globalData.fileUrl}/${old.image}`
    }
    for (let el in old) {
      old[el] = old[el] ? old[el] : '';
      // new Date(Number(time)).toLocaleString().replace(/\//g, '-').replace(/上午|下午/g, '')
    }
    if (old.appointment) {
      for (let pt in old.appointment) {
        old.appointment[pt].date_time = this.fmtDate(old.appointment[pt].date_time);
      }
    }
    if (old.record_array) {
      for (let ry in old.record_array) {
        old.record_array[ry].date_time = dateformat.dateformat.format(new Date(Number(old.record_array[ry].date_time)));
        old.record_array[ry].content = old.record_array[ry].content ? old.record_array[ry].content : '';
      }
    }
    if (old.birth) {
      old.birth = dateformat.dateformat.format(new Date(Number(old.birth==13?old.birth:old.birth*1000)),'yyyy-MM-dd')
    }
    return old
  },

  _previewImage(e) {
    let url = this.data.url + '/' + e.target.dataset.url
    wx.previewImage({
      urls: [url],
    })
  },
  onPullDownRefresh(){
    wx.stopPullDownRefresh()
  }

  /** 获取活动列表 */


})