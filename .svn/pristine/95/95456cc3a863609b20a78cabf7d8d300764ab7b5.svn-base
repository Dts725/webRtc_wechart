const app = getApp()
const util = require('../../utils/debounce.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    footerId: '',
    cityIndex: '',
    viewIndex: '',
    showModalStatus: false,
    modalDatas: [],
    tabs: [],
    currentItem: 0,
    selectedFlag: [false, false, false, false],
    lists: [],
    currentLists: [],
    iconImg: '../../static/images/icon.png',
    type: 'addViews',
    inputViewsContent: '',
    addCityId: '',
    addProvinceId: '',
    imgUrl: '',
    isScroll: false,
    modalType: 'modalType',
    canWidth: 0,
    canHeight: 0,
    canImages: [],
    uphidden:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.api + 'mini/add_footprint',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        openid: app.globalData.openid
      },

      success: function (res) {
        var result = res.data.data
        var tabs = [];
        var allcityNumber = [];
        // console.log(result)
        result.map(function (item) {
          tabs.push({
            province_id: item.province_id,
            province_name: item.province_name,
            province_sort: item.province_sort,
            total: 0
          })
        })
        that.setData({
          currentLists: result[0].citys,
          tabs: tabs,
          lists: result
        })
        for (var j = 0; j < that.data.lists.length; j++) {
          for (var k = 0; k < that.data.lists[j].citys.length; k++) {
            var sum = that.sum(that.data.lists[j].citys);
          }
          that.data.tabs[j].total = sum
        }
        that.setData({
          tabs: that.data.tabs
        })
      },
      error: function (error) {
        console.error(error)
      }
    })
  },

  //tab切换
  tagChoose: function (options) {
    var that = this
    var index = options.currentTarget.dataset.index;
    //设置当前样式
    that.setData({
      'currentItem': index,
      currentLists: this.data.lists[index].citys
    })

  },

  //下拉菜单
  changeToggle: function (e) {
    var index = e.currentTarget.dataset.index;

    if (this.data.selectedFlag[index]) {
      this.data.selectedFlag[index] = false;
      this.data.isScroll = false
    } else {
      this.data.selectedFlag[index] = true;
      this.data.isScroll = true
    }

    this.setData({
      selectedFlag: this.data.selectedFlag,
      isScroll: this.data.isScroll
    })
  },
  //点亮
  lightFooter: function (cityIndex, viewIndex, provinceIndex, viewsId, footerId) {
    var that = this;
    wx.showLoading({
      title: '正在点亮....',
    })
    wx.request({
      url: app.globalData.api + 'mini/tourist_footprint',
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        scenic_spots_id: viewsId,
        openid: app.globalData.openid
      },
      success: function (res) {
        wx.hideLoading()
        if (res.data.code === 0) {
          that.data.currentLists[cityIndex].views[viewIndex].tourist_footprint_id = res.data.data
          that.data.currentLists[cityIndex].total = that.data.currentLists[cityIndex].total + 1
          that.setData({
            currentLists: that.data.currentLists
          })
          var sum = that.sum(that.data.currentLists)
          that.data.tabs[provinceIndex].total = sum
          that.setData({
            tabs: that.data.tabs
          })

        } else {
          wx.showToast({
            title: res.status,
            icon: 'none',
            duration: 2000
          })
        }
      },
      error: function () {
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 2000
        })
      }
    })

  },
  //置灰
  darkFooter: function (cityIndex, viewIndex, provinceIndex, viewsId, footerId) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定取消该足迹',
      success(resp) {
        if (resp.confirm) {
          wx.request({
            url: app.globalData.api + 'mini/tourist_footprint/' + footerId,
            method: 'DELETE',
            header: {
              'content-type': 'application/json' // 默认值
            },
            data: {
              openid: app.globalData.openid
            },
            success: function (res) {
              if (res.data.code === 0) {
                that.data.currentLists[cityIndex].views[viewIndex].tourist_footprint_id = 0
                that.data.currentLists[cityIndex].total = that.data.currentLists[cityIndex].total - 1;
                that.data.currentLists[cityIndex].views[viewIndex].tourist_photos = null
                that.setData({
                  currentLists: that.data.currentLists,
                })
                var sum = that.sum(that.data.currentLists)
                that.data.tabs[provinceIndex].total = sum
                that.setData({
                  tabs: that.data.tabs
                })
              } else {
                wx.showToast({
                  title: '请求失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            },
            error: function () {
              wx.showToast({
                title: '请求失败',
                icon: 'none',
                duration: 2000
              })
            }
          })
        } else if (resp.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  //切换脚印
  toggleFooter: util.throttle(function (e) {
    var that = this;
    var cityIndex = e.currentTarget.dataset.cityindex
    var viewIndex = e.currentTarget.dataset.viewindex
    var provinceIndex = e.currentTarget.dataset.provinceindex;
    var viewsId = e.currentTarget.dataset.viewsid
    var footerId = e.currentTarget.dataset.footerid;
    if (that.data.currentLists[cityIndex].views[viewIndex].tourist_footprint_id === 0) {
      that.lightFooter(cityIndex, viewIndex, provinceIndex, viewsId, footerId)
    } else {
      that.darkFooter(cityIndex, viewIndex, provinceIndex, viewsId, footerId)
    }
  }),

  //上传图片
  uploadImage: function (e) {
    var that = this;
    this.data.cityIndex = e.currentTarget.dataset.cityindex
    this.data.viewIndex = e.currentTarget.dataset.viewindex
    var images = e.currentTarget.dataset.photos;
    this.data.footerId = e.currentTarget.dataset.footerid;
    //未上传
    if (images) {
      that.setData({
        showModalStatus: true,
        type: 'uploadImage',
        modalDatas: images.split(','),
        imgUrl: app.globalData.imageUrl,
      })

    } else {
      wx.chooseImage({
        count: 3,
        sizeType: ['compressed'],
        sourceType: ['album'],
        success(res) {
          const tempFilePaths = res.tempFilePaths;
          // that.uploadimg(tempFilePaths);
          that.getCanvasImg(0, 0, tempFilePaths);
        }
      })
    }

  },

  getCanvasImg: function (index, failNum, tempFilePaths, paramsType) {
    var that = this;
    wx.showLoading({
      title: '压缩图片中',
    })
    if (index < tempFilePaths.length) {
      const ctx = wx.createCanvasContext('attendCanvasId');
      wx.getImageInfo({
        src: tempFilePaths[index],
        success: function (res) {
          var scale = res.width / res.height
          that.setData({ //构造画板宽高
            canWidth: 300,
            canHeight: 300 / scale
          })
          ctx.drawImage(tempFilePaths[index], 0, 0, that.data.canWidth, that.data.canHeight);
            setTimeout(function(){
              ctx.draw(false, function () {
                index = index + 1;//上传成功的数量，上传成功则加1
                wx.canvasToTempFilePath({
                  canvasId: 'attendCanvasId',
                  success: function success(res) {
                    that.data.canImages.push(res.tempFilePath);
                    that.getCanvasImg(index, failNum, tempFilePaths, paramsType);
                  },
                  complete: function () {
                    if (index === tempFilePaths.length) {
                      wx.hideLoading()
                      console.log(that.data.canImages)
                      that.uploadimg(that.data.canImages, paramsType)
                    }
                  },
                  fail: function (e) {
                    console.log(e, 123)
                    failNum += 1;//失败数量，可以用来提示用户
                    // that.getCanvasImg(inedx, failNum, tempFilePaths, paramsType);
                  }
                })
              })
            },500)

        }
      })

    }
  },

  uploadimg: function (data, params) {
    var that = this,
      i = data.i ? data.i : 0,//当前上传的哪张图片
      success = data.success ? data.success : 0,//上传成功的个数
      fail = data.fail ? data.fail : 0;//上传失败的个数
      console.log(data)
      wx.uploadFile({
      url: app.globalData.api + 'file/upload',
      filePath: data[i],
      name: 'file',//这里根据自己的实际情况改
      success: (res) => {
        var result = JSON.parse(res['data'])
        if (result.code === 0) {
          that.data.imgList.push(result.data.store_result)
          success++; //图片上传成功，图片上传成功的变量+1
        }
      },
      fail: (res) => {
        fail++;//图片上传失败，图片上传失败的变量+1
      },
      complete: (res) => {
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.length) {   //当图片传完时，停止调用         
          that.uploadFile(that.data.imgList.join(','), params)
        } else {//若图片还没有传完，则继续调用函数
          console.log(i, '继续');
          wx.showLoading({
            title: '上传中',
          })

          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadimg(data, params);
        }
      }
    })
  },

  uploadFile: function (image, params) {
    var that = this;
    var arr = image.split(',')
    arr.push.apply(arr, that.data.modalDatas);
    wx.request({
      url: app.globalData.api + 'mini/tourist_footprint/' + this.data.footerId,
      method: 'PUT',
      data: {
        tourist_photos: params === that.data.modalType ? arr.join(',') : image,
        openid: app.globalData.openid
      },
      success: function (result) {
        if (result.data.code === 0) {
          wx.hideLoading()
          wx.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          })
          if (params === that.data.modalType) {
            that.data.currentLists[that.data.cityIndex].views[that.data.viewIndex].tourist_photos = arr.join(",")
            that.setData({
              modalDatas: arr,
              currentLists: that.data.currentLists,
              imgList: [],
              canImages: [],
            })
          } else {
            that.data.currentLists[that.data.cityIndex].views[that.data.viewIndex].tourist_photos = image
            that.setData({
              currentLists: that.data.currentLists,
              imgList: [],
              canImages: [],
            })
          }

        } else {
          wx.showToast({
            title: '上传失败',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  //删除景点
  deleteImage: function (e) {
    var that = this;
    var imageId = e.currentTarget.dataset.key
    this.data.modalDatas.splice(imageId, 1);
    wx.request({
      url: app.globalData.api + 'mini/tourist_footprint/' + this.data.footerId,
      method: 'PUT',
      data: {
        tourist_photos: that.data.modalDatas.length === 0 ? null : that.data.modalDatas.join(','),
        openid: app.globalData.openid
      },
      success: function (result) {
        if (result.data.code === 0) {
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
          if (that.data.modalDatas.length === 0) {
            that.data.currentLists[that.data.cityIndex].views[that.data.viewIndex].tourist_photos = null
          } else {
            that.data.currentLists[that.data.cityIndex].views[that.data.viewIndex].tourist_photos = that.data.modalDatas.join(',')
          }

          that.setData({
            currentLists: that.data.currentLists,
            modalDatas: that.data.modalDatas
          })
        } else {
          wx.showToast({
            title: '删除失败',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
  },
  //模态添加图片
  modalAddImage: function () {
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        // that.uploadimg(tempFilePaths, that.data.modalType);
        that.getCanvasImg(0, 0, tempFilePaths, that.data.modalType);
      }
    })
  },


  //添加景点
  addViews: function (e) {
    var cityId = e.currentTarget.dataset.cityid;
    var provinceId = this.data.currentItem;
    this.setData({
      showModalStatus: true,
      addCityId: cityId,
      type: 'addViews',
      addProvinceId: provinceId,
    })
  },

  //生成足迹
  createFooter: function () {
    var total = parseInt(this.sum(this.data.tabs));
    if (total === 0) {
      wx.showToast({
        title: '请选择景点',
        icon: 'success',
        duration: 2000
      })
    } else {
      wx.navigateTo({
        url: '/pages/redMap/index'
      })
    }
  },

  //模态
  update: function (e) {
    console.log(e)
    var currentStatu = e.currentTarget.dataset.statu;
    var that = this;
    if (currentStatu === 'addViews') {
      if (that.data.inputViewsContent) {
        // 添加景点
        wx.request({
          url: app.globalData.api + 'mini/scenic_spots',
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          data: {
            province_id: that.data.tabs[that.data.addProvinceId].province_id,
            city_id: that.data.addCityId,
            scenic_spots_name: that.data.inputViewsContent,
            commiter_id: app.globalData.openid,
            formId: e.detail.formId
          },
          success: function (res) {
            if (res.data.code === 0) {
              wx.showToast({
                title: '添加成功待审核',
                icon: 'success',
                duration: 2000
              })
              that.cancal()
            } else {
              wx.showToast({
                title: res.data.status,
                icon: 'success',
                duration: 2000
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '景点不能为空',
          icon: 'success',
          duration: 2000
        })
      }

    } else {
      //上传图片
      console.log('图片')
    }
  },

  cancal: function (e) {
    this.setData({
      showModalStatus: false
    })
  },
  inputviews: function (e) {
    this.setData({
      inputViewsContent: e.detail.value
    })
  },
  sum: function (currentLists) {
    var sum = 0;
    for (var i = 0; i < currentLists.length; i++) {
      sum += parseInt(currentLists[i].total)
    }
    return sum
  }


})