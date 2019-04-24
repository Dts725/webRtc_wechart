function exchange(old) {
  const relationship = [
    { id: '1', time: '07:00-08:00' },
    { id: '2', time: '08:00-09:00' },
    { id: '3', time: '09:00-10:00' },
    { id: '4', time: '10:00-11:00' },
    { id: '5', time: '11:00-12:00' },
    { id: '6', time: '12:00-13:00' },
    { id: '7', time: '13:00-14:00' },
    { id: '8', time: '14:00-15:00' },
    { id: '9', time: '15:00-16:00' },
    { id: '10', time: '16:00-17:00' },
    { id: '11', time: '17:00-18:00' },
    { id: '12', time: '18:00-19:00' }
  ];

  old.forEach(function (item) {

    //获取日期所在周数
    switch (new Date(item.day).getDay()) {
      case 0:
        item.day = item.day + " " + '周日'
        break;
      case 1:
        item.day = item.day + " " + '周一'
        break;
      case 2:
        item.day = item.day + " " + '周二'
        break;
      case 3:
        item.day = item.day + " " + '周三'
        break;
      case 4:
        item.day = item.day + " " + '周四'
        break;
      case 5:
        item.day = item.day + " " + '周五'
        break;
      case 6:
        item.day = item.day + " " + '周六'
        break;
    }
    //将moment字符串中的数字段截成数组
    let moment = item.moment.split(',')

    for (let i = 0; i < relationship.length; i++) {
      if (moment.length == 0) {
        if (moment[0] == relationship[i].id) {
          item.moment = relationship[i].time
        }
      } else {
        if (moment[0] == relationship[i].id) {
          item.moment = relationship[i].time.substr(0, 6)
        }
        if (moment[moment.length - 1] == relationship[i].id) {
          item.moment = item.moment + relationship[i].time.slice(6)
          break;
        }
      }
    }
  })


}

module.exports = {
  exchange
};