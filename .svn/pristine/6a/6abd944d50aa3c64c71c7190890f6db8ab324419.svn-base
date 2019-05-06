// pages/onlineElection/index.js
const app = getApp();
let dateformat = require('../../utils/dateformat.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomId : '2556',
		url: app.globalData.url,
		meeting:{
			timer:'',	// 存储定时器循环
			currentPage:1,
			list:[]
		}
  },

// 路由
  router (e,d,f) {
	let id = e.target.dataset.data.id;
    // wx.redirectTo({
	wx.navigateTo({
      url: './main/main?id='+id+'&user_id='+app.globalData.personInfo.id+'&meeting_name='+e.currentTarget.dataset.data.meeting_name
    })
  },
	getNextPage(e,d,f){
		console.log('pullDown:::',e,d,f);
		this.getMeetingList(this.data.meeting.currentPage+1);
	},
	/** 返回会议状态 **/
	getStatus(status){
		let name='';
		switch(status){
			case 1: name='暂未开始'; break;
			case 2: name='正在进行'; break;
			case 3: name='已结束'; break;
		}
		return name;
// 		let obj={status:1,name:''},
// 			nw= new Date().getTime(),
// 			th= new Date(time).getTime(),
// 			ti=1000*60;
// 			debugger;
// 		if(th-nw>=5000){
// 			obj.status=1;
// 			obj.name='暂未开始';
// 		}else if((-1000*60*60*20<nw-th) && (nw-th<=5000)){
// 			obj.status=2;
// 			obj.name='正在进行';
// 		}else if(Math.abs(nw-th)>=1000*60*60*20){
// 			obj.status=3;
// 			obj.name='已结束';
// 		}
// 		console.log('getStatus:::',obj);
// 		return obj;
	},
	/** 获取会议列表 **/
	getMeetingList(page){
		page = page?page:this.data.meeting.currentPage;
		let _this=this,
			url='Meeting?user_id='+app.globalData.personInfo.id+'&page='+page;
// 			wx.showLoading({
// 			  title: '加载中',
// 			});
console.log('获取会议列表url:::',url);
		wx.request({
		  url: _this.data.url + url,
		  method: 'get',
		  success: (res) => {
					console.log('getMeetingList::',res);
		    if (res.data.code == 0) {
					// wx.hideLoading();
					let sts='';
					// 遍历会议记录，设置会议状态等
					res.data.data.data.forEach(el=>{
						el.status_name = _this.getStatus(el.status);
					});
					this.setData({
						'meeting.list':res.data.data.data,
						'meeting.currentPage':res.data.data.current_page
					});
		      
		    }
		  },
		  fail: (res) => {
		    console.log('fail', res);
		  }
		});
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
		
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
		let _this=this;
		setTimeout(function(){
			_this.getMeetingList();
		},500);
		if(this.data.meeting.timer){
			clearInterval(this.data.meeting.timer);
		}
		this.data.meeting.timer = setInterval(function(){
			_this.getMeetingList();
		},3000);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
		if(this.data.meeting.timer){
			clearInterval(this.data.meeting.timer);
		}
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
		if(this.data.meeting.timer){
			clearInterval(this.data.meeting.timer);
		}
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})