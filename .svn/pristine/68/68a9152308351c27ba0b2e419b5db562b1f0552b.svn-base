// card_live_video.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持 
  },
  /**
   * 组件的属性列表
   */
  properties: {
    cardData: {
      type: Object,
      value: {
        id: '1',
        image: '../../../static/test.jpg',
        title: '让美好愿景变为现实 啊啊啊啊啊啊',
        time: '2018-07-26',
        click: 1.5,
        content: '7月26日，金砖国家领导人第十次会晤在南非约翰内斯堡举行。南非总统拉马福萨 啊啊啊啊啊啊'
      }
    },
    ids: { //单个视频是否正在播放
      type: Number,
      value: -2
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    id: -1
  },

  /**
   * 组件的方法列表
   * 内部私有方法建议以下划线开头
   * triggerEvent 用于触发事件, {}中的内容为返回的对象
   */
  methods: {
    /* 查看详情 */
    _startPlaying(e) {
      // console.log(e)
      // this.setData({
      //   id: e.target.id
      // });
      this.triggerEvent('startPlaying', {
        con: this.data.cardData
      });

    }
  }
})