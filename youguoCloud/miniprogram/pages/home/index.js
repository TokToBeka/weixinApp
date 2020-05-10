// miniprogram/pages/home/index.js
// const WXAPI = require('apifm-wxapi')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperImg: [{
      mode: 'scaleTofill',
      url: 'cloud://youguo-7vd16.796f-youguo-7vd16-1301087841/swiper-image/banner-3.jpg'
    }, {
      mode: 'scaleTofill',
      url: 'cloud://youguo-7vd16.796f-youguo-7vd16-1301087841/swiper-image/banner-6.jpg'
    }, {
      mode: 'scaleTofill',
      url: 'cloud://youguo-7vd16.796f-youguo-7vd16-1301087841/swiper-image/banner-10.jpg'
    }],
    ticketImgUrl: 'cloud://youguo-7vd16.796f-youguo-7vd16-1301087841/item-image/ticket.png',
    ticket_bImgUrl: 'cloud://youguo-7vd16.796f-youguo-7vd16-1301087841/item-image/ticket_b.png',
    indicatorDots: true,
    indicatorActiveColor: '#34cc99',
    autoplay: true,
    interval: 4000,
    duration: 2000,
    circular: true,
    easingFunction: "easeInOutCubic",
    categories: [],
  },
  /**
   * 跳转到指定页面
   */
  tabClick: function (e) {
    // wx.navigateTo({
    //   url: '/pages/goods/list?categoryId=' + e.currentTarget.id,
    // })
    return;
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.categories()
  },
  // async categories() {
  //   const res = await WXAPI.goodsCategory()
  //   let categories = [];
  //   if (res.code == 0) {
  //     const _categories = res.data.filter(ele => {
  //       return ele.level == 1
  //     })
  //     categories = categories.concat(_categories)
  //   }
  //   this.setData({
  //     categories: categories,
  //     activeCategoryId: 0,
  //     curPage: 1
  //   });
  //   //this.getGoodsList(0);
  // },
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