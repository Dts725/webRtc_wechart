// pages/components/meeting-top/meeting-top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
		// name:'我要发言',	//	显示的名字
		// 显示状态  0：已结束，1：立刻报名，2：已报名, 3: 已签到
		name: {
		  type: String,
		  value: '我要发言',	//	显示的名字
		},
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
		/** 申请发言 **/
		_applicationSpeech(){
			this.triggerEvent('speechEvent', '申请发言');
		}
  }
})
