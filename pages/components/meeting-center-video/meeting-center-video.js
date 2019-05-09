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
    count: 0,
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


            // console.log('订阅地址远端02', uid, userId, index)

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
      try {


        lis.map((el, index) => {

          if (index === 0) {
            console.log('顶阅远端try', lis, el)
            console.log("进入组建调用实例", this.data.client.subscribe)
            this.subscribeFn(
             (url) => { this.setData({
                flag: true,
                srcPoint: url,
              })}, el, this)
            // this.data.client.subscribe(el, (url) => {
            //   console.log('订阅远端try成功', lis, el)

            //   this.setData({
            //     flag: true,
            //     srcPoint: url,
            //   })
            // },err => {
            //   console.log('报错index_0',err)
            // })
          }

          if (index === 1) {

            this.subscribeFn(

            url => {
              this.setData({
                flag: true,
                srcPoint_02: url,
              })}, el, this)
            // this.data.client.subscribe(el, (url) => {
            //   this.setData({
            //     flag: true,
            //     srcPoint_02: url,
            //   })
            // },err => {
            //   console.log('报错index_1', err)


            // })
          }

        })
      } catch (err) {


        console.log("首次订阅报错", err)

      }
      // 拉流


      this.data.client.on("stream-added", e => {

        let uid = e.uid;
        console.count('订阅地址远端01', e)

        let lisIndex = lis.indexOf(uid)

        if (lisIndex !== -1) {
          // console.log('订阅地址远端02', uid, userId, index)

          // 拉流

          if (lisIndex > 0) {
            this.subscribeFn(
              url => {
              this.setData({
                flag: true,
                srcPoint_02: url,
              })}, uid, this
            )
     
          } else {
            this.subscribeFn(
              url => {
              this.setData({
                flag: true,
                srcPoint: url,
              })}
            ), uid, this
          }
        }


      }, err => {
        console.log('订阅错误', err)
      })

    },

    subscribeFn(callback, uid, _this) {
      console.log("报错data",_this.data.count)
      _this.data.count++;

       _this.data.client.subscribe(uid, (url) => {
         _this.data.count = 0
         console.log('订阅远端try成功', url)
          // 传值执行代码块
          if(!url) url ="1";
         callback(url)

      }, err => {
        if ( _this.data.count < 3) {

          if (err.code == 903) {
            console.log("网路差尝试恢复连接")
           this.subscribeFn(callback, uid,_this)
          } else {
            console.log('报错尝试恢复', err)

          }
        }

      })
    },
    // 停止推流

    unPublish() {
      this.data.client.unpublish();
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