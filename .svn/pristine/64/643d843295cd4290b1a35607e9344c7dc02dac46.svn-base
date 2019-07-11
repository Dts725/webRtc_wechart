/** 防止用户重复点击  接收time单位
 * 使用方法：1、引入此limitMoreClick.js 文件  let limitMoreClick = require('../utils/limitMoreClick.js');
 * 2、if(limitMoreClick.no_more()>0){......}else{return;}   /    if(limitMoreClick.no_more()<1){return;}
 * **/
// function limitMoreClick() {};
const limitMoreClick = {
  moreClick:1,  // 用来防止重复点击的
  moreClickTimer:'',  // 用来防止重复点击的 计时器
};

// 防止多次点击调用的函数  返回1或0， 1为点击了一次，0为不可点击
limitMoreClick.no_more = function(time){
  time = time && typeof(time)=='number'?time:500;
  if(this.moreClickTimer){
    clearTimeout(this.moreClickTimer);
  }
  let n=0,_this=this;
  if(this.moreClick==1){
    this.moreClick--;
    n=1;
  }
  this.moreClickTimer = setTimeout(()=>{
    _this.moreClick = 1;
  },time);
  return n;
};

module.exports = limitMoreClick;
