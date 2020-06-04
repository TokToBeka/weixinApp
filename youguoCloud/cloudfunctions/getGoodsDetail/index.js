// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  traceUser: true,
  env: 'youguo-7vd16',
})
const db = cloud.database()
const goods = db.collection('goods')

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await goods.aggregate()
      .lookup({
        from: "goodsPic",
        localField: 'id',
        foreignField: 'goodsId',
        as: 'pics'
      })
      .match({
        id: parseInt(event.goodsId)
      })
      .end()
  } catch (e) {
    console.error(e)
  }
}