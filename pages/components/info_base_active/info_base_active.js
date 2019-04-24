// pages/components/info_base_active/info_base_active.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持 
  },

  /**
   * 组件的属性列表
   */
  properties: {
    infoData: {
      type: Object,
      value: {
        time: '',
        isthumb: false,
        iscollect: false,

        author: "中共中央",
        click: 0,
        collection: 0,
        content: "",
        date_time: 1521080851,
        file: false,
        hot: 1,
        id: 114,
        image: "file/5aa9daf15fab4.jpg",
        is_show: 1,
        moudle_id: 22,
        score: "0",
        sign: 0,
        stick: 2,
        thumb_up: 0,
        title: "赵乐际在广东调研时强调 把六中全会精神全面贯彻到组织工作中",
        type: 3
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
     * 组件的方法列表
     * 内部私有方法建议以下划线开头
     * triggerEvent 用于触发事件, {}
     中的内容为返回的对象
     */
  methods: {
    /* 点赞 */
    _thumbEvent() {
      this.triggerEvent('thumbEvent', {
        con: this.data.infoData
      });
    },
    /* 收藏 */
    _collectEvent() {
      this.triggerEvent('collectEvent', {
        con: this.data.infoData
      });
    },
  }
})