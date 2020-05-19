// miniprogram/pages/my/my.js
// const WXAPI = require("apifm-wxapi")
// const AUTH = require("../../utils/auth")
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    globalData: [],
    orderList: [{
      'url': '../../assets/img/pay.png',
      'title': '待付款'
    }, {
      'url': '../../assets/img/pay.png',
      'title': '待收货'
    }, {
      'url': '../../assets/img/pay.png',
      'title': '待评价'
    }, {
      'url': '../../assets/img/order.png',
      'title': '全部订单'
    }],
    serviceList: [{
      'url': '../../assets/img/pay.png',
      'title': '积分商城'
    }, {
      'url': '../../assets/img/pay.png',
      'title': '领券中心'
    }, {
      'url': '../../assets/img/pay.png',
      'title': '我的红包'
    }, {
      'url': '../../assets/img/pay.png',
      'title': '我的评价'
    }, {
      'url': '../../assets/img/pay.png',
      'title': '收货地址'
    }, {
      'url': '../../assets/img/pay.png',
      'title': '退换/售后'
    }, {
      'url': '../../assets/img/pay.png',
      'title': '联系客服'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.auth['scope.userInfo'])
    // if (!app.globalData.auth['scope.userInfo']) {
    //   console.log(1212)
    //   wx.navigateTo({
    //     url: '../index/index'
    //   })

    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // getUserApiInfo: function (e) {
  //   wx.cloud.callFunction({
  //     name: 'getUserInfo',
  //     data: {
  //       cloudId: e.detail.cloudID,
  //     },
  //     success: (res) => {
  //       console.log(res)
  //     },
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const _this = this
    // this.setData({
    //   version: CONFIG.version,
    //   vipLevel: app.globalData.vipLevel
    // })
    // AUTH.checkHasLogined().then(isLogined => {
    //   this.setData({
    //     wxlogin: isLogined
    //   })
    //   if (isLogined) {
    //     _this.getUserApiInfo();
    //     // _this.getUserAmount();
    //   }
    // })
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
  onShareAppMessage: function () {},
})