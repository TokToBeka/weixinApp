// 云函数入口文件
const cloud = require('wx-server-sdk')
const md5 = require('md5-node')

cloud.init({
  traceUser: true,
  env: 'youguo-7vd16',
})
const db = cloud.database()
const usersTable = db.collection('users')
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  console.log('event:' + JSON.stringify(event))
  const wxContext = cloud.getWXContext()
  //更新当前信息
  if (event.update == true) {
    try {
      return await usersTable.doc(md5(wxContext.OPENID)).update({
        data: {
          userData: _.set(event.userData),
        },
      })
    } catch (e) {
      console.log(e)
    }
  } else if (event.getSelf == true) {
    //获取当前用户信息
    try {
      return await usersTable
        .doc(md5(wxContext.OPENID))
        .field({
          openid: false,
        })
        .get()
    } catch (e) {
      console.log(e)
    }
  } else if (event.setSelf == true) {
    //添加当前用户信息
    try {
      return await usersTable.add({
        data: {
          _id: md5(wxContext.OPENID),
          openid: wxContext.OPENID,
          userData: event.userData,
          boughtList: [],
          messageList: [],
          onTransList: [],
        },
      })
    } catch (e) {
      console.log(e)
    }
  } else if (event.getOthers == true) {
    //获取指定用户信息
    try {
      return await usersTable
        .doc(event.userId)
        .field({
          userData: true,
        })
        .get()
    } catch (e) {
      console.error(e)
    }
  }
}