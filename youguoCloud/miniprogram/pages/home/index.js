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
    actEndTime: '2020/5/12 09:00:00',
    countDownObj: {},
    countDownList: [{
      'url': '../../assets/img/fruit1.jpg',
      'title': '越南进口白心火龙果',
      'discountPrice': '29.9',
      'originalPrice': '39.9'
    }, {
      'url': '../../assets/img/fruit2.jpg',
      'title': '海南 妃子笑荔枝',
      'discountPrice': '39.9',
      'originalPrice': '55.9'
    }],
    categoryList: [{
      'url': '../../assets/img/img2.png',
      'title': '进口水果'
    }, {
      'url': '../../assets/img/img1.png',
      'title': '国产水果'
    }, {
      'url': '../../assets/img/img3.png',
      'title': '时令新品'
    }, {
      'url': '../../assets/img/icon_seafood.png',
      'title': '海鲜水产'
    }, {
      'url': '../../assets/img/img5.png',
      'title': '营养果干'
    }, {
      'url': '../../assets/img/img1.png',
      'title': '乳品'
    }, {
      'url': '../../assets/img/icon_seckill.png',
      'title': '限时秒杀'
    }, {
      'url': '../../assets/img/icon_groupbuy.png',
      'title': '多人拼团'
    }, {
      'url': '../../assets/img/icon_logistics.png',
      'title': '物流售后'
    }, {
      'url': '../../assets/img/icon_ticket1.png',
      'title': '领券'
    }, ]
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
    this.countDown()
  },
  /**
   * 小于10的格式化函数
   */
  timeFormat(param) {
    return param < 10 ? '0' + param : param
  },
  /**
   * 倒计时函数
   */
  countDown() {
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    let endTime = new Date(this.data.actEndTime).getTime();
    let countDownArr = [];
    let obj = null;
    // 如果活动未结束，对时间进行处理
    if (endTime - newTime > 0) {
      let time = (endTime - newTime) / 1000
      // 获取天、时、分、秒
      let day = parseInt(time / (60 * 60 * 24));
      let hou = parseInt(time % (60 * 60 * 24) / 3600);
      let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
      let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
      obj = {
        day: this.timeFormat(day),
        hou: this.timeFormat(hou),
        min: this.timeFormat(min),
        sec: this.timeFormat(sec)
      }
    } else {
      // 活动已结束，全部设置为‘00’
      obj = {
        day: '00',
        hou: '00',
        min: '00',
        sec: '00'
      }
    }
    this.setData({
      countDownObj: obj
    })
    setTimeout(this.countDown, 1000)
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