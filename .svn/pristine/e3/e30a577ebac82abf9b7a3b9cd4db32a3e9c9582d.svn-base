// pages/preview/index.js
const wxCharts = require('../../utils/wxcharts.js');
const app = getApp();
var dryChart = null;
var wetChart = null;
var recycleChart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pieId: ['ringCanvas', 'ringCanvas2','ringCanvas3'],
    colors:['red','blue','purple'],
    personPhoto: '',
    widthProgress:'60%',
    showPartyBlock:false,
    showOrganizationBlock:false,
    partyDetailFlag:[false,false],
    organizationDetailFlag:[false,false],
    partyData:[
      { name:'永平南路第一居民委员会', number:3,
      detail:[
        {name:'红五党员外出参观学习活动'}, { name:'红五党员外出参观学习活动2'}]}, 
        { name: '永平南路第一居民委员会2', number: 1,
        detail: [
          {name: '红五党员外出参观学习活动'}, { name: '红五党员外出参观学习活动2' }]
      }],
      organizationData:[
        {
        name:'江川路街道仓源新村第二支部第二居民委员会',
        details:[
          { name:'江川路仓源新村党支部党员大会', date:'2019-5-1', reason:'内容过于简单',dateCheck:'2019-5-2' },
          { name: '江川路仓源新村党支部支委大会', date: '2019-5-1', reason: '内容过于简单', dateCheck: '2019-5-2' },
          { name: '江川路仓源新村党支部党小组会', date: '2019-5-1', reason: '内容过于简单', dateCheck: '2019-5-2' },
          { name: '江川路仓源新村党支部党课', date: '2019-5-1', reason: '内容过于简单', dateCheck: '2019-5-2' },
          { name: '江川路仓源新村党支部主题党日', date: '2019-5-1', reason: '内容过于简单', dateCheck: '2019-5-2' },
          ]
      },
        {
          name: '江川路街道仓源新村第二支部第二居民委员会2',
          details: [
            { name: '江川路仓源新村党支部党员大会', date: '2019-5-1', reason: '内容过于简单', dateCheck: '2019-5-2' },
            { name: '江川路仓源新村党支部支委大会', date: '2019-5-1', reason: '内容过于简单', dateCheck: '2019-5-2' },
            { name: '江川路仓源新村党支部党小组会', date: '2019-5-1', reason: '内容过于简单', dateCheck: '2019-5-2' },
            { name: '江川路仓源新村党支部党课', date: '2019-5-1', reason: '内容过于简单', dateCheck: '2019-5-2' },
            { name: '江川路仓源新村党支部主题党日', date: '2019-5-1', reason: '内容过于简单', dateCheck: '2019-5-2' },
          ]
        }
      ]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }else{
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.initPieChart(this.data.pieId[0], dryChart, [85, 15], this.data.colors[0])
    this.initPieChart(this.data.pieId[1], wetChart, [20, 80], this.data.colors[1])
    this.initPieChart(this.data.pieId[2], recycleChart, [100, 0], this.data.colors[2])
  },
  // 饼图初始化
  initPieChart(canvasId,chartPie,data,color){
    var windowWidth = 320;
    try {
       var res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
    } catch (e) {
       console.error('getSystemInfoSync failed!');
    }
  
    chartPie = new wxCharts({
      animation: true,
      canvasId: canvasId,
      type: 'ring',
      extra: {
        ringWidth: 15,
        pie: {
          offsetAngle: -180
        }
      },
      title: {
        name: parseInt((data[0] / (data[0] + data[1]))* 100) +'%',
        color: color,
        fontSize: 12
      },
      series: [{
        name: '已完成',
        data: data[0],
        stroke: false,
        color: color
      }, {
        name: '未完成',
        data: data[1],
        stroke: false,
        color: '#fff'
      }],
      disablePieStroke: true,
      width: windowWidth / 3,
      height: windowWidth / 3,
      dataLabel: false,
      legend: false,
      background: '#fff',
      padding: 0
    });
    setTimeout(() => {
      chartPie.stopAnimation();
    }, 500);

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },
  //垃圾跳转
  rubbishLink:function(){
    wx.navigateTo({
      url: '/pages/rubbish/index'
    })
  },

  // 折叠党建活动面板
  showParty:function(){
    if (this.data.showPartyBlock){
      this.data.showPartyBlock = false
    }else{
      this.data.showPartyBlock = true
    }
    this.setData({
      showPartyBlock: this.data.showPartyBlock,
    })
  },
  // 折叠党建活动详情
  showDetailContent:function(e){
    var index = e.currentTarget.dataset.param;
    if (this.data.partyDetailFlag[index]) {
         this.data.partyDetailFlag[index] = false;
     } else {
        this.data.partyDetailFlag[index] = true;
     }

    this.setData({
      partyDetailFlag: this.data.partyDetailFlag,
    })
  },
    // 折叠生活组织面板
  showOrganization:function(){
    if (this.data.showOrganizationBlock) {
      this.data.showOrganizationBlock = false
    } else {
      this.data.showOrganizationBlock = true
    }
    this.setData({
      showOrganizationBlock: this.data.showOrganizationBlock,
    })
  },
  // 折叠生活组织详情
  showorganizationDetail:function(e){
    var index = e.currentTarget.dataset.param;
    if (this.data.organizationDetailFlag[index]) {
      this.data.organizationDetailFlag[index] = false;
    } else {
      this.data.organizationDetailFlag[index] = true;
    }

    this.setData({
      organizationDetailFlag: this.data.organizationDetailFlag,
    })
  }
 
})