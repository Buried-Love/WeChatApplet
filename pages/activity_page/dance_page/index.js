// pages/activity_page/vocal_music/index.js
import Toast from '@vant/weapp/toast/toast';
const {
  getUserInfo
} = require('../../../utils/request');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerUrl: "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/dance/banner.png",
    content2List: [{
        imgUrl: "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/music/children1.png",
        title: "想丰富业余生活",
        detail: "喜欢舞蹈、因为工作学业的繁忙错失学习舞蹈的良机"
      },
      {
        imgUrl: "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/music/children2.png",
        title: "想培养兴趣爱好",
        detail: "渴望孩子有一项自我展示的才艺，想培养孩子的自信和气质"
      }
    ],
    tecaherList: [{
        imgUrl: "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/dance/wu1.png",
        name: "徐文婷",
        detail: ["教龄：5年", "教学课程：中国舞、古典舞、民族舞、芭蕾舞"] },
      {
        imgUrl: "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/dance/wu2.png",
        name: "王琪",
        detail: ["教龄：7年", "教学课程：中国舞、古典舞、民族民间、现代舞、肚皮舞、爵士、街舞"]
      },
      {
        imgUrl: "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/dance/wu3.png",
        name: "王佳颖",
        detail: ["教龄：2年", "教学课程：爵士舞，少儿舞，中国舞，民族舞，芭蕾形体"]
      }
    ],
    campusList: [{
        imgUrl: "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/music/campus1.png",
        name: "大望路校区",
        detail: ["电 话：400-900-8898", "地 址：朝阳区万达广场"]
      },
      {
        imgUrl: "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/music/campus2.png",
        name: "青年路校区",
        detail: ["电 话：400-900-8898", "地 址：朝阳区青年路甘露源"]
      },
      {
        imgUrl: "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/music/campus3.png",
        name: "五道口校区",
        detail: ["电 话：400-900-8898", "地 址：五道口华联商城"]
      }
    ],
    columns: ['声乐', '美术', '器乐', '舞蹈'],
    show: false,
    formValue_course: "请选择课程",
    formValue_name: "",
    formValue_tel: "",
    urlOpenId: "",
    urlMarketId: "",
    loadingShow: false
  },
  showPopup() {
    this.setData({
      show: true
    })
  },
  rollBottom() {
    // 跳转提交表单
    wx.pageScrollTo({
      selector: ".form_box"
    })
  },
  confirm(e) {
    let val = e.detail.value;
    this.setData({
      show: false,
      formValue_course: val
    })
  },
  cancel() {
    this.setData({
      show: false
    })
  },
  validateForm() {
    //本地存储拿openid
    this.setData({
      urlOpenId: wx.getStorageSync('openId')
    })
    //验证表单
    const {
      formValue_course,
      formValue_name,
      formValue_tel
    } = this.data;
    let rel = /^1[3456789]\d{9}$/;
    if (formValue_course == "请选择课程") {
      Toast.fail('请选择课程');
      return false;
    }
    if (formValue_name == "") {
      Toast.fail('请输入姓名');
      return false;
    }
    if (formValue_tel == "") {
      Toast.fail('请输入手机号码');
      return false;
    }
    if (!rel.test(formValue_tel)) {
      Toast.fail('请输入有效手机号码');
      return false;
    }
    //验证通过提交表单
    this.submit();
  },
  submit() {
    const {formValue_course, formValue_name, formValue_tel, urlOpenId} = this.data;
    this.setData({
      loadingShow: true
    })
    getUserInfo({
      course: formValue_course,
      name: formValue_name,
      tel: formValue_tel,
      openid: urlOpenId
    }).then(res => {
      //提交后清空表单
      if(res.errorCode == 0){
        this.setData({
          formValue_name: '',
          formValue_tel: '',
          loadingShow: false
         })
        console.log(res);
        Toast({
          type: 'success',
          message: '提交成功'
        });
      }else{
        this.setData({
          loadingShow: false
         })
        Toast({
          type: 'error',
          message: '提交失败,服务器错误'
        });
      }
    }).catch(res => {
      this.setData({
        loadingShow: false
       })
      Toast({
        type: 'error',
        message: '提交失败'
      });
      console.log(res);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      urlOpenId: options.openId,
      urlMarketId: options.marketId,
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