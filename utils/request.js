var app = getApp();
//项目URL相同部分，减轻代码量，同时方便项目迁移
//引入域名,test测试,prod正式
const http = require('./http')
var host = '#'; // 正式服地址
/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
function request(url, postData, doSuccess, doFail) {
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    data: postData,
    method: 'POST',
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入
      doSuccess(res.data);
    },
    fail: function (err) {
      doFail(err);
    },
  })
}

//GET请求，不需传参，直接URL调用，
function getData(url, doSuccess, doFail) {
  wx.request({
    url: host + url,
    header: {
      "content-type": "application/json;charset=UTF-8"
    },
    method: 'GET',
    success: function(res) {
      doSuccess(res.data);
    },
    fail: function (error) {
      doFail(error);
    },
  })
}
//获取openid
function getOpenId(id) {
  return http({
    url: '/?code=' + id,
    data: '',
    type: 'GET'
  })
}
//获取首页信息
function homePage() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: '#',
      success(res) {
        resolve(res.data);
      },
      fail(res) {
        reject(res);
      }
    })
  })
}
//获取校区信息列表
function getSchoolList() {
  return http({
    url: '#',
    data: ''
  })
}
//提交用户表单信息
function getUserInfo(user) {
  return http({
    url: '#',
    data: {
      'data': {
        marketId: "2586",
        steps: "3",
        accessSource:"5",
        openId: user.openid,
        consultingCourse: user.course,
        studentName: user.name,
        mobile: user.tel
      }
    },
    type: 'POST'
  })
}
/**
 * module.exports用来导出代码
 * js文件中通过var call = require("../util/request.js")  加载
 * 在引入引入文件的时候"  "里面的内容通过../../../这种类型，小程序的编译器会自动提示，可能
 * 项目目录不止一级，不同的js文件对应的工具类的位置不一样
 */
module.exports.request = request;
module.exports.getData = getData;
module.exports.homePage = homePage;
module.exports.getSchoolList = getSchoolList;
module.exports.getUserInfo = getUserInfo;
module.exports.getOpenId = getOpenId;