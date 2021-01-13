// pages/turntable/index.js
var call = require("../../utils/request.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getiphoneShowL: true, // 手机号弹窗是否显示
    phoneNum: "", // 当前手机号码
    domTitle: "桔子树转盘抽奖", // 标题
    beEnableNum: "0", // 抽奖次数
    drawRecordMain: [], // 抽奖记录
    congratulationsShow: false, //中奖结果页面是否展示
    congratulationsContent: "未知结果", //中奖结果
    ifLuckyMay: true, //是否可以抽奖
    ifLuckyMaim:null,// 抽奖描述
    zpData: {
      equalParts: null, //一共多少等份
      oneAngle: null, //每一等份多少度
      // ******** 转盘奖品数据：后台获取数据 ******** 
      //注： 根据转盘图片对应的值（转盘图片指针处顺时针向右数 起始1 奖品对应的格子数【第几等份上】）
      awardSetting: [
        '一等奖',
        '二等奖',
        '三等奖',
        '一等奖',
        '二等奖',
        '三等奖',
      ],
    },
    ifRoate: false, //转盘是否在转动（判断阻止多次点击）
    zpRotateDeg: '', //旋转角度
    beOpenId: "",
    beStudentId: "", // 学生ID
    beSchoolId: null, // 学校ID
    // ******** 抽奖结果数据：后台获取数据 ********
    curKey: null, //抽奖结果
    ifWinning: null, //是否中奖
    // prizeInfo: [{
    //   name: "王二炮获得：",
    //   prize: "王者之力（永久）"
    // }, {
    //   name: "北京一枝花丶获得：",
    //   prize: "M4N1-雷神（永久）"
    // }, {
    //   name: "buied-Lcel获得：",
    //   prize: "王者之力（永久）"
    // }, {
    //   name: "爷傲灬奈我何获得：",
    //   prize: "99999CF点"
    // }, {
    //   name: "华南第一狙获得：",
    //   prize: "王者之力（永久）"
    // }, ]
  },

  // 输入手机号码
  bindKeyInputTurn: function (e) {
    console.log(e)
    this.setData({
      phoneNum: e.detail.value
    })
  },
  //点击获取手机号码按钮
  getPhoneNumber: function (e) {
    var that = this;
    wx.checkSession({
      success: function () {
        var ency = e.detail.encryptedData;
        var iv = e.detail.iv;
        // var sessionk = that.data.sessionKey;
        if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
          that.setData({
            modalstatus: true
          });
        } else {
          //同意授权
          wx.login({
            //获取code 使用wx.login得到的登陆凭证，用于换取openid
            success: (res) => {
              call.request('/onlineeducation/api/wechat/authorizationGetMobile', {
                data: {
                  encrypdata: ency,
                  ivdata: iv,
                  jsCode: res.code,
                  steps: "2", //  已获取手机号 （写死）
                }
              }, res => {
                if (res.errorCode == 0) {
                  that.setData({
                    phoneNum: JSON.parse(res.data.mobile).phoneNumber
                  })
                  wx.showToast({
                    title: "授权成功!",
                    icon: 'none',
                  });
                } else {
                  wx.showToast({
                    title: "授权失败,请重试",
                    icon: 'none',
                  });
                }
              }, err => {
                wx.showToast({
                  title: "授权失败,请重试",
                  icon: 'none',
                });
              });
            }
          });
        }
      },
      fail: function () {
        wx.showToast({
          title: "session_key失效，请重新登录",
          icon: 'none',
        });
        console.log("session_key 已经失效，需要重新执行登录流程");
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      beSchoolId: options.schoolId,
    })
    //同意授权
    wx.login({
      //获取code 使用wx.login得到的登陆凭证，用于换取openid
      success: (res) => {
        //调用封装的方法
        call.getData(`/identity/api/WeChat/WechatInfo?code=${res.code}`, data => {
          console.log(data)
          // 判断是否获取到 openid
          if (data.errorCode == 0) {
            this.setData({
              beOpenId: data.data.openid,
            })
          } else {
            wx.showToast({
              title: data.message,
              icon: 'none',
            });
            this.setData({
              beOpenId: "99999",
            })
          }
        }, err => {
          console.log(err)
        });
      }
    });
  },

  // 点击手机号确定
  submitClick: function () {
    if (this.data.phoneNum == "") {
      wx.showToast({
        title: "请输入或授权手机号",
        icon: 'none',
      });
      return;
    }
    let phoneRegular = /^1[3456789]\d{9}$/;
    if (phoneRegular.test(this.data.phoneNum) == false) {
      wx.showToast({
        title: "手机号格式不正确",
        icon: 'none',
      });
      return;
    }
    this.getDrawDataFn("false");
  },
  // 获取抽奖数据
  getDrawDataFn: function (staMain) {
    // 传入数据判断当前用户信息
    call.request('/onlineeducation/api/wechat/getWxMiniLottery', {
      data: {
        mobile: this.data.phoneNum, //参与抽奖的手机号
        openId: this.data.beOpenId, //参与抽奖的微信用户标识
        schoolId: this.data.beSchoolId // 校区
      }
    }, res => {
      if (res.errorCode == 0) {
        this.setData({
          beEnableNum: res.data.enableNum ? res.data.enableNum : 0, // 抽奖次数
          beStudentId: res.data.studentId, // 学生id
          domTitle: res.data.schoolName, // 校区名称
          drawRecordMain: res.data.lotteryRecordList, // 中奖记录
          getiphoneShowL: false //手机号弹窗
        });
        if (res.data.enableLottery) {
          // 是否可以调用抽奖接口
          this.setData({
            ifLuckyMay: true, // 是否可以抽奖
          });
        } else {
          this.setData({
            beEnableNum: 0, // 抽奖次数
            ifLuckyMay: false, // 是否可以抽奖
            ifLuckyMaim:res.message,// 抽奖描述
          });
          if(staMain=="false"){
            wx.showModal({
              title: '温馨提示',
              showCancel: false,
              content: res.message,
            })
          }
        }
      } else {
        this.setData({
          beEnableNum: 0, // 抽奖次数
          getiphoneShowL: false //手机号弹窗
        });
        wx.showToast({
          title: res.message,
          icon: 'none',
        });
      }
    }, err => {
      wx.showToast({
        title: err.errMsg,
        icon: 'none',
      });
      console.error(err.errMsg);
    })
  },
  //点击抽奖
  getLucky: function () {
    // 如果在转动 就不允许点击
    if (this.data.ifRoate) return;
    if (this.data.ifLuckyMay == false) {
      wx.showModal({
        title: '温馨提示',
        showCancel: false,
        content: this.data.ifLuckyMaim,
      })
      return;
    }else{
      this.setData({
        ifLuckyMaim: null // 是否中将 (预留)
      });
    }
    this.setData({
      zpRotateDeg: '',
    });
    // 请求后台获取抽奖结果中...
    call.request('/onlineeducation/api/wechat/addWxLottery', {
      data: {
        "openId": this.data.beOpenId,
        "studentId": this.data.beStudentId,
        "schoolId": this.data.beSchoolId // 校区
      }
    }, res => {
      /*test*/
      if (res.errorCode == 0) {
        this.setData({
          ifRoate: true, //转盘是否在转动
          zpRotateDeg: '',
          curKey: res.data.ranking, // 中奖结果
          ifWinning: false // 是否中将 (预留)
        });
        this.setRotate(res.data.ranking);
      } else {
        wx.showModal({
          title: '温馨提示',
          showCancel: false,
          content: res.message,
        })
      }
    }, err => {
      console.error(err.errMsg);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  // 获取转盘初始数据
  getZpData() {
    let awardSetting = 'zpData.awardSetting';
    this.setData({
      [awardSetting]: [
        '一等奖',
        '二等奖',
        '三等奖',
        '一等奖',
        '二等奖',
        '三等奖',
      ],
    });
    this.setZpDefault();
  },
  // 根据转盘初始数据设置转盘初始关键参数
  setZpDefault() {
    let equalPartsNum = this.data.zpData.awardSetting.length;
    let oneAngleNum = 360 / equalPartsNum;
    let equalParts = 'zpData.equalParts';
    let oneAngle = 'zpData.oneAngle';
    this.setData({
      //一共多少等份
      [equalParts]: equalPartsNum,
      // 根据转盘得等份数设置 每一等份多少度
      [oneAngle]: oneAngleNum,
    });
  },

  // 设置旋转动效
  setToRotate(degNum) {
    this.setData({
      zpRotateDeg: '-webkit-transform: rotate(' + degNum + 'deg);transform: rotate(' + degNum + 'deg);-webkit-transition: all 8s ease;transition: all 8s ease;',
    });
  },
  //根据 设置的 指针停止时指向的格子（中奖结果），设置其旋转角度区间
  setRotate(awardSettingNumber) { //awardSettingNumber  取值范围 1 至 总格子数
    setTimeout(() => {
      //转盘停止时 指针 指向的格子 最小角度
      let minAngle = 360 - awardSettingNumber * this.data.zpData.oneAngle + 5;
      //转盘停止时 指针 指向的格子 最大角度
      let maxAngle = 360 - (awardSettingNumber - 1) * this.data.zpData.oneAngle - 5;
      //旋转区间
      let newAngle = Math.floor(minAngle + Math.random() * (maxAngle - minAngle)) + 360 * 15;
      console.log(newAngle)
      this.setToRotate(newAngle);
      setTimeout(() => {
        this.roateEnd(awardSettingNumber);
      }, 5150);
    }, 100);
  },
  //旋转结束执行
  roateEnd(awardSettingNumber) {
    console.log('当前指向格子数 -- ' + awardSettingNumber, this.data.curKey);
    setTimeout(() => {
      // 是否中奖
      this.setData({
        congratulationsShow: true, // 中奖结果页面是否展示
        congratulationsContent: this.data.zpData.awardSetting[this.data.curKey - 1],
      });
      if (this.data.ifWinning) {
        // console.log('中奖');
      } else {
        // console.log('未中奖');
      }
      this.setData({
        ifRoate: false, //转盘是否在转动
      });
      // 刷新 抽奖数据
      this.getDrawDataFn("true");
    }, 3000)
  },
  // 开心收下
  takeClick: function () {
    this.setData({
      congratulationsShow: false, //中奖结果页面是否展示
      congratulationsContent: "未知结果",
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
    this.getZpData();
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