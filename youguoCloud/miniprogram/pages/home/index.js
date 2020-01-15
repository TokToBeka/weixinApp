// miniprogram/pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImg: [{
      mode: 'scaleTofill',
      url: 'cloud://youguo-7vd16.796f-youguo-7vd16-1301087841/swiper-image/fruit-1.jpg'
    }, {
      mode: 'scaleTofill',
      url: 'cloud://youguo-7vd16.796f-youguo-7vd16-1301087841/swiper-image/fruit-2.jpg'
    }, {
      mode: 'scaleTofill',
      url: 'cloud://youguo-7vd16.796f-youguo-7vd16-1301087841/swiper-image/fruit-3.jpg'
    }],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    // easingFunction: "easeInOutCubic"
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
    return {
      title: '悠果乐园',
      path: 'pages/home/index'
    }
  }
})