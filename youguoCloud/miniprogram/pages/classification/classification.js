// miniprogram/pages/classification/classification.js
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
    const res = {
      "code": 0,
      "data": [{
        "id": 88042,
        "key": "1",
        "name": "活动",
        "pid": 0,
      }, {
        "id": 88043,
        "key": "2",
        "name": "热销",
        "pid": 0,
      }, {
        "id": 88044,
        "key": "4",
        "name": "时令水果",
        "pid": 0,
      }, {
        "id": 88045,
        "key": "5",
        "name": "热带鲜果",
        "pid": 0,
      }, {
        "id": 88046,
        "key": "6",
        "name": "进口水果",
        "pid": 0,
      }, {
        "id": 88047,
        "key": "7",
        "name": "国产水果",
        "pid": 0,
      }, {
        "id": 88048,
        "key": "8",
        "name": "优质水果",
        "pid": 0,
      }, {
        "id": 88049,
        "key": "9",
        "name": "水果现切",
        "pid": 0,
      }, {
        "id": 88050,
        "key": "10",
        "name": "时令礼篮",
        "pid": 0,
      }, {
        "id": 88051,
        "key": "11",
        "name": "营养果干",
        "pid": 0,
      }],
      "msg": "success"
    };
    wx.hideLoading()
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
    })
  },
  onCategoryClick: function (e) {

  }

})