//index.js
const app = getApp()

Page({
  data: {
    hiddenButton: true,
  },

  /**
   *从云端获取资料
   *如果没有获取到则尝试新建用户资料
   */
  onGetUserInfo: function (e) {
    var _this = this
    console.log('进入onGetUserInfo')
    //需要用户同意授权获取自身相关信息
    if (e.detail.errMsg == 'getUserInfo:ok') {
      //将授权结果写入app.js全局变量
      app.globalData.auth['scope.userInfo'] = true
      //尝试获取云端用户信息
      wx.cloud.callFunction({
        name: 'get_setUserInfo',
        data: {
          getSelf: true,
        },
        success: (res) => {
          if (res.errMsg == 'cloud.callFunction:ok') {
            console.log('成功获取')
            console.log('res:' + JSON.stringify(res.result))
            if (res.result) {
              //如果成功获取到
              //将获取到的用户资料写入app.js全局变量
              console.log(res)
              app.globalData.userInfo = res.result.data.userData
              app.globalData.userId = res.result.data._id
              wx.switchTab({
                url: '/pages/my/my',
              })
            } else {
              console.log('注册信息')
              //未成功获取到用户信息
              //调用注册方法
              console.log('未注册')
              _this.register({
                nickName: e.detail.userInfo.nickName,
                gender: e.detail.userInfo.gender,
                avatarUrl: e.detail.userInfo.avatarUrl,
                region: {
                  country: e.detail.userInfo.country,
                  province: e.detail.userInfo.province,
                  city: e.detail.userInfo.city,
                },
                phoneNumber: 'none',
              })
            }
          }
        },
        fail: (err) => {
          wx.showToast({
            title: '请检查网络您的状态',
            duration: 800,
            icon: 'none',
          })
          console.error('get_setUserInfo调用失败', err.errMsg)
        },
      })
    } else {
      console.log('未授权')
    }
  },

  /**
   *注册用户信息
   */
  register: function (e) {
    let _this = this
    console.log('注册信息123')
    wx.cloud.callFunction({
      name: 'get_setUserInfo',
      data: {
        setSelf: true,
        userData: e,
      },
      success: (res) => {
        if (res.errMsg == 'cloud.callFunction:ok' && res.result) {
          _this.setData({
            hiddenButton: true,
          })
          app.globalData.userInfo = e
          app.globalData.userId = res.result._id
          _this.data.registered = true
          // app.getLoginState()
          console.log(res)

          wx.switchTab({
            url: 'pages/home/index',
          })
          console.log(1212);
        } else {
          console.log('注册失败', res)
          wx.showToast({
            title: '请检查您的网络状态',
            duration: 800,
            icon: 'none',
          })
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '请检查您的网络状态',
          duration: 800,
          icon: 'none',
        })
        console.error('get_setUserInfo调用失败', err.errMsg)
      },
    })
  },

  /**
   *生命周期函数--监听页面加载
   */
  onLoad: function () {
    let _this = this
    // 需要用户同意授权获取自身相关信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          //将授权结果写入app.js全局变量
          app.globalData.auth['scope.userInfo'] = true
          //从云端获取用户资料
          wx.cloud.callFunction({
            name: 'get_setUserInfo',
            data: {
              getSelf: true,
            },
            success: (res) => {
              if (res.errMsg == 'cloud.callFunction:ok' && res.result) {
                //如果成功获取到
                //将获取到的用户资料写入app.js全局变量
                console.log(res)
                app.globalData.userInfo = res.result.data.userData
                app.globalData.userId = res.result.data._id
                wx.switchTab({
                  url: 'pages/home/index',
                })
              } else {
                _this.setData({
                  hiddenButton: false,
                })
                console.log('未注册')
              }
            },
            fail: (err) => {
              _this.setData({
                hiddenButton: false,
              })
              wx.showToast({
                title: '请检查您的网络状态',
                duration: 800,
                icon: 'none',
              })
              console.error('get_setUserInfo调用失败', err.errMsg)
            },
          })
        } else {
          _this.setData({
            hiddenButton: false,
          })
          console.log('未授权')
        }
      },
      fail: (err) => {
        _this.setData({
          hiddenButton: false,
        })
        wx.showToast({
          title: '请检查您的网络状态',
          duration: 800,
          icon: 'none',
        })
        console.error('get_setUserInfo调用失败', err.errMsg)
      },
    })
  },
})