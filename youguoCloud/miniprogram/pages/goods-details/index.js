Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: 0,
    goodsDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.goodsId = options.id
  },

  onShow() {
    this.getGoodsDetail(this.data.goodsId)
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