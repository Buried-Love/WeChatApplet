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
    loadingShow: true,
    bannerList: [],
    activityList: [],
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
    homePage().then((res) => {
      this.setData({
        bannerList: res.data.bannerList,
        informationList: res.data.newsList,
        activityList: res.data.activityList
      })
      console.log(res);
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