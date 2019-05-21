// pages/onlineElection/main/main.js.js
const app = getApp();
let sorts = require('../../../utils/W.sort.js');
let dateformat = require('../../../utils/dateformat.js');
let WxParse = require('../../../utils/wxParse/wxParse.js');

/**
 * WxParse.wxParse(bindName , type, data, target,imagePadding)
 * 1.bindName绑定的数据名(必填)
 * 2.type可以为html或者md(必填)
 * 3.data为传入的具体数据(必填)
 * 4.target为Page对象,一般为this(必填)
 * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
 */
Page({


  /**
   * 页面的初始数据
   */
  data: {
    // 	  index: 0,
    // 	  array: ['美国', '中国', '巴西', '日本'],
    url: app.globalData.url,
    wsUrl: app.globalData.wsUrl,
    meeting_id: '',
    upperChild: [], //子组件在线人员
    user_id: '',
    oldApply: [],
    meeting: {
      apply: [], // 申请的上麦人员
      upper: [], // 在麦人员
      speechName: '', // 顶部申请发言的状态名字: 申请发言，申请中， 下麦
      speechStatus: '', // 顶部申请发言的状态: 1申请发言，2申请中， 3下麦
      meeting_name: '', // 会议名字
      party: [], // 顶部参会人员列表信息
      speakList: [], // 顶部申请发言列表
      confirm: [], // 已读的列表
      showConfirmBtn: false, // 确认已读按钮
    },
    flow: {
      showMenu: false, // 控制显示流程的菜单
      url: 'Meeting_Flow', // 流程地址
      // list:[],	// 流程数据
      keys: [ // 流程数据 	status:1 未开始	2 进行 3已结束
        {
          name: '签到',
          flow_step: 1,
          src: '../../../static/meeting/icon01.png',
          status: 1
        },
        {
          name: '九严禁',
          flow_step: 2,
          src: '../../../static/meeting/icon02.png',
          status: 1
        },
        {
          name: '宣布批复',
          flow_step: 3,
          src: '../../../static/meeting/icon03.png',
          status: 1
        },
        {
          name: '候选人介绍',
          flow_step: 4,
          src: '../../../static/meeting/icon04.png',
          status: 1
        },
        {
          name: '选举办法',
          flow_step: 5,
          src: '../../../static/meeting/icon05.png',
          status: 1
        },
        {
          name: '监票人名单',
          flow_step: 6,
          src: '../../../static/meeting/icon06.png',
          status: 1
        },
        {
          name: '投票说明',
          flow_step: 7,
          src: '../../../static/meeting/icon07.png',
          status: 1
        },
        {
          name: '投票计票',
          flow_step: 8,
          src: '../../../static/meeting/icon08.png',
          status: 1
        },
        {
          name: '公布结果',
          flow_step: 9,
          src: '../../../static/meeting/icon09.png',
          status: 1
        },
        {
          name: '表态发言',
          flow_step: 10,
          src: '../../../static/meeting/icon10.png',
          status: 1
        },
      ],
      curFlow: '', // 当前进行的流程
      curFlowStatus: 1, // 当前进行的流程状态： 1流程进行时，2流程结果
      tipName: '', // 流程区域的提示名称
      textCon: '', // 2-7流程的富文本内容
      // 签到相关的
      sign: {
        tabs: ['党员签到', '群众签到'],
        activeIndex: 0, // 当前激活的tab标签id
        sliderOffset: 0, // 移动距离
        sliderLeft: 0, // 移动距离
        attend: '', // 实到人数
        required: '', // 应到人数
        ratio: '', // 占比
      },
      // 候选人相关的
      houxuan: {
        secretary: '', // 书记
        deputy_secretary: '', // 副书记
        commissioner: [], // 委员
      },
      // 流程8-投票计票
      toupiao: {
        showSureVote: false, // 投票确认弹窗
        secretary: '', // 书记
        deputy_secretary: '', // 副书记
        elected_num: 1, // 选出的委员数量
        // 委员-正副书记
        commissionerZF: [{
            id: '',
            name: '',
            sex: '',
            age: ''
          },
          {
            id: '',
            name: ''
          },
        ],
        commissioner: [], // 委员
        party: [], // 参会党员
        selected: 0, // 另选他人选择的
        showSelectOther: false, // 显示或隐藏另选他人
        select: {
          secretary: '', // 书记
          deputy_secretary: '', // 副书记
          commissioner: [], // 委员	-- 第一个为书记，第二个 副书记，第三个委员...
        }
      },
      // 流程8-计票
      jipiao: {
        show: false, // 显示计票
        // 候选
        houxuan: {
          secretary: '', // 书记
          deputy_secretary: '', // 副书记
          commissioner: [], // 委员	-- 第一个为书记，第二个 副书记，第三个委员...
        },
        // 另选
        other: {
          secretary: '', // 书记
          deputy_secretary: '', // 副书记
          commissioner: [], // 委员	-- 第一个为书记，第二个 副书记，第三个委员...
        }
      },
      // 流程9 计票结果
      jieguo: {
        activeId: '', // 
        list: [], // 页面展示用的
        secretary: [], // 书记
        deputy_secretary: [], // 副书记
        commissioner: [], // 委员
        party: 0, // 参会人数，即投票的总人数
      },
    }
  },

  // 判断此登录微信号是否是主持人 comperid
  isHostOline(comperid) {
    let userid = app.globalData.personInfo.id;
    if (userid == comperid) return true;
    return false

  },

  /***** 观众模式 &观看会议*/

  viewLiveFn(data) {
    console.log('在线麦序', data)
    let child = this.selectComponent('#liceCenter');
    // child.orderRemote(data[0].id, 0)
    // for (let i = 0; i < data.length; i++) {
    child.orderRemote(data)
    // }

  },


  /************我要发言模式 */
  hostFn() {
    let child = this.selectComponent('#liceCenter');
    console.log('调用推送')
    child.publish()
  },

  // 停止推送
  unPublish() {
    let child = this.selectComponent('#liceCenter');
    child.unPublish()
  },

  /** 顶部左上角--申请发言fun **/
  ApplicationSpeech(e) {
    let _this = this;
    if (this.data.meeting.apply.indexOf(_this.data.user_id) < 0 && this.data.meeting
      .upper.indexOf(_this.data.user_id) < 0) {
      // 上麦逻辑   判断下麦
      if (this.getIndexByKey(this.data.meeting.apply, this.data.user_id, 'id') == -1 &&
        this.getIndexByKey(this.data.meeting.upper, this.data.user_id, 'id') == -1) {
        wx.showModal({
          title: '申请发言',
          content: '您確定申请发言吗！',
          cancelText: '考虑一下',
          success(res) {
            if (res.confirm) {
              _this.sendMessage({
                apply: 1
              });
              // console.log('用户点击确定',dat)
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        });

      }
      // 下麦逻辑
      if (this.getIndexByKey(this.data.meeting.upper, this.data.user_id, 'id') > -1) {
        // 此微信是否为pc端主持人  允许发言否
        if (this.isHostOline(app.globalData.compere_id)) return true;
        wx.showModal({
          title: '下麦',
          content: '您確定下麦吗！',
          cancelText: '考虑一下',
          success(res) {
            if (res.confirm) {
              _this.unPublish()
              _this.sendMessage({
                down: 1
              });
              // console.log('用户点击确定',dat)
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        });

      }

    }
  },
  /** 顶部左上角--设置申请状态和名字 **/
  applicationSpeechStatusName() {
    if (this.getIndexByKey(this.data.meeting.apply, this.data.user_id, 'id') >
      -1) {
      this.setData({
        'meeting.speechName': '申请中',
        'meeting.speechStatus': '2',
      });
    } else if (this.getIndexByKey(this.data.meeting.upper, this.data.user_id,
        'id') > -1) {
      if (this.isHostOline(app.globalData.compere_id)) {
        this.setData({
          'meeting.speechName': '暂无权限',
          'meeting.speechStatus': '4',
        });
      } else {
        if (this.ArrayValueChange(this.data.oldApply, this.data.meeting.upper).changed) {
          this.data.oldApply = this.data.meeting.upper
          // console.count('点击下麦')

          this.hostFn()
        }
        this.setData({
          'meeting.speechName': '点击下麦',
          'meeting.speechStatus': '3',
        });
      }


    } else {
      if (this.ArrayValueChange(this.data.oldApply, this.data.meeting.upper).changed) {
        this.data.oldApply = this.data.meeting.upper
        this.unPublish()
        // console.count('申请发言')
      }
      this.setData({
        'meeting.speechName': '申请发言',
        'meeting.speechStatus': '1',
      });
    }
  },
  // 投票结果展示

  scortFn(e) {
    let id = "",
      data = "";
    if (e === 'init') {
      // 初次调用
      id = '0'
    } else {
      // 点击书记副书记委员
      id = e.currentTarget.dataset.id;
    }
    switch (id) {
      case '0':
        {
          this.setData({
            'flow.jieguo.list': this.data.flow.jieguo.secretary
          });
          break
        }
      case '1':
        {
          this.setData({
            'flow.jieguo.list': this.data.flow.jieguo.deputy_secretary
          });
          break
        }
      case '2':
        {
          this.setData({
            'flow.jieguo.list': this.data.flow.jieguo.commissioner
          });
          break
        }
      default:
        {
          break;
        }
    }

    this.setData({
      'flow.jieguo.activeId': id,
      // coutnResult: data
    })
  },


  // 投票计票
  focursFn(e) {
    let id = "",
      other = [],
      data = "";
    if (e === 'init') {
      id = '0'
    } else {
      id = e.currentTarget.dataset.id;
    };
    switch (id) { // 0书记 1副书记 2委员
      case '0':
        {
          data = [{
            name: '张零零',
            process: 95,
            src: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=03ffa97602d79123ffe092749d355917/48540923dd54564e5b271d47bdde9c82d1584f0a.jpg'

          }];
          other = []
          break;
        };
      case '1':
        {
          data = [{
            name: '张一一',
            process: 60,
            src: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=03ffa97602d79123ffe092749d355917/48540923dd54564e5b271d47bdde9c82d1584f0a.jpg'

          }, ];
          other = [{
            name: '张思思',
            process: 70,
            src: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=03ffa97602d79123ffe092749d355917/48540923dd54564e5b271d47bdde9c82d1584f0a.jpg'
          }];
          break;
        };
      case '2':
        {
          data = [{
            name: '张二二',
            process: 80,
            src: 'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=03ffa97602d79123ffe092749d355917/48540923dd54564e5b271d47bdde9c82d1584f0a.jpg'
          }];
          other = [];
          break;
        };
      default:
        {
          break;
        };
    }

    this.setData({
      'flow.jipiao.focursStatus': id,
      'flow.jipiao.nnounceResults': data
    })

    this.otherFn(other);
  },
  // 另选书记计票
  otherFn(data) {
    this.setData({
      'flow.jipiao.otherResult': data
    })
  },

  /** socket 连接 **/
  initSocket() {
    let socketOpen = false;
    let socketMsgQueue = [];
    let _this = this;
    wx.connectSocket({
      // url: 'ws://47.96.126.56:2234',
      url: _this.data.wsUrl,
      header: {
        'content-type': 'application/json'
      },
      success: function(res, a, d, f) {
        console.log('socket连接成功:::::', res, a, d, f);
      },
      fail: function(res, a, d, f) {
        console.log('socket连接失败:::::', res, a, d, f);
      },
    })

    // 打开socket连接
    wx.onSocketOpen(function(res) {});

    wx.onSocketError(function(res) {
      console.log('onSocketError Socket连接打开失败，请检查！' + res.errMsg);
    });
    // 监听socket返回的数据
    wx.onSocketMessage(function(res) {
      // console.log('监听socket返回的数据:::::',res);
      // 发送 会议id
      if (res && res.data == '连接成功') {
        _this.sendMessage({
          meeting_id: _this.data.meeting_id,
          user_id: _this.data.user_id
        });
      } else {
        let dat = JSON.parse(res.data);
        if (app.globalData.compere_id !== dat.compere_id) {
          app.globalData.compere_id = dat.compere_id;
        }
        // 视频控制流程
        if (dat.upper && dat.upper.length !== 0) {
          if (_this.ArrayValueChange(_this.data.meeting.upper, dat.upper, 'id').changed) {
            let lis = dat.upper.map(el => {
              return el.id
            })
            _this.setData({
              upperChild: lis
            })
            // 订阅远端
            _this.viewLiveFn(lis)
          }
        }

        // 设置申请上麦和在麦人员
        if (_this.ArrayValueChange(_this.data.meeting.apply, dat.apply, 'id').changed ||
          _this.ArrayValueChange(_this.data.meeting.upper, dat.upper, 'id').changed ||
          dat.apply.length == 0 || dat.upper.length == 0) {
          _this.setData({
            'meeting.apply': dat.apply || [],
            'meeting.upper': dat.upper || []
          });
          _this.applicationSpeechStatusName();
        }

        // 视频流程控制

        // console.log('socket返回的会议流程数据：：',JSON.stringify(dat.data));
        // 设置流程等待开始的状态
        for (let d = 0; d < dat.data.length; d++) {
          if (d == 0) {
            if (dat.data[d].status == 1) {
              dat.data[d].status = 4;
            }
          } else if (dat.data[d].status == 2 && d < dat.data.length - 1) {
            dat.data[d + 1].status = 4;
          }
        }
        // 设置顶部参会党员列表
        if (_this.ArrayValueChange(_this.data.meeting.party, dat.party, 'id').changed) {
          _this.setData({
            'meeting.party': dat.party
          });
        }
        // 设置顶部申请发言列表
        if (_this.ArrayValueChange(_this.data.meeting.speakList, dat.apply,
            'id').changed) {
          _this.setData({
            'meeting.speakList': dat.apply
          });
        }
        // 设置会议状态
        _this.SetArrayValueChange(_this.data.flow.keys, dat.data, 'status',
          'flow_step').then(result => {
          // console.log('socket返回的会议流程数据2：：',_this.data.flow.keys,dat);
          // _this.setData({'flow.keys':_this.data.flow.keys});
          // debugger;
          // 查看下一步的流程
          let nextFlow = _this.CheckCurrentFlow(_this.data.flow.keys, 'status',
            4);
          // if (nextFlow.flow_step) {
          _this.setData({
            'flow.nextFlow': nextFlow.flow_step ? nextFlow.name : ''
          });
          // }
          // 查看当前进行的流程
          // _this.CheckCurrentFlow(_this.data.flow.keys, 'status').then(cur => {
          let cur = _this.CheckCurrentFlow(_this.data.flow.keys, 'status');
          // console.log('socket返回的会议流程数据2：：',_this.data.flow.keys,dat,res,app,cur);
          // 记录当前正在进行的是哪个流程
          // if (cur && cur.flow_step) {
          // _this.setData({
          // 	'data.meeting.confirm':dat.confirm
          // });
          if (cur && cur.flow_step) {
            if (dat.confirm && Array.isArray(dat.confirm) && dat.confirm.filter(i => i.user_id == _this.data.user_id && i.flow_step == cur.flow_step).length > 0) {
              _this.setData({
                'data.meeting.showConfirmBtn': false
              });
            } else {
              _this.setData({
                'data.meeting.showConfirmBtn': true
              });
            }
          }
          _this.setData({
            'flow.curFlow': cur && cur.flow_step ? Number(cur.flow_step) : '',
            'data.meeting.confirm': dat.confirm ? dat.confirm : []
          });
          // }
          // 设置显示
          // 当前的流程为：签到
          if (Number(cur.flow_step) == 1 && Number(cur.status) == 2) {

            if (res.data.indexOf('"user_id":' + _this.data.user_id + ',') < 0) {
              // 显示签到按钮
              // _this.data.flow.curFlow = Number(cur.flow_step);
              _this.setData({
                // 'flow.curFlow':Number(cur.flow_step),
                'flow.tipName': '请进行签到',
                'flow.curFlowStatus': 1,
              });
            } else {
              // 隐藏签到按钮
              // _this.data.flow.curFlow = 0;
              _this.setData({
                // 'flow.curFlow':0,
                'flow.tipName': '',
                'flow.curFlowStatus': 2,
                'flow.sign.attend': Number((dat.attend || 0)), // 实到人数
                'flow.sign.required': Number((dat.required || 0)), // 应到人数
                'flow.sign.ratio': parseInt(Number((dat.attend || 0)) / Number(
                  (dat.required || 0)) * 100), // 占比
              });
            }
          }
          // 当前的流程为：3 和 5-7
          if (Number(cur.flow_step) > 4 && Number(cur.flow_step) < 8 || Number(
              cur.flow_step) == 2 || Number(cur.flow_step) == 3) {
            if (dat.flow_content && _this.data.flow.textCon != dat.flow_content) {
              _this.setData({
                'flow.textCon': dat.flow_content || ''
              });
              _this.setTextFlowCon();
            }
          }
          // 候选人介绍
          if (Number(cur.flow_step) == 4) {
            _this.setData({
              'flow.tipName': '候选人介绍',
            });
            if (_this.data.flow.houxuan.commissioner.length == 0 || !_this.data
              .flow.houxuan.deputy_secretary || !_this.data.flow.houxuan.secretary
            ) {
              let commissioner = dat.commissioner || [],
                deputy_secretary = dat.deputy_secretary || '',
                secretary = dat.secretary || '';
              secretary.age = _this.getAge(secretary.birth);
              deputy_secretary.age = _this.getAge(deputy_secretary.birth);
              if (commissioner.length > 0) {
                commissioner.forEach(el => {
                  el.age = _this.getAge(el.birth);
                });
              }
              _this.setData({
                'flow.houxuan.commissioner': commissioner,
                'flow.houxuan.deputy_secretary': deputy_secretary,
                'flow.houxuan.secretary': secretary,
              });
            }
          }
          // 流程8
          if (Number(cur.flow_step) == 8) {
            // 投票
            if (_this.data.flow.toupiao.commissioner.length == 0 || !_this.data
              .flow.toupiao.deputy_secretary || !_this.data.flow.toupiao.secretary ||
              _this.data.flow.toupiao.party.length == 0) {
              let commissioner = dat.commissioner || [],
                party = dat.party || [],
                deputy_secretary = dat.deputy_secretary || {},
                secretary = dat.secretary || {};
              secretary.age = secretary.birth ? _this.getAge(secretary.birth) :
                '';
              secretary.selected = false; // 选中候选
              secretary.selectedIndex = 0; // 未选候选，记录他人在party中的索引
              secretary.process = 0; // 默认票数0
              deputy_secretary.age = deputy_secretary.birth ? _this.getAge(
                deputy_secretary.birth) : '';
              deputy_secretary.selected = false;
              deputy_secretary.selectedIndex = 0;
              deputy_secretary.process = 0; // 默认票数0
              if (commissioner.length > 0) {
                commissioner.forEach(el => {
                  el.age = el.birth ? _this.getAge(el.birth) : '';
                  el.selected = false;
                  el.selectedIndex = 0;
                  el.process = 0;
                });
              }
              if (party.length > 0) {
                party.forEach(el => {
                  el.age = _this.getAge(el.birth);
                  // 汇聚的信息，方便滑动选择时展示
                  el.collect = `${el.name} ${el.sex == 1 ? '男' : '女'} ${el.age}`;
                });
              }
              if (party[0] && party[0].name && party[0].name !== '请选择') {
                party.unshift({
                  id: 0,
                  name: '请选择',
                  collect: '请选择'
                });
              }
              _this.setData({
                'flow.toupiao.commissioner': commissioner,
                'flow.toupiao.deputy_secretary': deputy_secretary,
                'flow.toupiao.secretary': secretary,
                'flow.toupiao.party': party,
                'flow.toupiao.elected_num': dat.elected_num || 1
              });
            }
            /** 计票	**/
            _this.setData({
              'flow.jipiao.show': _this.getIndexByKey(dat.vote, _this.data.user_id,
                'user_id') >= 0 ? true : false
            });
            // 统计票数
            // if(_this.getIndexByKey(dat.vote,_this.data.user_id,'user_id')>=0){
            // 	debugger;
            // 	
            // }
          }

          // 流程9 计票结果
          if (Number(cur.flow_step) == 9) {
            if (_this.data.flow.jieguo.list.length == 0) {
              _this.setData({
                'flow.jieguo.list': dat.secretary_gain.sort(sorts.default.sortBy(
                  'gain', false)),
              });
            }
            _this.setData({
              'flow.jieguo.secretary': dat.secretary_gain.sort(sorts.default.sortBy(
                'gain', false)),
              // 'flow.jieguo.list':dat.secretary_gain,
              'flow.jieguo.deputy_secretary': dat.deputy_secretary_gain.sort(
                sorts.default.sortBy('gain', false)),
              'flow.jieguo.commissioner': dat.commissioner_gain.sort(sorts.default
                .sortBy('gain', false)),
              'flow.jieguo.party_number': Number(dat.party_number)
            });
          }

          // 流程10 表态发言
          if (Number(cur.flow_step) == 10) {
            // if (_this.data.flow.jieguo.list.length == 0) {
            // 	_this.setData({
            // 		'flow.jieguo.list': dat.secretary_gain.sort(sorts.default.sortBy(
            // 			'gain', false)),
            // 	});
            // }
            // _this.setData({
            // 	'flow.jieguo.secretary': dat.secretary_gain.sort(sorts.default.sortBy(
            // 		'gain', false)),
            // 	// 'flow.jieguo.list':dat.secretary_gain,
            // 	'flow.jieguo.deputy_secretary': dat.deputy_secretary_gain.sort(
            // 		sorts.default.sortBy('gain', false)),
            // 	'flow.jieguo.commissioner': dat.commissioner_gain.sort(sorts.default
            // 		.sortBy('gain', false)),
            // 	'flow.jieguo.party_number': Number(dat.party_number)
            // });
          }


          // });
        });

      }
    })

  },

  // 全局发送消息，自动配置meeting_id  user_id
  sendMessage(data) {
    let meeting_id = data.meeting_id || this.data.meeting_id || app.globalData.meeting
      .meeting_id;
    data.meeting_id = meeting_id;
    data.user_id = data.user_id ? data.user_id : this.data.user_id;
    let datas = JSON.stringify(data);
    // console.log('通过 WebSocket 连接发送数据::',datas);
    // 通过 WebSocket 连接发送数据
    wx.sendSocketMessage({
      data: datas
    });
  },
  /** 显示会议流程菜单 **/
  showFlows() {
    this.setData({
      'flow.showMenu': !this.data.flow.showMenu
    });
  },
  /** 隐藏会议流程菜单 **/
  unShowMenu() {
    this.setData({
      'flow.showMenu': false
    });
  },
  /** 获取会议流程 **/
  getFlowList(id) {
    let _this = this;
    wx.request({
      url: _this.data.url + _this.data.flow.url + '?meeting_id=' + (id ? id :
        ''),
      method: 'get',
      success: (res) => {
        if (res.data.code == 0) {
          _this.SetArrayValueChange(_this.data.flow.keys, res.data.data.data,
            'status', 'flow_step');
        }
      },
      fail: (res) => {
        console.log('fail', res);
      }
    });
  },





  /** 签到 **/
  sign(e) {
    let _this = this;
    wx.showModal({
      title: '签到',
      content: '您確定签到吗！',
      cancelText: '考虑一下',
      success(res) {
        if (res.confirm) {
          _this.sendMessage({
            meeting_id: _this.data.meeting_id,
            user_id: _this.data.user_id,
            sign_time: dateformat.dateformat.format(new Date(), 'yyyy-MM-dd hh:mm')
          });
          // console.log('用户点击确定',dat)
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    });
  },
  /** 签到结果的标签切换	**/
  tabClick: function(e) {
    this.setData({
      'flow.sign.sliderOffset': e.currentTarget.offsetLeft,
      'flow.sign.activeIndex': e.currentTarget.id
    });
    // 党员签到
    if (e.currentTarget.id == '0') {} else if (e.currentTarget.id == '1') { // 群众签到
    }
  },

  /** 候选人详情  调接口 **/
  introduceHouXuan(e, d, f) {
    let id = e.currentTarget.dataset.id;
    // debugger;
  },
  /** 2、5-7流程 **/
  setTextFlowCon() {
    // 设置2、5-7流程的富文本内容
    let article = this.data.flow.textCon;
    WxParse.wxParse('article', 'html', article, this, 5);
  },


  /** 设置变动的数据 **/
  SetArrayValueChange(o, n, changeKey, tarKey) {
    if (!Array.isArray(o) || !Array.isArray(n)) {
      return;
    }
    let res = this.ArrayValueChange(o, n, changeKey);
    let tmp = JSON.parse(JSON.stringify(this.data.flow.keys));
    if (Array.isArray(res)) {
      for (let i = 0; i < o.length; i++) {
        let tmpNum = '',
          target = '';
        for (let j = 0; j < res.length; j++) {
          if (res[j].changed && o[i][tarKey] == res[j].new[tarKey]) {
            tmpNum = res[j].index;
            tmp[tmpNum].status = res[j].new[changeKey];
          }
        }
      }
      this.setData({
        'flow.keys': tmp
      });
    }
    return new Promise((resolve, reject) => {
      resolve(res);
      // reject(res);
    });
  },

  /** 流程8-1 我要投票按钮  存储选中状态和id**/
  onSelectToupiao(e) {
    console.log('我要投票按钮:::', e.currentTarget.dataset);
    let dat = e.currentTarget.dataset;
    let type = dat.type,
      tar = 'flow.toupiao.select.' + type,
      tarType = '';
    let idx = '',
      selectedIndex = '',
      arrTar = '',
      arrTar2 = '';
    // 委员
    if (type == 'commissioner') {
      idx = this.getIndexByKey(this.data.flow.toupiao.commissioner, dat.id, 'id');
      arrTar = 'flow.toupiao.commissioner[' + idx + '].selected';
      arrTar2 = 'flow.toupiao.select.commissioner[' + idx + ']'; // 选中的委员所在数组的索引下的id值
      selectedIndex = 'flow.toupiao.commissioner[' + idx + '].selectedIndex';
      // 当选中时做校验
      if (!this.data.flow.toupiao.commissioner[idx].selected) {
        // 计算选中的委员数是否超员
        if (this.computedSelectedCommissionerNum()) {
          return;
        }
        // 检验此人是否已选
        if (this.checkIdIsSelected(dat.id)) {
          return false;
        }
      }
      // 选中
      this.setData({
        [arrTar]: !this.data.flow.toupiao.commissioner[idx].selected, // 是否选中的状态
        [arrTar2]: this.data.flow.toupiao.commissioner[idx].selected ? '' : dat
          .id, // 存储id
        [selectedIndex]: 0 // 设置选中索引为0
      });
    } else {
      tarType = 'flow.toupiao.' + type + '.selected';
      selectedIndex = 'flow.toupiao.' + type + '.selectedIndex';
      let zf_id = '',
        zf_name = '',
        zf_sex = '',
        zf_age = '';
      // 检验此人是否已选
      if (!this.data.flow.toupiao[type].selected && this.checkIdIsSelected(dat.id)) {
        return false;
      }
      this.setData({
        [tar]: this.data.flow.toupiao[type].selected ? '' : dat.id, // 存储选中的id
        [tarType]: !this.data.flow.toupiao[type].selected, // 是否选中的状态
        [selectedIndex]: 0 // 设置选中索引为0
      });
      //选择书记和副书记时，自动将他们添加到委员    将书记加入到commissionerZF[0]  将副书记加入到commissionerZF[1]
      zf_id = type == 'secretary' ? 'flow.toupiao.commissionerZF[0].id' :
        'flow.toupiao.commissionerZF[1].id';
      zf_name = type == 'secretary' ? 'flow.toupiao.commissionerZF[0].name' :
        'flow.toupiao.commissionerZF[1].name';
      zf_sex = type == 'secretary' ? 'flow.toupiao.commissionerZF[0].sex' :
        'flow.toupiao.commissionerZF[1].sex';
      zf_age = type == 'secretary' ? 'flow.toupiao.commissionerZF[0].age' :
        'flow.toupiao.commissionerZF[1].age';
      this.setData({
        [zf_id]: this.data.flow.toupiao[type].selected ? dat.id : '',
        [zf_name]: this.data.flow.toupiao[type].selected ? this.data.flow.toupiao[
          type].name : '',
        [zf_sex]: this.data.flow.toupiao[type].selected ? this.data.flow.toupiao[
          type].sex : '',
        [zf_age]: this.data.flow.toupiao[type].selected ? this.data.flow.toupiao[
          type].age : '',
      });
    }
    console.log('投票按钮:00000000', this.data.flow.toupiao.select, this.data.flow.toupiao
      .commissionerZF);
    this.setPartySelected();
  },
  /** 流程8-1 另选他人 返回的数值   存储选中的索引和id**/
  bindPickerChangeSelectOther(e) {
    console.log('picker发送选择改变，携带值为', Number(e.detail.value), e);
    let dat = e.currentTarget.dataset;
    let type = dat.type,
      tar = 'flow.toupiao.select.' + type,
      tarType = '';
    let idx = '',
      arrTar = '',
      arrTar2 = '',
      name = this.data.flow.toupiao.party[Number(e.detail.value)].collect;
    // 委员
    if (type == 'commissioner') {
      idx = this.getIndexByKey(this.data.flow.toupiao.commissioner, dat.id, 'id');
      arrTar = 'flow.toupiao.commissioner[' + idx + '].selectedIndex';
      arrTar2 = 'flow.toupiao.select.commissioner[' + idx + ']'; // 选中的委员所在数组的索引下的id值
      // 当选中时做校验
      if (name.indexOf('请选择') < 0) {
        // 计算选中的委员数是否超员
        if (this.computedSelectedCommissionerNum()) {
          return false;
        }
        // 检验此人是否已选
        if (this.checkIdIsSelected(this.data.flow.toupiao.party[Number(e.detail.value)]
            .id)) {
          return false;
        }
      }
      // 选中
      this.setData({
        [arrTar]: name.indexOf('请选择') >= 0 ? '' : Number(e.detail.value), // 存储选中的索引
        [arrTar2]: this.data.flow.toupiao.party[Number(e.detail.value)].id, // 选中的id
      });
      console.log('其他委员：：', this.data.flow.toupiao.commissioner[idx]);
    } else {
      tarType = 'flow.toupiao.' + type + '.selectedIndex';
      let zf_id = '',
        zf_name = '',
        zf_sex = '',
        zf_age = '';
      // 检验此人是否已选
      if (name.indexOf('请选择') < 0 && this.checkIdIsSelected(this.data.flow.toupiao
          .party[Number(e.detail.value)].id)) {
        return false;
      }
      this.setData({
        // [tar]:this.data.flow.toupiao[type].selectedIndex?'':Number(dat.index),
        [tar]: name.indexOf('请选择') >= 0 ? '' : this.data.flow.toupiao.party[
          Number(e.detail.value)].id, // 存储选中的id
        [tarType]: name.indexOf('请选择') >= 0 ? '' : Number(e.detail.value) // 存储选中的索引
      });
      //选择书记和副书记时，自动将他们添加到委员    将书记加入到commissionerZF[0]  将副书记加入到commissionerZF[1]
      zf_id = type == 'secretary' ? 'flow.toupiao.commissionerZF[0].id' :
        'flow.toupiao.commissionerZF[1].id';
      zf_name = type == 'secretary' ? 'flow.toupiao.commissionerZF[0].name' :
        'flow.toupiao.commissionerZF[1].name';
      zf_sex = type == 'secretary' ? 'flow.toupiao.commissionerZF[0].sex' :
        'flow.toupiao.commissionerZF[1].sex';
      zf_age = type == 'secretary' ? 'flow.toupiao.commissionerZF[0].age' :
        'flow.toupiao.commissionerZF[1].age';
      this.setData({
        [zf_id]: this.data.flow.toupiao[type].selectedIndex ? this.data.flow.toupiao
          .party[Number(e.detail.value)].id : '',
        [zf_name]: this.data.flow.toupiao[type].selectedIndex ? this.data.flow.toupiao
          .party[Number(e.detail.value)].name : '',
        [zf_sex]: this.data.flow.toupiao[type].selectedIndex ? this.data.flow.toupiao
          .party[Number(e.detail.value)].sex : '',
        [zf_age]: this.data.flow.toupiao[type].selectedIndex ? this.data.flow.toupiao
          .party[Number(e.detail.value)].age : '',
      });
    }
    this.setPartySelected();
    console.log('投票按钮:111111111', this.data.flow.toupiao.select, this.data.flow
      .toupiao.commissionerZF);
  },
  /** 确认已读 **/
  sureAlreadyRead(a, b, c) {
    // CREATE TABLE `Meeting_Confirm` (
    // 	`id` int(11) NOT NULL AUTO_INCREMENT,
    // 	`meeting_id` int(11) DEFAULT NULL COMMENT '会议id',
    // 	`flow_step` int(11) DEFAULT NULL COMMENT '流程步骤(1-10)',
    // 	`user_id` int(11) DEFAULT NULL COMMENT '用户id',
    // 	`confirm_time` datetime DEFAULT NULL COMMENT '确认时间',
    // 	PRIMARY KEY (`id`)
    // ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='会议步骤确认表';
    // let step = this.data.flow.keys.filter(i => i.status == 2)[0].flow_step;
    let step = this.data.flow.curFlow;
    let confirm = this.data.meeting.confirm,
      _this = this;
    let dat = {
      // meeting_id: this.data.meeting_id,
      // user_id: this.data.user_id,
      flow_step: step,
      confirm_time: dateformat.dateformat.format(new Date(), 'yyyy-MM-dd hh:mm')
    };
    wx.showModal({
      title: '确认已读',
      content: '您确认阅读完毕吗！',
      cancelText: '继续阅读',
      success(res) {
        if (res.confirm) {
          _this.sendMessage(dat);
          wx.showLoading({
            title: '确认中',
          });
          if (_this.data.meeting.confirm.filter(i => i.user_id == _this.data.user_id)) {
            wx.hideLoading();
          }
          // console.log('用户点击确定',dat)
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    });
  },
  /** 确认投票按钮 **/
  onSubmitToupiao(e) {
    // console.log('确认投票按钮:::',e,this.data.flow.toupiao.select);
    let dat = {
      secretary_id: this.data.flow.toupiao.select.secretary,
      deputy_secretary_id: this.data.flow.toupiao.select.deputy_secretary,
      commissioner_ids: this.filterInvalidData(this.data.flow.toupiao.select.commissioner),
      date_time: dateformat.dateformat.format(new Date(), 'yyyy-MM-dd hh:mm')
    };
    let _this = this,
      arr = this.filterInvalidData(dat.commissioner_ids);
    // // 检测书记是否已选
    // if (!dat.secretary_id) {
    // 	wx.showToast({
    // 		title: '书记尚未投票！',
    // 		icon: 'none'
    // 	});
    // 	return;
    // }
    // // 检测副书记是否已选
    // if (!dat.deputy_secretary_id) {
    // 	wx.showToast({
    // 		title: '副书记尚未投票！',
    // 		icon: 'none'
    // 	});
    // 	return;
    // }
    // // 检测委员是否选择完毕
    // if (arr.length + 2 < this.data.flow.toupiao.elected_num) {
    // 	wx.showToast({
    // 		title: '选择的委员人数不足要求数量！',
    // 		icon: 'none'
    // 	});
    // 	return;
    // }
    dat.commissioner_ids = dat.secretary_id + ',' + dat.deputy_secretary_id +
      ',' + dat.commissioner_ids.join(',');
    // _this.setData({
    //   'data.flow.toupiao.showSureVote': true
    // });
    wx.showModal({
    	title: '提交投票',
    	content: '您确认要投票吗！',
    	cancelText: '考虑一下',
    	success(res) {
    		if (res.confirm) {
    			_this.sendMessage(dat);
    			// console.log('用户点击确定',dat)
    		} else if (res.cancel) {
    			// console.log('用户点击取消')
    		}
    	}
    });
  },
  /** 取消投票按钮 **/
  onCancelToupiao(e) {
    console.log('取消投票按钮:::', e);
  },
  /** 显示或隐藏另选他人选项 **/
  showSelectOther(e) {
    this.setData({
      ['flow.toupiao.showSelectOther']: !this.data.flow.toupiao.showSelectOther
    });
  },
  /** 计算选中的委员数是否超员 **/
  computedSelectedCommissionerNum() {
    let arr = this.filterInvalidData(this.data.flow.toupiao.select.commissioner);
    if (arr.length + 2 >= this.data.flow.toupiao.elected_num) {
      wx.showModal({
        title: '温馨提示',
        content: '可选委员已满，您可以选择书记副书记，或取消已选委员后选择其他委员！'
      });
      return true;
    }
    return false;
  },
  /** 验证选中的人是否已选 **/
  checkIdIsSelected(id) {
    if (this.data.flow.toupiao.select.secretary == id ||
      this.data.flow.toupiao.select.deputy_secretary == id ||
      this.data.flow.toupiao.select.commissioner.indexOf(id) >= 0
    ) {
      wx.showModal({
        title: '温馨提示',
        content: '此人已被投票，请选他人！'
      });
      return true;
    }
  },
  /** 设置参选党员party的选中状态，即collect中删减已选 **/
  setPartySelected() {
    let s = '',
      _this = this;
    this.data.flow.toupiao.party.forEach((el, idx) => {
      s = 'flow.toupiao.party[' + idx + '].collect';
      if (el.id == this.data.flow.toupiao.select.secretary ||
        el.id == this.data.flow.toupiao.select.deputy_secretary ||
        this.data.flow.toupiao.select.commissioner.indexOf(el.id) >= 0
      ) {
        if (el.collect.indexOf('请选择') < 0) {
          _this.setData({
            [s]: el.collect.indexOf('已选') < 0 ? el.collect + ' 已选' : el.collect
          });
        }
      } else {
        if (el.collect.indexOf('请选择') < 0) {
          _this.setData({
            [s]: el.collect.replace(/ 已选/g, '')
          });
        }
      }
    });
  },
  /******************************** 公共方法 ↓ ********************************/
  /** 过滤数组中无效的数据 **/
  filterInvalidData(arr, key) {
    if (!Array.isArray(arr)) {
      return arr
    }
    let tmp = [];
    for (let i = 0; i < arr.length; i++) {
      if (key) {
        if (arr[i][key]) {
          tmp.push(arr[i][key])
        }
      } else {
        if (arr[i]) {
          tmp.push(arr[i])
        }
      }
    };
    return tmp;
  },
  /** 获取数组对象中的索引值 **/
  getIndexByKey(arr, value, key) {
    if (!Array.isArray(arr) || !value) {
      return key;
    }
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
      if (key) {
        if (typeof(arr[i]) == 'object' && arr[i][key] == value) {
          index = i;
        }
      } else {
        if (arr[i] == value) {
          index = i;
        }
      }
    }
    return index;
  },
  /** 计算年龄 **/
  getAge(time) {
    if (!time) {
      return 0;
    }
    let type = app.globalData.deviceType;
    if (type == 'iphone') {
      time = time.replace(/\-/g, '/');
    }
    let now = new Date().getFullYear(),
      that = new Date(time).getFullYear();
    return Math.ceil(now - that);
  },
  /** 检测正在进行中的流程  查找数组对象中的某个值 返回数组对象 **/
  CheckCurrentFlow(flow, key, value) {
    if (!Array.isArray(flow)) {
      return ''
    }
    let current = {},
      val = value || 2;
    for (let i = 0; i < flow.length; i++) {
      if (flow[i][key] == val) {
        current = flow[i];
      }
    }
    // return new Promise((resolve, reject) => {
    //   resolve(current);
    // });
    return current;
  },
  /** 检测数据变动 **/
  ArrayValueChange(o, n, key) {
    if (!Array.isArray(o) || !Array.isArray(n)) {
      return;
    }
    if (o.length !== n.length) {
      return {
        changed: true,
        detail: ''
      }
    }
    let arr = [];
    for (let i = 0; i < n.length; i++) {
      if (key) {
        if (n[i][key] !== o[i][key]) {
          // arr.push({changed:true,detail:{key:key,index:i,old:o[i],new:n[i]}});
          arr.push({
            changed: true,
            index: i,
            old: o[i],
            new: n[i]
          });
        }
      } else {
        if (n[i] !== o[i]) {
          arr.push({
            changed: true,
            index: i,
            old: o[i],
            new: n[i]
          });
        }
      }
    }
    return arr.length > 0 ? arr : {
      changed: false,
      detail: ''
    };
  },
  /******************************** 公共方法 ↑ ********************************/



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let child = this.selectComponent('#liceCenter')

    // 投票结果 计票 初始化调用和
    child._startPlaying(options.id, app.globalData.personInfo.id)


    this.focursFn('init')
    this.scortFn('init')
    console.log('onLoad会议初始拿到的:::', options);
    this.setData({
      meeting_id: options.id,
      user_id: app.globalData.personInfo.id,
      'meeting.meeting_name': options.meeting_name,

    });
    this.getFlowList(options.id);
    this.initSocket();

    // 初始化会议


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    // 	console.log('onShow会议初始拿到的:::',options);
    // 	this.getFlowList(options.id);
    // this.getFlowList(options.id);
    // this.initSocket();

    // 视频重连
    // let lis = this.data.meeting.upper.map(el => {
    //   return el.id
    // })
    // console.log('onshow被调用',lis)

    // this.viewLiveFn(lis);

    // if (this.data.meeting.speechName === '点击下麦') {
    //   this.hostFn()
    // } else {
    //   this.unPublish()
    // }


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    // 下麦
    // this.sendMessage({down: 1});
    // 关闭socket
    // wx.closeSocket({
    //   url: this.data.wsUrl
    // });
    // this.selectComponent('#liceCenter').destroyFn()
    // wx.navigateTo({
    //   url: '../index',
    // })
    console.log('生命周期函数--监听页面隐藏111111111');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    this.selectComponent('#liceCenter').destroyFn()
    // this.selectComponent('#liceCenter').unsubscribeFn(this.data.meeting.upper)
    // 下麦

    if (!this.isHostOline(app.globalData.compere_id)) {
      this.sendMessage({
        down: 1
      });
    };


    // setTimeout(()=>{
    // 关闭socket
    wx.closeSocket({
      url: this.data.wsUrl
    });
    // },2000)
    console.log('监听页面卸载----------------下麦');
    // console.log('生命周期函数--监听页面卸载222222222');


  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})