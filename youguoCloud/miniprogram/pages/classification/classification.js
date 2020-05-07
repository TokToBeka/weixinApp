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
        this.getGoodList()
      },
    })
  },
  compare: (property) => {
    return function (a, b) {
      var value1 = a[property]
      var value2 = b[property]
      return value1 - value2
    }
  },
  async getGoodList() {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    const db = wx.cloud.database()
    db.collection('goods')
      .where({})
      .get({
        success: function (result) {
          const res = result.data
          wx.hideLoading()
          that.setData({
            currentGoods: res,
          })
        },
      })
    // wx.request({
    //   url: 'http://127.0.0.1:8000/query/goods',
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (result) => {
    //     const res = result.data.data.data;
    //     console.log('res:' + JSON.stringify(res));
    //     wx.hideLoading();
    //     if (result.code == 700) {
    //       this.setData({
    //         currentGoods: null
    //       });
    //       return
    //     }
    //     this.setData({
    //       currentGoods: res
    //     })
    //   }
    // })
  },

  onCategoryClick: function (e) {
    var that = this
    var id = e.target.dataset.id
    console.log('id:' + id)
    console.log('selectedId:' + that.data.categorySelected.id)
    if (id === that.data.categorySelected.id) {
      console.log(111)
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
      console.log(
        'categorySelected:' + JSON.stringify(that.data.categorySelected)
      )
      that.getGoodList()
    }
  },
  toDetailsTap: function (e) {},
})
