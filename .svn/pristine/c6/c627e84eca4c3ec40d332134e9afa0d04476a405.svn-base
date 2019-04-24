// card_party_serve.js
const app = getApp();
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持 
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // card的总数据
    cardData: {
      type: Object,
      value: {
        image: '',
        title: '',
        // time: '',
        start_time: '',
        end_time: '',
        address: '',
        unit: '',
        status: 0
      }
    },
    // 显示状态  0：已结束，1：立刻报名，2：已报名, 3: 已签到
    status: {
      type: Number,
      value: 1
    },
    // 二维码或扫码的小图标地址--默认二维码
    imgsrc: {
      type: String,
      value: ''
    },
    // 自定义按钮
    customName: {
      type: String,
      value: ''
    },
    // 自定义按钮-class名字
    customClass: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: app.globalData.fileUrl
  },

  /**
   * 组件的方法列表
   * 内部私有方法建议以下划线开头
   * triggerEvent 用于触发事件, {}
   中的内容为返回的对象
   */
  methods: {
    /** 查看详情 */
    _detailEvent() {
      this.triggerEvent('detailEvent', {
        con: this.data.cardData
      });
    },
    /** 立刻报名 */
    _signEvent() {
      this.triggerEvent('signEvent', {
        con: this.data.cardData
      });
    },
    /** 二维码按钮 */
    _qrcodeEvent() {
      this.triggerEvent('qrcodeEvent', {
        con: this.data.cardData
      });
    },
    /** 自定义按钮 */
    _customEvent() {
      this.triggerEvent('customEvent', {
        con: this.data.cardData
      });
    }
  }
})