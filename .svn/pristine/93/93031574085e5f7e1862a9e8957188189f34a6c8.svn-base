// pages/components/meeting-center-video/meeting-center-video.js
const AgoraMiniappSDK = require('../../../utils/mini-app-sdk-production.js');
// 测试
const APPID = 'a247df868d144f6dbe956114b4a242d4';

// 江川项目
// const APPID = 'cdfad6ea2173410c9c36f1df1e9c6d72';
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
    hostId: 9528,
    locallId: 2564,
    srcHost: '',
    srcPoint: '',

  },

  attached() {
    // 在组件实例进入页面节点树时执行
    this._startPlaying()
  },


  /**
   * 组件的方法列表
   * 内部私有方法建议以下划线开头
   * triggerEvent 用于触发事件, {}中的内容为返回的对象
   */
  methods: {
    _fullScreenFn(e) {

       let _this = this;
      let id = e.currentTarget.dataset.id
      let ctx =''

      console.log('非ID',id)

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
    _startPlaying() {
      let client = new AgoraMiniappSDK.Client();
      // 初始化客户端

      client.init(APPID, res => {

        // 创建视频流 chancl roomid uid
        client.join(null, '2556', this.data.locallId, res => {
          client.publish(url => {
            console.log('推流成功地址', url)
            this.setData({
              urlRtc: url,
            })
          })

        })

        client.on("stream-added", e => {
          let uid = e.uid;
          console.log('黑恶黑hi', uid)

          if (uid === this.data.hostId) {
            // 拉流
            client.subscribe(uid, (url) => {
              this.setData({
                srcPoint: url,
              })

            })
          } else {

          }

        })
      })

    },

  }
})