// pages/register/register.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    textCode: '获取验证码',
    countDown: 60,
    parties: ['其他'],
    isDisabled:true,
    personInfo: {},
    //发送请求所传数据
    field: {
      username: '',
      card: '',
      phone: '',
      code: '',
      openid: '',
      party:'',
      photo: '' // 发送后台的头像
    },
    showPhoto: '', // 拍照后显示的头像
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },


  onShow() {
    let me = this;
    setTimeout(function () {
      me.setData({
        personInfo: app.globalData.personInfo
      })
    }, 300)
  },

  /**
   * 拍照
   */
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      // sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          showPhoto: res.tempFilePaths[0]
        });

        wx.uploadFile({
          url: app.globalData.url + 'file/upload',
          filePath: res.tempFilePaths[0],
          name: 'file',
          success: function (res) {
            let dat = JSON.parse(res.data);
            if (dat && dat.code == 0) {
              that.setData({
                'field.photo': dat.data.store_result
              })
            }
          }
        })
      }
    })
  },

  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },


  //绑定用户信息提交表单
  bundleInfo() {
    let openid = this.data.personInfo.openid

    this.data.field.openid = openid;
    let data = this.data.field


    let tip = null
    for (let key in data) {
      if (data.username == '') {
        tip = '姓名不能为空'
        break
      }
      if (data.party == '') {
        tip = '请选择党组织'
        break
      }
      if (data.psd == '') {
        tip = '密码不能为空'
        break
      }
      if (data.phone == '') {
        tip = '手机号不能为空'
        break
      }
      if (data.code == '') {
        tip = '验证码不能为空'
        break
      }
      // if (data.photo == '') {
      //   tip = '请拍摄头像'
      //   break
      // }
    }
    var is_partymember;
    if (this.data.parties[this.data.index]){
      if (this.data.parties[this.data.index] === '其他'){
        is_partymember = 2
      }else{
        is_partymember = 1
      }
    }
    if (!tip) {
      let data = {
        code: this.data.field.code,
        name: this.data.field.username,
        password: this.data.field.psd,
        phone: this.data.field.phone,
        openid: openid,
        wx_nickname: app.globalData.userInfo.nickName,
        is_partymember: is_partymember,
        sex: app.globalData.userInfo.gender
      };

      wx.request({
        url: app.globalData.url + 'user/register',
        method: 'POST',
        data: data,
        success: function (response) {
          console.log(response)
          if (response.data.code == 0) {
             app.getPersonInfo()
             wx.showToast({
              title: '注册成功',
              icon: 'success',
              duration: 1500
            });
            wx.switchTab({
              url: '../../pages/personalCenter/personalCenter'
            });
          }else{
            wx.showToast({
              title: response.data.status,
              icon: 'none',
              duration: 1500
            });
          }
          
        }

      })
    } else {
      wx.showToast({
        title: tip,
        icon: 'none',
        duration: 1500
      });
    }
  },

  //获取验证码
  getValidateCode() {

    let reg = new RegExp("[1][2,3,4,5,7,8][0-9]{9}", 'g')
    let phone = this.data.field.phone

    if (reg.test(phone)) {


      this.setData({
        textCode: '获取成功'
      })
      this.downNum()
      let me = this
      let timer = setInterval(function () {
        if (me.data.countDown > 0) {
          me.downNum()
        } else {
          me.setData({
            textCode: '获取验证码'
          })
          me.setData({
            countDown: 60
          })
          clearInterval(timer)
        }
      }, 1000)


      wx.request({
        url: app.globalData.url + 'sms/send?phone=' + phone,
        method: 'get',
        success: function (res) {
          wx.showToast({
            title: '已发送',
            icon: 'success',
            duration: 1500
          });

        }
      })
    } else {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1500
      });
    }



    console.log(reg.test(phone))

  },


  //验证码倒计时
  downNum() {
    let index = --this.data.countDown
    this.setData({
      countDown: index
    })

  },


  getUserName(e) {
    this.data.field.username = e.detail.value
    var that = this;
    wx.request({
      url: app.globalData.url + 'check_in_organization?name=' + e.detail.value,
      method: 'GET',
      success: function (response) {
          let arr =[]
          if(response.data.data.length !== 0){
            response.data.data.map(function(item){
              arr.push(item.org_name)
            })
            arr = arr.concat(['其他'])
            that.setData({
              parties: arr,
              isDisabled: false,
            })
          }else{
            if(e.detail.value){
              that.setData({
                parties: ['其他'],
                isDisabled: false,
              })
            }else{
              that.setData({
                isDisabled: true,
                parties: []
              })
            }
          }
         
      }
    })
  },
  // 党组织
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    this.data.field.party = e.detail.value
    this.setData({
      index: e.detail.value
    })
  },

  getCard(e) {

    let value = e.detail.value

    let reg = new RegExp('[0-9]{17}[x,X,0-9]{1}')

    if (!reg.test(value)) {
      wx.showToast({
        title: '请输入正确的身份证号',
        icon: 'none',
        duration: 1500
      });
    }

    this.data.field.card = e.detail.value

  },

  getPsd(e) {
    let value = e.detail.value

    if (value == '') {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 1500
      });
    }

    this.data.field.psd = e.detail.value

  },
  getPhone(e) {
    this.data.field.phone = e.detail.value

  },
  getCode(e) {
    this.data.field.code = e.detail.value
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  }
})