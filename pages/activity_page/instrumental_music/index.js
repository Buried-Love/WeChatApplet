// pages/activity_page/vocal_music/index.js
import Toast from '@vant/weapp/toast/toast';
const { getUserInfo } = require('../../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingShow: false,
    content2List:[
      {
        imgUrl:"https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/instrumental_img/guitar.png",
        title:"尤克里里"
      },
      {
        imgUrl:"https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/instrumental_img/amp.png",
        title:"吉他"
      },
      {
        imgUrl:"https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/instrumental_img/drum.png",
        title:"架子鼓"
      },
      {
        imgUrl:"https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/instrumental_img/piano.png",
        title:"钢琴"
      }
    ],
    tecaherList:[
      {
        imgUrl: "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/instrumental_img/yue1.png",
        name: "向定军",
        detail: ["教龄：5年","教学课程：架子鼓、架子鼓考级、少儿架子鼓"]
      },
      {
        imgUrl: "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/instrumental_img/yue2.png",
        name: "李东伟",
        detail: ["教龄：4年","教学课程：民谣吉他、电吉他、尤克里里、架子鼓"]
      },
      {
        imgUrl: "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/instrumental_img/yue3.png",
        name: "张亚军",
        detail: ["教龄：7年","教学课程：民谣吉他、电吉他、尤克里里、架子鼓"]
      }
    ],
    campusList:[
      {
        imgUrl: "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/music/campus1.png",
        name: "大望路校区",
        detail: ["电 话：400-900-8898","地 址：朝阳区万达广场"]
      },
      {
        imgUrl: "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/music/campus2.png",
        name: "青年路校区",
        detail: ["电 话：400-900-8898","地 址：朝阳区青年路甘露源"]
      },
      {
        imgUrl: "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/music/campus3.png",
        name: "五道口校区",
        detail: ["电 话：400-900-8898","地 址：五道口华联商城"]
      }
    ],
    columns: ['声乐', '美术', '器乐', '舞蹈'],
    show: false,
    formValue_course:"请选择课程",
    formValue_name: "",
    formValue_tel: "",
    urlOpenId: "",
    urlMarketId: ""
  },
  rollBottom() {
    // 跳转提交表单
    wx.pageScrollTo({
      selector: ".form_box"
    })
  },
  showPopup(){
    this.setData({
      show: true
    })
  },
  confirm(e){
    let val = e.detail.value;
    this.setData({
      show: false,
      formValue_course: val
    })
  },
  cancel(){
    this.setData({
      show: false
    })
  },
  validateForm() {
    //本地存储拿openid
    this.setData({
      urlOpenId: wx.getStorageSync('openId')
    })
    // 验证表单
    const {formValue_course, formValue_name, formValue_tel} = this.data;
    let rel= /^1[3456789]\d{9}$/;
    if(formValue_course == "请选择课程"){
      Toast.fail('请选择课程');
      return false;
    }
    if(formValue_name == ""){
      Toast.fail('请输入姓名');
      return false;
    }
    if(formValue_tel == ""){
      Toast.fail('请输入手机号码');
      return false;
    }
    if(!rel.test(formValue_tel)){
      Toast.fail('请输入有效手机号码');
      return false;
    }
    this.submit();//提交表单调用
  },
  submit(){
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
    console.log(this.data.urlOpenId)
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