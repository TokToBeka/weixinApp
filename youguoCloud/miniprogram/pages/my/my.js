const app = getApp()

Page({
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

  onLoad: function (options) {
    const userInfo = wx.getStorageSync('userInfo');
    console.log('userInfo:' + JSON.stringify(userInfo))
    if (userInfo) {
      return
    } else {
      wx.navigateTo({
        url: '../index/index'
      })
    }
  },
})