const db = wx.cloud.database()

Page({
  data: {
    swiperImg: [{
        mode: 'scaleTofill',
        url: 'cloud://youguo-7vd16.796f-youguo-7vd16-1301087841/swiper-image/banner-3.jpg',
      },
      {
        mode: 'scaleTofill',
        url: 'cloud://youguo-7vd16.796f-youguo-7vd16-1301087841/swiper-image/banner-6.jpg',
      },
      {
        mode: 'scaleTofill',
        url: 'cloud://youguo-7vd16.796f-youguo-7vd16-1301087841/swiper-image/banner-10.jpg',
      },
    ],
    ticketImgUrl: 'cloud://youguo-7vd16.796f-youguo-7vd16-1301087841/item-image/ticket.png',
    ticket_bImgUrl: 'cloud://youguo-7vd16.796f-youguo-7vd16-1301087841/item-image/ticket_b.png',
    indicatorDots: true,
    indicatorActiveColor: '#34cc99',
    autoplay: true,
    interval: 4000,
    duration: 2000,
    circular: true,
    easingFunction: 'easeInOutCubic',
    pageData: {
      skip: 0,
      limit: 4,
    },
    categories: [],
    goods: [],
    loadingMoreHidden: true,
    actEndTime: '2020/5/28 09:00:00',
    countDownObj: {},
    countDownList: [{
        url: '../../assets/img/fruit1.jpg',
        title: '越南进口白心火龙果',
        discountPrice: '29.9',
        originalPrice: '39.9',
      },
      {
        url: '../../assets/img/fruit2.jpg',
        title: '海南 妃子笑荔枝',
        discountPrice: '39.9',
        originalPrice: '55.9',
      },
    ],
    categoryList: [{
        url: '../../assets/img/img2.png',
        title: '进口水果',
      },
      {
        url: '../../assets/img/img1.png',
        title: '国产水果',
      },
      {
        url: '../../assets/img/img3.png',
        title: '时令新品',
      },
      {
        url: '../../assets/img/icon_seafood.png',
        title: '海鲜水产',
      },
      {
        url: '../../assets/img/img5.png',
        title: '营养果干',
      },
      {
        url: '../../assets/img/img1.png',
        title: '乳品',
      },
      {
        url: '../../assets/img/icon_seckill.png',
        title: '限时秒杀',
      },
      {
        url: '../../assets/img/icon_groupbuy.png',
        title: '多人拼团',
      },
      {
        url: '../../assets/img/icon_logistics.png',
        title: '物流售后',
      },
      {
        url: '../../assets/img/icon_ticket1.png',
        title: '领券',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.countDown()
    this.categories()
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
    let newTime = new Date().getTime()
    let endTime = new Date(this.data.actEndTime).getTime()
    let obj = null
    // 如果活动未结束，对时间进行处理
    if (endTime - newTime > 0) {
      let time = (endTime - newTime) / 1000
      // 获取天、时、分、秒
      let day = parseInt(time / (60 * 60 * 24))
      let hou = parseInt((time % (60 * 60 * 24)) / 3600)
      let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60)
      let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60)
      obj = {
        day: this.timeFormat(day),
        hou: this.timeFormat(hou),
        min: this.timeFormat(min),
        sec: this.timeFormat(sec),
      }
    } else {
      // 活动已结束，全部设置为‘00’
      obj = {
        day: '00',
        hou: '00',
        min: '00',
        sec: '00',
      }
    }
    this.setData({
      countDownObj: obj,
    })
    setTimeout(this.countDown, 1000)
  },

  /**
   * 获取分类数据函数
   */
  async categories() {
    var that = this
    that.getGoodsList()
  },

  /**
   * 获取商品列表函数
   */
  async getGoodsList() {
    var that = this
    wx.showLoading({
      title: '数据加载中',
    })
    db.collection('goods')
      .skip(that.data.pageData.skip)
      .limit(that.data.pageData.limit)
      .get({
        success: function (result) {
          const res = result.data
          wx.hideLoading()
          if (res.code == 404 || res.length == 0) {
            let newData = {
              loadingMoreHidden: false,
            }
            that.setData(newData)
            return
          }
          let oldData = that.data.goods
          that.setData({
            loadingMoreHidden: true,
            goods: oldData.concat(res),
            'pageData.skip': that.data.pageData.skip + 4,
          })
        },
      })
  },

  /**
   * 跳转到商品详情的处理函数
   */
  toDetailsTap: function (e) {
    console.log('商品id：', e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../goods-details/index?id=' + e.currentTarget.dataset.id
    })

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getGoodsList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '悠果乐园',
      path: 'pages/home/index',
    }
  },
})