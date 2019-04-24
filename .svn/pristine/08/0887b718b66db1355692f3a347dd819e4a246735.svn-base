/**
 * Created by wang on 18/08/02.
 */

const validate = {
  /** 合法uri **/
  validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval);
  },

  /** 全小写字母 **/
  validateLowerCase(str) {
    const reg = /^[a-z]+$/;
    return reg.test(str);
  },

  /** 全大写字母 **/
  validateUpperCase(str) {
    const reg = /^[A-Z]+$/;
    return reg.test(str);
  },

  /** 大小写字母 **/
  validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
  },

  /** 空值 **/
  validateEmpty(str) {
    return str.trim() == '';
  },
  /** 最多两位小数数字--纯整数通过，超过两位小数返回false **/
  validateDecimalTwo(str) {
    return str.search(/^\d*(?:\.\d{0,2})?$/) !== -1;
  },

  /** 包含中文 **/
  validatIncludeChinese(str) {
    const reg = /[\u4E00-\u9FA5]/;
    return reg.test(str);
  },
  /** 判断是否纯汉字 **/
  isCharacter(str) {
    const reg = /^[\u4e00-\u9fa5]{0,}$/;
    return reg.test(str);
  },

  /** 行首行尾去空格 **/
  validatSpace(str) {
    return str.replace(/^\s*|\s*$/g, '');
  },
  /** Email **/
  validatEmail(str) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test(str);
  },
  /** QQ号码 **/
  validatQQ(str) {
    const reg = /^[1-9][0-9]{4,10}$/;
    return reg.test(str);
  },
  /** 微信号 **/
  validatWechat(str) {
    const reg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
    return reg.test(str);
  },
  /** 车牌号 **/
  validatCarNumber(str) {
    const reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/;
    return reg.test(str);
  },

  /** 邮政编码 **/
  validatZipCode(str) {
    const reg = /[1-9]\d{5}/;
    return reg.test(str);
  },
  /** 身份证 **/
  validatIDCard(str) {
    const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return reg.test(str);
  },
  /** 手机号 **/
  validatPhone(str) {
    const reg = /^((1[356789][0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    // const reg = /^((1[3|5|6|7|8|9][0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    return reg.test(str);
  },

  /** 用户名正则，4到16位（字母，数字，下划线，减号） **/
  validatUserName(str) {
    const reg = /^[a-zA-Z0-9_-]{4,16}$/;
    return reg.test(str);
  },
  /** 密码强度正则, 接收 密码 和 强度（low、middle、strong）, 返回对象 **/
  validatUserPwd(str, level) {
    let reg = '', status = '';
    if (level == 'strong') {
      // 强，6-20位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
      reg = /^.*(?=.{6,20})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[_!@#$%^&*?]).*$/;
      status = '至少1个大写字母，1个小写字母，1个数字，1个特殊字符';
    } else if (level == 'middle') {
      // 中等，最少6位，包括至少1个大写字母，1个小写字母，1个数字
      reg = /^.*(?=.{6,20})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
      status = '至少1个大写字母，1个小写字母，1个数字';
    } else {
      // 弱，6-20位，字母或数字
      reg = /^.*(?=.{6,20})((?=.*\d)|(?=.*[a-z])).*$/;
      status = '6-20位，字母或数字';
    }
    return {validat: reg.test(str), status: status};
  },

  /** IPv4地址 **/
  validatIPv4(str) {
    const reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return reg.test(str);
  },
  /** 十六进制颜色 **/
  validatHex16(str) {
    const reg = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
    return reg.test(str);
  },

  /** 日期，只检测年月日不含时间，可判断2月29，如：1980/08/08   1980-08-08 **/
  validatDate(str) {
    const reg = /^(?:(?!0000)[0-9]{4}(-|\/)(?:(?:0[1-9]|1[0-2])(-|\/)(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])(-|\/)(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)(-|\/)02(-|\/)29)$/;
    return reg.test(str);
  },
  /** 日期和时间，可判断2月29，如：1980/08/08 08:08:08   1980-08-08 8:8:8 **/
  validatDateTime(str) {
    const reg = /^(?:(?!0000)[0-9]{4}(-|\/)(?:(?:0[1-9]|1[0-2])(-|\/)(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])(-|\/)(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)(-|\/)02(-|\/)29)(\s{1,8}\d{1,2}:\d{1,2}:\d{1,2})?$/;
    return reg.test(str);
  },

};

export default validate;
