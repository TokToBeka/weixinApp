Page({
  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categorySelected: {
      name: '',
      id: '',
    },
    currentGoods: [],
    onLoadStatus: true,
    scolltop: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.categories()
  },

  /**
   * 获取分类的数据
   */
  async categories() {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    const db = wx.cloud.database()
    db.collection('category').get({
      success: function (result) {
        const res = result.data
        wx.hideLoading()
        let categories = []
        let categoryName = ''
        let categoryId = ''
        for (let i of res) {
          categories.push(i)
          if (i.sort == 0) {
            categoryName = i.name
            categoryId = i.id
          }
        }
        categories.sort(that.compare('sort'))
        that.setData({
          categories: categories,
          categorySelected: {
            name: categoryName,
            id: categoryId,
          },
        })
        that.getGoodList()
      },
    })
  },

  /**
   * 数组排序
   */
  compare: (property) => {
    return function (a, b) {
      var value1 = a[property]
      var value2 = b[property]
      return value1 - value2
    }
  },

  /**
   * 获取分类下具体信息的数据
   */
  async getGoodList() {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    const db = wx.cloud.database()
    db.collection('goods')
      .where({
        categoryId: that.data.categorySelected.id
      })
      .get({
        success: function (result) {
          const res = result.data
          wx.hideLoading()
          if (res.length == 0) {
            that.setData({
              currentGoods: null
            })
            return
          }
          that.setData({
            currentGoods: res,
          })
        },
      })
  },

  /**
   * 分类点击事件
   * 获取当前点击的分类信息并更新categorySelected
   */
  onCategoryClick: function (e) {
    var that = this
    var id = e.target.dataset.id
    if (id === that.data.categorySelected.id) {
      that.setData({
        scolltop: 0,
      })
    } else {
      var categoryName = ''
      for (let i = 0; i < that.data.categories.length; i++) {
        let item = that.data.categories[i]
        if (item.id == id) {
          categoryName = item.name
          break
        }
      }
      that.setData({
        categorySelected: {
          name: categoryName,
          id: id,
        },
        scolltop: 0,
      })
      that.getGoodList()
    }
  },
  toDetailsTap: function (e) {},
})