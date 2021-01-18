//获取应用实例
var app = getApp();
// var md5 = require('libs/jsontool')
var md5 = require('../../libs/md5tool.js')
var secretTool = require('../../libs/secrettool.js')
//引入接口文件
var call = require("../../utils/request.js");
const {
  homePage,
  getOpenId
} = require('../../utils/request');
//
Page({
  data: {
    loadingShow: false,
    h5Url: "#",
    courseList: [{
      "fileUrl": "../../assets/buried.jpg",
      "newsShareUrl": "#",
      "title": "标题"
    }, {
      "fileUrl": "../../assets/buried.jpg",
      "newsShareUrl": "#",
      "title": "标题"
    }, {
      "fileUrl": "../../assets/buried.jpg",
      "newsShareUrl": "#",
      "title": "标题"
    }, {
      "fileUrl": "../../assets/buried.jpg",
      "newsShareUrl": "#",
      "title": "标题"
    }],
    bannerList: [{
        "fileUrl": "",
        "newsShareUrl": "../../assets/buried.jpg"
      },
      {
        "fileUrl": "",
        "newsShareUrl": "../../assets/buried.jpg"
      }
    ],
    videoList: [{
        "fileUrl": "../../assets/buried.jpg",
        "title": "列表标题",
        "flag_text": "副标题",
        "flag": "标签分类",
        "synopsis": " 海上生明月，天涯共此时.情人怨遥夜，竟夕起相思。",
        "time": "2020-09-01",
        "pageUrl": "#"
      },
      {
        "fileUrl": "../../assets/buried.jpg",
        "title": "列表标题",
        "flag_text": "副标题",
        "flag": "标签分类",
        "synopsis": " 海上生明月，天涯共此时.情人怨遥夜，竟夕起相思。",
        "time": "2020-09-01",
        "pageUrl": "#"
      },
      {
        "fileUrl": "../../assets/buried.jpg",
        "title": "列表标题",
        "flag_text": "副标题",
        "flag": "标签分类",
        "synopsis": " 海上生明月，天涯共此时.情人怨遥夜，竟夕起相思。",
        "time": "2020-09-01",
        "pageUrl": "#"
      },
      {
        "fileUrl": "../../assets/buried.jpg",
        "title": "列表标题",
        "flag_text": "副标题",
        "flag": "标签分类",
        "synopsis": " 海上生明月，天涯共此时.情人怨遥夜，竟夕起相思。",
        "time": "2020-09-01",
        "pageUrl": "#"
      }
    ],
    informationList: [{
        "fileUrl": "../../assets/buried.jpg",
        "title": "内容标题",
        "summary": "副标题或内容副标题或内容副标题或内容副标题或内容",
        "activityTime": "2020-09-01",
        "pageUrl": "#"
      },
      {
        "fileUrl": "../../assets/buried.jpg",
        "title": "内容标题",
        "summary": "副标题或内容副标题或内容副标题或内容副标题或内容",
        "activityTime": "2020-09-01",
        "pageUrl": "#"
      },
      {
        "fileUrl": "../../assets/buried.jpg",
        "title": "内容标题",
        "summary": "副标题或内容副标题或内容副标题或内容副标题或内容",
        "activityTime": "2020-09-01",
        "pageUrl": "#"
      },
      {
        "fileUrl": "../../assets/buried.jpg",
        "title": "内容标题",
        "summary": "副标题或内容副标题或内容副标题或内容副标题或内容",
        "activityTime": "2020-09-01",
        "pageUrl": "#"
      },
      {
        "fileUrl": "../../assets/buried.jpg",
        "title": "内容标题",
        "summary": "副标题或内容副标题或内容副标题或内容副标题或内容",
        "activityTime": "2020-09-01",
        "pageUrl": "#"
      },
      {
        "fileUrl": "../../assets/buried.jpg",
        "title": "内容标题",
        "summary": "副标题或内容副标题或内容副标题或内容副标题或内容",
        "activityTime": "2020-09-01",
        "pageUrl": "#"
      },

    ]
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
    // //同意授权
    // wx.login({
    //   //获取code 使用wx.login得到的登陆凭证，用于换取openid
    //   success: (res) => {
    //     console.log(res.code)
    //     //调用封装的方法
    //     call.getData(`/?code=${res.code}`, data => {
    //       // 判断是否获取到 openid
    //       console.log(data)
    //       if (data.errorCode == 0) {
    //         wx.setStorageSync("openId", data.data.openid)
    //       } else {
    //         wx.showToast({
    //           title: data.message,
    //           icon: 'none',
    //         });
    //       }
    //     }, err => {
    //       console.log(err)
    //     });
    //   }
    // });

    var oring = {
      "studentId": "111",
      "time_stamp": "1527132315"
    }
    var jsonstr = JSON.stringify(oring);
    var newstr = 'partner=1000000&appkey=xxxxx&data=' + jsonstr;
    this.getNewsInfo();
    // homePage().then((res) => {
    //   this.setData({
    //     // bannerList: res.data.bannerList,
    //     // informationList: res.data.newsList
    //   })
    //   console.log(res)
    //   // 关闭loading
    //   this.setData({
    //     loadingShow: false
    //   })
    // }).catch(res => {
    //   console.log(res);
    //   // 关闭loading
    //   this.setData({
    //     loadingShow: false
    //   })
    //   wx.showToast({
    //     title: `数据读取失败，请稍后再试`,
    //     icon: 'none',
    //   });
    // })
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