// pages/fillInTheInfo/fillInTheInfo.js
//引入接口文件
var call = require("../../utils/request.js");
// 引入SDK核心类
var bmap = require('../../utils/bmap-wx.js');

//获取应用实例
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topSpreadBannerUrl: "https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/img/spreadBanner3.jpg", // 顶部地址
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // focusComponentShow: 0, // 关注组件
    loadingShow: false, // 是否弹出loading
    tipsShow: 0, // 轻提示
    tipsMain: "", // 轻提示内容
    currentPosition: "", //当前位置
    currentPositionShow: false, // 当前位置 是否选择
    currentArea: "", // 当前区域
    lng: "", // 经度
    lat: "", // 维度
    positionDescription: "授权获取", // 当前位置描述信息
    urlOpenId: "", // openid
    urlMarketId: "", // 教师ID
    phoneNum: "", //  当前授权获取的手机号
    jzsUserName: "", // 学生姓名
    sexStr: "", // 学生性别
    sexText: "男", // 当前性别文字
    picker: ['3岁', '4岁', '5岁', '6岁', '7岁', '8岁', '9岁', '10岁', '11岁', '成人'],
    pickerString: "", // 当先选择的年龄
    wxCodeData: "", // 微信code
    checkboxArr: [{
      name: '声乐',
      checked: false
    }, {
      name: '舞蹈',
      checked: false
    }, {
      name: '器乐',
      checked: false
    }, {
      name: '美术',
      checked: false
    }],
  },
  // 选择年龄
  PickerChange(e) {
    this.setData({
      index: e.detail.value,
      pickerString: this.data.picker[e.detail.value]
    })
  },
  // 选择性别
  sexChange(e) {
    this.setData({
      sexStr: e.detail.value == false ? '0' : '1'
    })
    this.setData({
      sexText: e.detail.value == false ? '女' : '男'
    })
  },
  // 选择意向课程
  checkbox: function (e) {
    var index = e.currentTarget.dataset.index; //获取当前点击的下标
    var checkboxArr = this.data.checkboxArr; //选项集合
    checkboxArr[index].checked = !checkboxArr[index].checked; //改变当前选中的checked值
    this.setData({
      checkboxArr: checkboxArr
    });
  },
  checkboxChange: function (e) {
    var checkValue = e.detail.value;
    this.setData({
      checkValue: checkValue
    });
    console.log(this.data.checkValue) //所有选中的项的value
  },
  // 输入当前区域
  currentAreaInput: function (e) {
    this.setData({
      currentArea: e.detail.value
    })
  },
  // 输入当前位置
  currentPositionInput: function (e) {
    this.setData({
      currentPosition: e.detail.value
    })
  },
  // 获取当前位置
  getPresentLocation: function () {
    var that = this
    // 打开loading
    that.setData({
      loadingShow: true
    })
    // 新建百度地图对象
    var BMap = new bmap.BMapWX({
      ak: 'vLq84IxVQGxHKnablwT1VZOQh1eNt3z8'
    });
    var fail = function (data) {
      that.setData({
        loadingShow: false
      })
      wx.showModal({
        title: '获取失败',
        content: "请确认打开GPS后重试 !",
        cancelText: "手动输入",
        showCancel: true,
        success(res) {
          if (res.confirm) {} else if (res.cancel) {
            that.setData({
              currentPosition: "",
              currentPositionShow: true,
            })
          }
        }
      })
    };
    var success = function (data) {
      that.setData({
        currentPosition: data.wxMarkerData[0].address,
        currentPositionShow: true,
        lng: data.wxMarkerData[0].longitude,
        lat: data.wxMarkerData[0].latitude,
        loadingShow: false,
        tipsShow: 1,
        tipsMain: "获取当前位置成功",
      })
      setTimeout(() => {
        that.setData({
          tipsShow: 0,
        })
      }, 2000)
    }
    // 发起regeocoding检索请求 
    BMap.regeocoding({
      fail: fail,
      success: success,
    });
  },

  // 输入手机号码
  bindKeyInput: function (e) {
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
              that.setData({
                wxCodeData: res.code
              })
            }
          });
          // 打开loading
          that.setData({
            loadingShow: true
          })
          setTimeout(() => {
            call.request('/onlineeducation/api/studentMarket/decryptMobile', {
              data: {
                encrypdata: ency,
                ivdata: iv,
                jsCode: that.data.wxCodeData,
                steps: "2", //  已获取手机号 （写死）
                accessSource:"1", // 1 是扫码 5是 正常录入
                marketId: that.data.urlMarketId, // 老师ID
                openId: that.data.urlOpenId, // openId
              }
            }, res => {
              // 关闭loading
              that.setData({
                loadingShow: false
              })
              if (res.errorCode == 0) {
                that.setData({
                  // phoneNum: JSON.parse(res.data.mobile).phoneNumber
                  phoneNum: res.data.mobile
                })
                that.setData({
                  tipsShow: 1,
                  tipsMain: "授权成功",
                })
                setTimeout(() => {
                  that.setData({
                    tipsShow: 0,
                  })
                }, 2000)
              } else {
                that.setData({
                  tipsShow: 1,
                  tipsMain: "授权失败，请重试",
                })
                setTimeout(() => {
                  that.setData({
                    tipsShow: 0,
                  })
                }, 2000)
              }
            });
            setTimeout(() => {
              // 关闭loading
              that.setData({
                loadingShow: false
              })
            }, 5000)
          }, 600)
        }
      },
      fail: function () {
        // 关闭loading
        that.setData({
          loadingShow: false
        })
        that.setData({
          tipsShow: 1,
          tipsMain: "session_key失效，请重新登录",
        })
        setTimeout(() => {
          that.setData({
            tipsShow: 0,
          })
        }, 2000)
        console.log("session_key 已经失效，需要重新执行登录流程");
      }
    });
  },
  // tabBar
  tabBar() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4
      })
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 获取姓名
  getInputValue(e) {
    this.setData({
      jzsUserName: e.detail.value,
    })
  },
  // 提交按钮
  submitClick: function () {
    if (this.data.jzsUserName == "") {
      this.setData({
        tipsShow: 1,
        tipsMain: "请输入姓名",
      })
      setTimeout(() => {
        this.setData({
          tipsShow: 0,
        })
      }, 2000)
      return
    }
    if (this.data.pickerString == "") {
      this.setData({
        tipsShow: 1,
        tipsMain: "请选择年龄",
      })
      setTimeout(() => {
        this.setData({
          tipsShow: 0,
        })
      }, 2000)
      return
    }
    if (this.data.phoneNum == "") {
      this.setData({
        tipsShow: 1,
        tipsMain: "请填写手机号",
      })
      setTimeout(() => {
        this.setData({
          tipsShow: 0,
        })
      }, 2000)
      return
    }
    let phoneRegular = /^1[3456789]\d{9}$/;
    if (phoneRegular.test(this.data.phoneNum) == false) {
      this.setData({
        tipsShow: 1,
        tipsMain: "手机号格式不正确",
      })
      setTimeout(() => {
        this.setData({
          tipsShow: 0,
        })
      }, 2000)
      return
    }
    if (this.data.checkValue == undefined || this.data.checkValue.length == 0) {
      this.setData({
        tipsShow: 1,
        tipsMain: "请选择意向课程",
      })
      setTimeout(() => {
        this.setData({
          tipsShow: 0,
        })
      }, 2000)
      return
    }
    // 打开loading
     this.setData({
      loadingShow: true
    })
    //调用封装的方法
    call.request('/onlineeducation/api/studentMarket/marketInformationRecord', {
      data: {
        age: this.data.pickerString == '成人' ? '99' : this.data.pickerString.split("岁")[0], // 年龄
        gender: this.data.sexStr == "" ? "1" : this.data.sexStr, // 性别
        mobile: this.data.phoneNum, // 手机号
        // location: this.data.lng + "," + this.data.lat + "," + this.data.currentPosition, // 位置
        accessSource:"1", // 1 是扫码 5是 正常录入
        location: this.data.currentPosition, // 位置 
        marketId: this.data.urlMarketId, // 老师ID
        openId: this.data.urlOpenId, // openId
        steps: "3", //  已完成 （写死
        consultingCourse: this.data.checkValue.join(","),
        studentName: this.data.jzsUserName, // 学生姓名 
      },
    }, res => {
      console.log(res.errorCode)
      if (res.errorCode == 0) {
        setTimeout(() => {
          this.setData({
            loadingShow: false
          })
          this.setData({
            tipsShow: 1,
            tipsMain: "提交成功",
          })
          setTimeout(() => {
            this.setData({
              tipsShow: 0,
            })
          }, 2000)
        }, 2000)
        setTimeout(() => {
          // 保存完成之后 打开关注页面
          wx.navigateTo({
            url: './official/index'
          })
          // this.setData({
          //   focusComponentShow: 1,
          // })
        }, 3000)
      } else {
        this.setData({
          loadingShow: false,
          tipsShow: 1,
          tipsMain: res.message,
        })
        setTimeout(() => {
          this.setData({
            tipsShow: 0,
          })
        }, 2000)
      }
    }, this.fail);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断是否 携带openId
    if (options.openId) {
      this.setData({
        urlOpenId: options.openId,
        urlMarketId: options.marketId,
      })
    } else {
    
      //同意授权
      wx.login({
        //获取code 使用wx.login得到的登陆凭证，用于换取openid
        success: (res) => {
          console.log(res.code)
          //调用封装的方法
          call.getData(`/identity/api/WeChat/WechatInfo?code=${res.code}`, data => {
            // 判断是否获取到 openid
            if (data.errorCode == 0) {
              this.setData({
                urlOpenId: data.data.openid,
                urlMarketId: options.marketId,
              })
            } else {
              wx.showToast({
                title: data.message,
                icon: 'none',
              });
              this.setData({
                urlOpenId: "99999",
                urlMarketId: options.marketId,
              })
            }
          }, err => {
            console.log(err)
          });
        }
      });
    }
    // 判断是否登录
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
    // 获取预设地址
    call.request('/onlineeducation/api/studentMarket/getMarketLocation', {
      data: {
        "marketId": Number(options.marketId),
      }
    }, res => {
      if (res.errorCode == 0) {
        this.setData({
          currentPosition: res.data.marketLocation,
        })
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
        })
      }
    }, err => {
      wx.showToast({
        title:"未获取到区域",
        icon: 'none',
      });
      console.error(err.errMsg);
    })
  },
  shuffleSuc: function (data) {
    var that = this;
    // that.setData()
    //我后面测试了一下，直接this.setData也可以，但是因为我在没有使用封装方法的时候
    //this.setData报过错，不能直接用this，所以我在赋值的时候一般都会加上var that = this;
  },
  fail: function (err) {
    this.setData({
      loadingShow: false,
      tipsShow: 1,
      tipsMain: "提交失败,请重试!",
    })
    setTimeout(() => {
      this.setData({
        tipsShow: 0,
      })
    }, 2000)
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.tabBar();
    // 随机banner图
    this.setData({
      topSpreadBannerUrl: `https://juzishu-cms-bucket.oss-cn-beijing.aliyuncs.com/mini-program/img/spreadBanner${Math.ceil( Math.random()*5)}.jpg`,
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})