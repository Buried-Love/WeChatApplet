// pages/Classes/Classes.js
//获取应用实例
var app = getApp();
const {
  homePage
} = require('../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingShow: false,
    bannerList: [
      {
        "fileUrl": "../../assets/buried.jpg",
        "newsShareUrl": "../../assets/buried.jpg"
      },
      {
        "fileUrl": "../../assets/buried.jpg",
        "newsShareUrl": "../../assets/buried.jpg"
      }
    ],
    activityList: [
      {
        "fileUrl": "../../assets/buried.jpg",
        "title": "列表标题",
        "pageUrl": "#"
      },
    ],
    informationList: [
      {
        "fileUrl": "../../assets/buried.jpg",
        "title": "列表标题",
        "flag_text": "副标题",
        "flag": "标签分类",
        "summary": " 海上生明月，天涯共此时.情人怨遥夜，竟夕起相思。",
        "activityTime": "2020-09-01",
        "pageUrl": "#"
      },
      {
        "fileUrl": "../../assets/buried.jpg",
        "title": "列表标题",
        "flag_text": "副标题",
        "flag": "标签分类",
        "summary": " 海上生明月，天涯共此时.情人怨遥夜，竟夕起相思。",
        "activityTime": "2020-09-01",
        "pageUrl": "#"
      },
      {
        "fileUrl": "../../assets/buried.jpg",
        "title": "列表标题",
        "flag_text": "副标题",
        "flag": "标签分类",
        "summary": " 海上生明月，天涯共此时.情人怨遥夜，竟夕起相思。",
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
    console.log(postId)
  },
  // tabBar
  tabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // homePage().then((res) => {
    //   this.setData({
    //     bannerList: res.data.bannerList,
    //     informationList: res.data.newsList,
    //     activityList: res.data.activityList
    //   })
    //   console.log(res);
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.tabBar()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})