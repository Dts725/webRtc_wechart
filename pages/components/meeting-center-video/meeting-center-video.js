// pages/components/meeting-center-video/meeting-center-video.js
const AgoraMiniappSDK = require('../../../utils/mini-app-sdk-production.js');
// // 测试


// 江川项目
// const APPID = 'cdfad6ea2173410c9c36f1df1e9c6d72';



const app = getApp();
// const APPID = 'a247df868d144f6dbe956114b4a242d4';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    upperChild: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    videoSrc: '../../../static/liveVideo/icon01.png',
    videoSrc_01: '../../../static/liveVideo/icon01.png',
    audioSrc: '../../../static/liveVideo/icon02.png',
    audioSrc_01: '../../../static/liveVideo/icon02.png',
    coverSrc: '../../../static/images/full.png', //全屏
    fullScreenFlag: false,
    srcPointId: '',
    srcPoint_02_id: '',
    urlRtc: '',
    srcHost: '',
    srcPoint: '',
    flag: true,
    count: 0,
    videoIs: true, //视频显示区域
    APPID: 'a247df868d144f6dbe956114b4a242d4',
    firstFlag: true,
    userId: [],
    client: ""

  },

  attached() {
    this.data.client = new AgoraMiniappSDK.Client();

    console.log("进入组建初始化实例", this.data.client)

    // 在组件实例进入页面节点树时执行
    // this._startPlaying(this.data.meeting_id, this.data.user_id)
    // this.orderRemote()
    // this.orderRemote()

  },

  detached() {
    // this.unpublish()
    // this.data.client.leave()
    // this.data.client.destroy()
    console.log("组建")
    this.destroyFn()
  },



  /**
   * 组件的方法列表
   * 内部私有方法建议以下划线开头
   * triggerEvent 用于触发事件, {}中的内容为返回的对象
   */
  methods: {

    destroyFn() {
      this.data.client.leave()
      this.data.client.destroy()
    },

    // 停止订阅
    unsubscribeFn(arr) {
      console.log("取消订阅", arr)
      arr.map(res => {
        this.data.client.unsubscribe(res.id)

      })
    },
    // 停止订阅远端音视频
    /**
     * 
     *  audio：远端用户发送的音频流，即声音   video：远端用户发送的视频流，即视频画面  all：远端用户发送的音视频流，即声音和视频画面
     * 
     * */
    //  停止订阅远端视频
    muteVideo(tap, uid) {
      this.data.client.mute(uid, 'video', el => {
        this.liveStatusImg(tap, 1)
      });
    },

    // 继续订阅远端视频
    unmuteVideo(tap, uid) {
      this.data.client.unmute(uid, 'video', el => {
        this.liveStatusImg(tap, 0)

      })
    },

    // 停止订阅音频
    muteAudio(tap, uid) {
      console.log('测试停止播放', tap, uid )

      this.data.client.mute(uid, 'audio', el => {
        this.liveStatusImg(tap, 3)

      });
    },
    // 继续订阅音频
    unmuteAudio(tap, uid) {
      this.data.client.mute(uid, 'audio', el => {
        this.liveStatusImg(tap,2)

      });
    },


    // 维护状态事件
    changeStatus(e) {
      let tap = e.currentTarget.dataset.type.split(',');
      let status = this.statusFn(tap)
      let uid = this.uidFn(tap[2])
   

      switch (status) {
        // 视频播放中
        case 1:
          {
            this.muteVideo(tap[1], uid);
            break;
          }
          // 视频暂停中
        case 2:
          {
            this.unmuteVideo(tap[1], uid);
            break;
          }
          // 音频播放中
        case 3:
          {

            this.muteAudio(tap[1], uid);
            break;
          }
          // 音频暂停中
        case 4:
          {
            this.unmuteAudio(tap[1], uid);
            break;
          }
        default:
          {
            break;
          }
      }
    },

    // 判断当前按钮状态
    statusFn(tap) {
      // 是否视频 或者音频
      let tmp = tap[1]
      if (tap[0] === 'video') {
        if (this.data[tmp] === '../../../static/liveVideo/icon01.png') {
          // 状态:视频接收中
          return 1
        } else {
          // 状态: 视频暂停中
          return 2
        }
      } else {
        if (this.data[tmp] === '../../../static/liveVideo/icon02.png') {
          // 状态: 音频接收中
          return 3
        } else {
          // 状态 : 音频暂停中
          return 4
        }
      }

    },

    // 判断当前uid
    uidFn(tap) {
      if(tap == 1) {
        return this.data.srcPointId
      } else {
        return this.data.srcPoint_02_id
      }
    },
    //直播订阅按钮处理
    liveStatusImg(tap, index) {
      let src = [
        '../../../static/liveVideo/icon01.png',
        '../../../static/liveVideo/icon01-1.png',
        '../../../static/liveVideo/icon02.png',
        '../../../static/liveVideo/icon02-1.png',
      ];
      let del = src[index];
      this.setData({
        [tap]:del
      })
    },


    // 重连
    rejoinFn(room, uid, uids) {

      console.log(room, uid, uids)
      uids.map((el, index) => {
        _rejoin(room, uid, el.id)
      })

      function _rejoin(room, uid, uids) {
        this.data.client.rejoin(null, room, uid, uids, res => {
          // 重新订阅
          this.data.client.on("stream-added", e => {

            let uid = e.uid;
            console.count('订阅地址远端01', e)

            // 拉流

            if (index === 0) {
              this.data.client.subscribe(uid, (url) => {
                this.setData({
                  flag: true,
                  srcPoint: url,
                })

              })
            }

            if (index === 1) {
              this.data.client.subscribe(uid, (url) => {
                this.setData({
                  flag: true,
                  srcPoint_02: url,
                })

              })
            }



          }, err => {
            console.log('订阅错误', err)
          })
        })
      }
    },

    // 订阅远端视频流
    orderRemote(lis) {
      console.log('未订阅远端', lis)
      let ls = lis
      try {

        for (let i = 0; i < ls.length; i++) {
          console.log('当前状态', ls[i], app.globalData.compere_id)

          if (ls[i] == app.globalData.compere_id && app.globalData.compere_id != app.globalData.personInfo.id) {
            console.log('顶阅远端try', ls, ls[i])
            console.log("进入组建调用实例", this.data.client.subscribe)
            this.setData({
              srcPointId: ls[i]
            })
            this.subscribeFn(
              (url) => {
                this.setData({
                  flag: true,
                  srcPoint: url,
                })
              }, ls[i], this)

          }

          if (ls[i] !== app.globalData.compere_id) {
            console.log('顶阅远端非主持人', ls[i], app.globalData.compere_id)
            this.setData({
              srcPoint_02_id: ls[i]
            })
            this.subscribeFn(
              url => {
                this.setData({
                  flag: true,
                  srcPoint_02: url,
                })
              }, ls[i], this)

          }
        }



      } catch (err) {


        console.log("首次订阅报错", err)

      }
      // 拉流



    },

    subscribeFn(callback, uid, _this) {
      console.log("报错data", _this.data.count)
      console.time("测试try时间")


      if (_this.data.upperChild.indexOf(uid) === -1) return true;
      _this.data.count++;

      _this.data.client.subscribe(uid, (url) => {
        console.log('订阅远端try成功', url)
        _this.data.count = 0

        // 传值执行代码块
        if (!url) url = "1";
        callback(url)

      }, err => {
        console.timeEnd("测试try时间")

        console.log("位置网络错误", err, _this.data.count)

        if (_this.data.count < 4) {

          if (err.code == 903) {
            console.log("网路差尝试恢复连接", uid)
            this.subscribeFn(callback, uid, _this)
          } else {
            console.log('报错尝试恢复', uid, err)

          }
        }
        console.timeEnd("测试try时间")


      })
      console.timeEnd("测试try时间")

    },
    // 停止推流

    unPublish() {
      // this.data.client.unpublish();
      this.setData({
        urlRtc: "",
        flag: true
      })
    },
    publish() {
      this.data.client.publish(url => {
        console.log("推送版本url", url)
        this.setData({
          flag: false,
          urlRtc: url,
        })
      })
    },

    // 关闭显示区域
    closeVideo() {
      this.setData({
        videoIs: false

      })
    },




    _fullScreenFn(e) {

      let _this = this;
      let id = e.currentTarget.dataset.id
      let ctx = ''

      console.log('非ID', id)

      if (id === 'player') {
        ctx = wx.createLivePlayerContext(id, this)

      } else {
        //  ctx = wx.createLivePusherContext(id, this)
        ctx = wx.createLivePlayerContext(id, this)

      }
      if (_this.data.fullScreenFlag) {
        // 非全屏状态
        console.log('非全屏状态')

        ctx.exitFullScreen({
          success: res => {

          },
          complete: res => {
            _this.setData({
              fullScreenFlag: false,
              corverSrc: '../../../static/images/full.png'
            })
          }
        })

      } else {

        // 全屏状态

        console.log('全屏状态')
        ctx.requestFullScreen({
          direction: 90,
          success: res => {

          },
          fail: res => {
            console.log(res)

          },
          complete: res => {
            _this.setData({
              fullScreenFlag: true,
              corverSrc: '../../../static/images/full.png'
            })
          }

        })
      }



    },

    /* 查看详情 */
    _startPlaying(room, uid) {
      // 初始化客户端

      this.data.client.init(this.data.APPID, res => {

        console.log('初始化客户端成功', room, uid)

        // 创建视频流 chancl roomid uid
        this.data.client.join(null, room, uid, ovt => {
          console.log('加入房间成功', ovt)

        })
      })

    },

  }
})