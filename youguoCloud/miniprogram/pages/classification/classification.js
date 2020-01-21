Page({
  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categorySelected: {
      name: '',
      id: ''
    },
    currentGoods: [],
    onLoadStatus: true,
    scolltop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.categories()
  },
  async categories() {
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: 'http://127.0.0.1:8000/query/category',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        const res = result.data.data;
        wx.hideLoading();
        let categories = [];
        let categoryName = '';
        let categoryId = '';
        if (res.code == 0) {
          for (let i = 0; i < res.data.length; i++) {
            let item = res.data[i];
            categories.push(item);
            if (i == 0) {
              categoryName = item.name;
              categoryId = item.id;
            }
          }
        }
        this.setData({
          categories: categories,
          categorySelected: {
            name: categoryName,
            id: categoryId
          }
        });
        this.getGoodList();
      },
      fail: () => {},
      complete: () => {}
    });
  },

  async getGoodList() {
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: 'http://127.0.0.1:8000/query/goods',
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        const res = result.data.data.data;
        wx.hideLoading();
        if (result.code == 700) {
          this.setData({
            currentGoods: null
          });
          return
        }
        this.setData({
          currentGoods: res
        })
      }
    })
  },

  onCategoryClick: function (e) {

  },
  toDetailsTap: function (e) {

  }

})