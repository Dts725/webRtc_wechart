// pages/components/meeting-center-video/meeting-center-video.js
const AgoraMiniappSDK = require('../../../utils/mini-app-sdk-production.js');
// 测试
// const APPID = 'a247df868d144f6dbe956114b4a242d4';
const client = new AgoraMiniappSDK.Client();

// 江川项目
const APPID = 'cdfad6ea2173410c9c36f1df1e9c6d72';
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

    coverSrc: '../../../static/images/full.png',
    fullScreenFlag: false,
    urlRtc: '',
    srcHost: '',
    srcPoint: '',
    flag: true,

    firstFlag : true,

    userId : []

  },

  attached() {
    // 在组件实例进入页面节点树时执行
    // this._startPlaying(this.data.meeting_id, this.data.user_id)
    // this.orderRemote()
    // this.orderRemote()

  },

  detached() {
    // this.unpublish()
    // client.leave()
    // client.destroy()
  },



  /**
   * 组件的方法列表
   * 内部私有方法建议以下划线开头
   * triggerEvent 用于触发事件, {}中的内容为返回的对象
   */
  methods: {

    // 停止订阅
    unsubscribe () {
      let arr = Array.from(new Set(this.data.userId))
      arr.map (res => {
        client.unsubscribe(res)

      })
    },

    // 订阅远端视频流
    orderRemote(userId, index) {
      console.log('订阅地址远端00', userId, index)

    //   // 第一次进入直接订阅
    // if(this.data.firstFlag) {
    //   client.subscribe(userId, (url) => {
    //     this.data.userId.push(userId);
    //     this.setData({
    //       flag: true,
    //       srcPoint: url,
    //     })

    //   })
    //   if (index === 1) {
    //     client.subscribe(userId, (url) => {
    //       this.setData({
    //         flag: true,
    //         srcPoint_02: url,
    //       })

    //     })
    //   }
    // }
      client.on("stream-added", e => {

        let uid = e.uid;
        console.count('订阅地址远端01', e)

        if (uid === userId) {
          // console.log('订阅地址远端02', uid, userId, index)

          // 拉流

          if (index >0) { 
            client.subscribe(uid, (url) => {
              this.setData({
                flag: true,
                srcPoint_02: url,
              })

            })
          } else {
            client.subscribe(uid, (url) => {
              this.setData({
                flag: true,
                srcPoint: url,
              })

            })
          }
        } 

  
      }, err => {
        console.log('订阅错误', err)
      })

    },

    // 取消订阅远端视频流
   

    // 手动推流
    publish() {
      client.publish(url => {
        console.log('推流成功地址', url)
        this.setData({
          urlRtc: url,
          flag: false
        })
      })
    },

    // 停止推流

    unPublish () {
      client.unpublish();
      this.setData({
        urlRtc: "",
        flag: true
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

      client.init(APPID, res => {

        console.log('初始化客户端成功', room, uid)

        // 创建视频流 chancl roomid uid
        client.join(undefined, room, uid, ovt => {
          console.log('加入房间成功', ovt)

        })
      })

    },

  }
})
