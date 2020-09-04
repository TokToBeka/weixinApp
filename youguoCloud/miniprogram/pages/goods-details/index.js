Page({
  data: {
    goodsId: 0,
    goodsDetail: {},
    goodsDetailCont: [],
    show: false,
    canUse: false,
    btnInfo: '立即使用',
    couponId:[]
  },
  onLoad: function (options) {
    this.data.goodsId = options.id
  },
  onShow() {
    this.getGoodsDetail(this.data.goodsId)
  },
  open() {
    this.setData({
        show: true
    })
  },
  useCoupon(event) {
    console.log('couponId0:',this.data.couponId)
    this.data.couponId.push(event.currentTarget.dataset.status)
    console.log('couponId1:',this.data.couponId)
    this.setData({
      canUse: true,
      couponId: this.data.couponId,
      btnInfo: '已领取'
    })
  },
  async getGoodsDetail(goodsId) {
    const that = this
    wx.cloud.callFunction({
      name: 'getGoodsDetail',
      data: {
        goodsId: goodsId,
      },
      success: (res) => {
        if (res.errMsg == 'cloud.callFunction:ok') {
          console.log('detail:' + JSON.stringify(res.result.list[0]))
          that.setData({
            goodsDetail: res.result.list[0]
          })
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '请检查网络您的状态',
          duration: 800,
          icon: 'none',
        })
        console.error('getGoodsDetail调用失败', err.errMsg)
      }
    })
  }
})
