//获取应用实例
var app = getApp();
// var md5 = require('libs/jsontool')
var md5 = require('../../libs/md5tool.js')
var secretTool = require('../../libs/secrettool.js')
//引入接口文件
var call = require("../../utils/request.js");
const {
  homePage, getOpenId
} = require('../../utils/request');
//
Page({
  data: {
    loadingShow: true,
    h5Url: "https://api.juzishu.com.cn/news/newsDetail.do?newsId=120",
    courseList: [{
      "fileUrl": "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/homePage/course1.png",
      "newsShareUrl": "../activity_page/vocal_music/index",
      "title": "声乐"
    }, {
      "fileUrl": "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/homePage/course2.png",
      "newsShareUrl": "../activity_page/fineArts_page/index",
      "title": "美术"
    }, {
      "fileUrl": "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/homePage/course3.png",
      "newsShareUrl": "../activity_page/instrumental_music/index",
      "title": "器乐"
    }, {
      "fileUrl": "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/homePage/course4.png",
      "newsShareUrl": "../activity_page/dance_page/index",
      "title": "舞蹈"
    }],
    bannerList: [{
        "fileUrl": "",
        "newsShareUrl": "../activity_page/vocal_music/index"
      },
      {
        "fileUrl": "",
        "newsShareUrl": "../activity_page/vocal_music/index"
      }
    ],
    videoList: [{
        "fileUrl": "",
        "title": "芭蕾舞公开课",
        "flag_text": "成人一对一",
        "flag": "热门课程",
        "synopsis": "爵士舞学习选择橘子树，祝您成为舞蹈达人！",
        "time": "2020-09-01",
        "pageUrl": "../activity_page/vocal_music/index"
      },
      {
        "fileUrl": "",
        "title": "声乐公开课",
        "flag_text": "儿童一对一",
        "flag": "",
        "synopsis": "爵士舞学习选择橘子树，祝您成为舞蹈达人！",
        "time": "2020-09-01",
        "pageUrl": "../activity_page/vocal_music/index"
      },
      {
        "fileUrl": "",
        "title": "吉他公开课",
        "flag_text": "成人一对一",
        "flag": "热门课程",
        "synopsis": "爵士舞学习选择橘子树，祝您成为舞蹈达人！",
        "time": "2020-09-01",
        "pageUrl": "../activity_page/vocal_music/index"
      },
      {
        "fileUrl": "",
        "title": "油画公开课",
        "flag_text": "成人一对一",
        "flag": "热门课程",
        "synopsis": "爵士舞学习选择橘子树，祝您成为舞蹈达人！",
        "time": "2020-09-01",
        "pageUrl": "../activity_page/vocal_music/index"
      }
    ],
    informationList: []
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
  },
  h5Link(event) {
    const postId = event.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../webView/index',
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          url: postId
        })
      }
    })
  },
  onLoad: function () {
 //同意授权
 wx.login({
  //获取code 使用wx.login得到的登陆凭证，用于换取openid
  success: (res) => {
    console.log(res.code)
    //调用封装的方法
    call.getData(`/identity/api/WeChat/WechatInfo?code=${res.code}`, data => {
      // 判断是否获取到 openid
      console.log(data)
      if (data.errorCode == 0) {
        wx.setStorageSync("openId", data.data.openid)
      } else {
        wx.showToast({
          title: data.message,
          icon: 'none',
        });
      }
    }, err => {
      console.log(err)
    });
  }
});

    var oring = {
      "studentId": "111",
      "time_stamp": "1527132315"
    }
    var jsonstr = JSON.stringify(oring);
    var newstr = 'partner=1000000&appkey=xxxxx&data=' + jsonstr;
    // console.log(newstr,md5.md5(newstr));
    // console.log(secretTool.getSignParmars({ "studentId": "111"}));
    this.getNewsInfo();
    homePage().then((res) => {
      this.setData({
        bannerList: res.data.bannerList,
        informationList: res.data.newsList
      })
      console.log(res)
      // 关闭loading
      this.setData({
        loadingShow: false
      })
    }).catch(res => {
      console.log(res);
      // 关闭loading
      this.setData({
        loadingShow: false
      })
      wx.showToast({
        title: `数据读取失败，请稍后再试`,
        icon: 'none',
      });
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.tabBar();

  },
  // tabBar
  tabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      console.log("123891273891273987")
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  // 获取新闻详情
  getNewsInfo: function () {
    wx.stopPullDownRefresh()
    wx.hideNavigationBarLoading()
    var that = this;
    wx.hideLoading();
    // },
    // fail: function(res) {

    // },
    // complete: function(res) {

    //   },
    // })
  },
})