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
    loadingShow: true,
    active: 0,
    allList: [],
    bjList: [],
    shList: [],
    showMsg: false
  },
  onChange(event) {
    wx.showToast({
      title: `已切换到 ${event.detail.title}校区`,
      icon: 'none',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getSchoolList().then(res => {
      this.setData({
        allList: res.data
      })
      let bjSchool = [];
      let shSchool = [];
      this.data.allList.map(obj => {
        if (obj.regionId == 1) {
          bjSchool.push(obj);
        } else if (obj.regionId == 2) {
          shSchool.push(obj);
        }
      })
      this.setData({
        bjList: bjSchool,
        shList: shSchool
      })
      // 关闭loading
      this.setData({
        loadingShow: false
      })
    }).catch(res => {
      this.setData({
        showMsg: true,
        loadingShow: false
      })
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