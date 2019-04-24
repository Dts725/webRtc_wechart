// pages/components/panel/panel.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持 
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型） 
      // value: '标题' // 属性初始值（可选），如果未指定则会根据类型选择一个 
      value: '2018-5-4 10:00-12:00' // 属性初始值（可选），如果未指定则会根据类型选择一个 
    },
    // 字段名对应的中文名
    cnKey: {
      type: Object,
      value: {
        field_id: '预约场地',
        application: '活动用途'
      }
    },
    // 接收的内容类型--数组或对象
    contentType:{
      type: String,
      value: ''
    },
    // 接收的内容
    content: {
      type: [Object, Array],
      value:{ 
        application: "chenlian",
        day: "2018-05-31",
        field_id: 7,
        fieldname: "华纳社区服务中心院内",
        id: 26,
        moment: "2,3",
        people_phone: "18964068809",
        team_id: 1,
        teamname: "晨练队",
        username: "aaa"
       }
    },
    // content: {
    //   type: Array,
    //   value: [
    //     { id: 11, title: '测试一', con: '测试内容' }, 
    //     { id: 12, title: '测试二', con: '测试内容二' }
    //   ]
    // },
    // 底部操作按钮-编辑
    showEditBtn: {
      type: Boolean,
      value: true
    },
    // 底部操作按钮-取消
    showCancelBtn: {
      type: Boolean,
      value: true
    },
    // 底部自定义操作按钮-显示或隐藏
    showCustomBtn: {
      type: Boolean,
      value: false
    },
    // 底部自定义操作按钮-名字
    customBtnName: {
      type: String,
      value: '取消预约'
    },
    // 底部自定义操作按钮-状态
    customBtnStatu: {
      type: String,
      value: '已取消'
    },
    // 底部自定义操作按钮-状态-class名字
    customBtnStatuClass: {
      type: String,
      value: ''
    },
    // 底部操作按钮-删除
    showDelBtn: {
      type: Boolean,
      value: true
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /* * 内部私有方法建议以下划线开头 * triggerEvent 用于触发事件 */
    _editEvent() { //编辑
      this.triggerEvent("editEvent",{con:this.data.content});
    },
    _cancelEvent() { //取消
      this.triggerEvent("cancelEvent",{con:this.data.content});
    },
    _delEvent() { //删除
      this.triggerEvent("delEvent",{con:this.data.content});
    },
  }
})
