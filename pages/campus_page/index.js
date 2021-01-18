// pages/campus_page/index.js
const app = getApp()
const {
  getSchoolList
} = require('../../utils/request');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingShow: false,
    active: 0,
    allList: [{
      "fileUrl":"../../assets/buried.jpg",
      "telephone":"13823888888",
      "address":"我是神圣兽国游尾郡窝窝乡独行族妖侠蛮吉",
    },
    {
      "fileUrl":"../../assets/buried.jpg",
      "telephone":"13823888888",
      "address":"我是神圣兽国游尾郡窝窝乡独行族妖侠蛮吉",
    },
    {
      "fileUrl":"../../assets/buried.jpg",
      "telephone":"13823888888",
      "address":"我是神圣兽国游尾郡窝窝乡独行族妖侠蛮吉",
    },
    {
      "fileUrl":"../../assets/buried.jpg",
      "telephone":"13823888888",
      "address":"我是神圣兽国游尾郡窝窝乡独行族妖侠蛮吉",
    },
    {
      "fileUrl":"../../assets/buried.jpg",
      "telephone":"13823888888",
      "address":"我是神圣兽国游尾郡窝窝乡独行族妖侠蛮吉",
    },
    {
      "fileUrl":"../../assets/buried.jpg",
      "telephone":"13823888888",
      "address":"我是神圣兽国游尾郡窝窝乡独行族妖侠蛮吉",
    },
    {
      "fileUrl":"../../assets/buried.jpg",
      "telephone":"13823888888",
      "address":"我是神圣兽国游尾郡窝窝乡独行族妖侠蛮吉",
    }],
    bjList: [
    {
      "fileUrl":"../../assets/buried.jpg",
      "telephone":"13823888888",
      "address":"应该是天下会的会长，是十佬，是这天下所有的强者，我要干翻的，是这苍穹。",
    },
    {
      "fileUrl":"../../assets/buried.jpg",
      "telephone":"13823888888",
      "address":"应该是天下会的会长，是十佬，是这天下所有的强者，我要干翻的，是这苍穹。",
    },
    {
      "fileUrl":"../../assets/buried.jpg",
      "telephone":"13823888888",
      "address":"应该是天下会的会长，是十佬，是这天下所有的强者，我要干翻的，是这苍穹。",
    },
    {
      "fileUrl":"../../assets/buried.jpg",
      "telephone":"13823888888",
      "address":"应该是天下会的会长，是十佬，是这天下所有的强者，我要干翻的，是这苍穹。",
    },
    {
      "fileUrl":"../../assets/buried.jpg",
      "telephone":"13823888888",
      "address":"应该是天下会的会长，是十佬，是这天下所有的强者，我要干翻的，是这苍穹。",
    }
    ],
    shList: [
    {
      "fileUrl":"../../assets/buried.jpg",
      "telephone":"13823888888",
      "address":"善良的樵夫呦，你定的是这把金斧头，还是这把银斧头？",
    }
    ,
    {
      "fileUrl":"../../assets/buried.jpg",
      "telephone":"13823888888",
      "address":"善良的樵夫呦，你定的是这把金斧头，还是这把银斧头？",
    }
    ,
    {
      "fileUrl":"../../assets/buried.jpg",
      "telephone":"13823888888",
      "address":"善良的樵夫呦，你定的是这把金斧头，还是这把银斧头？",
    }
    ,
    {
      "fileUrl":"../../assets/buried.jpg",
      "telephone":"13823888888",
      "address":"善良的樵夫呦，你定的是这把金斧头，还是这把银斧头？",
    }
    ],
    showMsg: false
  },
  onChange(event) {
    wx.showToast({
      title: `已切换到 ${event.detail.title}列表`,
      icon: 'none',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  tabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.tabBar();
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