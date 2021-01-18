//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: 'Hi 开发者！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    menuList:[
      {
        "href": "../activity_page/fineArts_page/index",
        "icon": "../../assets/buried.jpg",
        "text": "意见反馈"
      },
      {
        "href": "../activity_page/fineArts_page/index",
        "icon": "../../assets/buried.jpg",
        "text": "浏览历史"
      },
      {
        "href": "../activity_page/fineArts_page/index",
        "icon": "../../assets/buried.jpg",
        "text": "在线客服"
      },
      {
        "href": "../activity_page/fineArts_page/index",
        "icon": "../../assets/buried.jpg",
        "text": "分享"
      },
      {
        "href": "../activity_page/fineArts_page/index",
        "icon": "../../assets/buried.jpg",
        "text": "设置"
      },
      {
        "href": "../activity_page/fineArts_page/index",
        "icon": "../../assets/buried.jpg",
        "text": "退出登录"
      }
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //阻止点击事件
  clickStop() {
    wx.showToast({
      title: `维护中，敬请期待`,
      icon: 'none',
    });
  },
  // tabBar
  tabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.tabBar();
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})