/**
 * js 排序 --------------------- by Wang 20190416
 */
const sortArr={
	/** 二维数组排序 
	 * prop: 二维数组中要排序的对象中的key， 如'value'
	 **/
	compare: function (prop) {
	  return function (obj1, obj2) {
	    var val1 = obj1[prop];
	    var val2 = obj2[prop];
	    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
	      val1 = Number(val1);
	      val2 = Number(val2);
	    }
	    if (val1 < val2) {
	      return -1;
	    } else if (val1 > val2) {
	      return 1;
	    } else {
	      return 0;
	    }
	  }
	},
};


export default sortArr;
