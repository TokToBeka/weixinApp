// pages/databaseGuide/databaseGuide.js

const app = getApp()

Page({

  data: {
    step: 1,
    counterId: '',
    openid: '',
    count: null,
    queryResult: '',
  },

  onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },

  onAdd: function () {
    const db = wx.cloud.database()
    const data = [{
      "id": 10000,
      "key": "1",
      "name": "活动",
      "pid": 0,
      "isUse": true,
      "sort": 0
    }, {
      "id": 10001,
      "key": "2",
      "name": "热销",
      "pid": 0,
      "isUse": true,
      "sort": 1
    }, {
      "id": 10002,
      "key": "4",
      "name": "时令水果",
      "pid": 0,
      "isUse": true,
      "sort": 2
    }, {
      "id": 10003,
      "key": "5",
      "name": "热带鲜果",
      "pid": 0,
      "isUse": true,
      "sort": 3
    }, {
      "id": 10004,
      "key": "6",
      "name": "进口水果",
      "pid": 0,
      "isUse": true,
      "sort": 4
    }, {
      "id": 10005,
      "key": "7",
      "name": "国产水果",
      "pid": 0,
      "isUse": true,
      "sort": 5
    }, {
      "id": 10006,
      "key": "8",
      "name": "优质水果",
      "pid": 0,
      "isUse": true,
      "sort": 6
    }, {
      "id": 10007,
      "key": "9",
      "name": "水果现切",
      "pid": 0,
      "isUse": true,
      "sort": 7
    }, {
      "id": 10008,
      "key": "10",
      "name": "时令礼篮",
      "pid": 0,
      "isUse": true,
      "sort": 8
    }, {
      "id": 10009,
      "key": "11",
      "name": "营养果干",
      "pid": 0,
      "isUse": true,
      "sort": 9
    }]
    for (let i=0;i<data.length;i++){
      db.collection('category').add({
        data: data[i],
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          this.setData({
            counterId: res._id,
            // firstName: "Jack",
            // lastName: "Chen"
          })
          wx.showToast({
            title: '新增记录成功',
          })
          console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
          console.error('[数据库] [新增记录] 失败：', err)
        }
      })
    }

  },

  onQuery: function() {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('user').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          queryResult: JSON.stringify(res.data, null, 2)
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },

  onCounterInc: function() {
    // const db = wx.cloud.database()
    // const newName = Mike
    // db.collection('user').doc(this.data.firstName).update({
    //   data: {
    //     firstName: newName
    //   },
    //   success: res => {
    //     this.setData({
    //       firstName: newName
    //     })
    //   },
    //   fail: err => {
    //     icon: 'none',
    //     console.error('[数据库] [更新记录] 失败：', err)
    //   }
    // })
  },

  onCounterDec: function() {
    // const db = wx.cloud.database()
    // const newCount = this.data.count - 1
    // db.collection('user').doc(this.data.counterId).update({
    //   data: {
    //     count: newCount
    //   },
    //   success: res => {
    //     this.setData({
    //       count: newCount
    //     })
    //   },
    //   fail: err => {
    //     icon: 'none',
    //     console.error('[数据库] [更新记录] 失败：', err)
    //   }
    // })
  },

  onRemove: function() {
    if (this.data.counterId) {
      console.log(121212);
      const db = wx.cloud.database()
      db.collection('user').doc(this.data.firstName).remove({
        success: res => {
          wx.showToast({
            title: '删除成功',
          })
          this.setData({
            firstName: '',
            count: null,
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '删除失败',
          })
          console.error('[数据库] [删除记录] 失败：', err)
        }
      })
    } else {
      wx.showToast({
        title: '无记录可删，请见创建一个记录',
      })
    }
  },

  nextStep: function () {
    // 在第一步，需检查是否有 openid，如无需获取
    if (this.data.step === 1 && !this.data.openid) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid
          this.setData({
            step: 2,
            openid: res.result.openid
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '获取 openid 失败，请检查是否有部署 login 云函数',
          })
          console.log('[云函数] [login] 获取 openid 失败，请检查是否有部署云函数，错误信息：', err)
        }
      })
    } else {
      const callback = this.data.step !== 6 ? function() {} : function() {
        console.group('数据库文档')
        console.log('https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html')
        console.groupEnd()
      }

      this.setData({
        step: this.data.step + 1
      }, callback)
    }
  },

  prevStep: function () {
    this.setData({
      step: this.data.step - 1
    })
  },

  goHome: function() {
    const pages = getCurrentPages()
    if (pages.length === 2) {
      wx.navigateBack()
    } else if (pages.length === 1) {
      wx.redirectTo({
        url: '../index/index',
      })
    } else {
      wx.reLaunch({
        url: '../index/index',
      })
    }
  }

})