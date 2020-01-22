from fastapi import FastAPI
from pydantic import BaseModel
# uvicorn main:app --reload
app = FastAPI()


category = {
    "code": 0,
    "data": [{
        "id": 10000,
        "key": "1",
        "name": "活动",
        "pid": 0,
        "isUse": True,
        "sort": 0
    }, {
        "id": 10001,
        "key": "2",
        "name": "热销",
        "pid": 0,
        "isUse": True,
        "sort": 1
    }, {
        "id": 10002,
        "key": "4",
        "name": "时令水果",
        "pid": 0,
        "isUse": True,
        "sort": 2
    }, {
        "id": 10003,
        "key": "5",
        "name": "热带鲜果",
        "pid": 0,
        "isUse": True,
        "sort": 3
    }, {
        "id": 10004,
        "key": "6",
        "name": "进口水果",
        "pid": 0,
        "isUse": True,
        "sort": 4
    }, {
        "id": 10005,
        "key": "7",
        "name": "国产水果",
        "pid": 0,
        "isUse": True,
        "sort": 5
    }, {
        "id": 10006,
        "key": "8",
        "name": "优质水果",
        "pid": 0,
        "isUse": True,
        "sort": 6
    }, {
        "id": 10007,
        "key": "9",
        "name": "水果现切",
        "pid": 0,
        "isUse": True,
        "sort": 7
    }, {
        "id": 10008,
        "key": "10",
        "name": "时令礼篮",
        "pid": 0,
        "isUse": True,
        "sort": 8
    }, {
        "id": 10009,
        "key": "11",
        "name": "营养果干",
        "pid": 0,
        "isUse": True,
        "sort": 9
    }],
    "msg": "success"
}

goods = {
    "code": 0,
    "data": [{
        "categoryId": 10000,
        "characteristic": "",
        "commission": 0,
        "commissionType": 0,
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 263296,
        "kanjiaPrice": 0,
        "limitation": False,
        "logisticsId": 13662,
        "minPrice": 189,
        "minScore": 0,
        "name": "芒果",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 189,
        "sort": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg",
        "groupBuy": False,
        "groupBuyPrice": 0,
        "recommendStatus": 0,
        "recommendStatusStr": "普通",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 10,
        "userId": 21690,
        "vetStatus": 1,
        "views": 3055,
        "weight": 0
    }, {
        "categoryId": 10000,
        "characteristic": "",
        "commission": 0,
        "commissionType": 0,
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 263297,
        "kanjiaPrice": 0,
        "limitation": False,
        "logisticsId": 13663,
        "minPrice": 298,
        "minScore": 0,
        "name": "车厘子",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 298,
        "sort": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg",
        "groupBuy": False,
        "groupBuyPrice": 0,
        "recommendStatus": 0,
        "recommendStatusStr": "普通",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 10,
        "userId": 21691,
        "vetStatus": 1,
        "views": 215,
        "weight": 0
    }, {
        "categoryId": 10001,
        "characteristic": "",
        "commission": 0,
        "commissionType": 0,
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 263298,
        "kanjiaPrice": 0,
        "limitation": False,
        "logisticsId": 13664,
        "miaosha": False,
        "minPrice": 599,
        "minScore": 0,
        "name": "西瓜",
        "numberFav": 0,
        "numberGoodReputation": 0,
        "numberOrders": 0,
        "numberSells": 0,
        "originalPrice": 599,
        "sort": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/06/25/76d3c433-96ea-4f41-b149-31ea0983cd8f.jpg",
        "groupBuy": False,
        "groupBuyPrice": 0,
        "recommendStatus": 0,
        "recommendStatusStr": "普通",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 10,
        "userId": 21690,
        "vetStatus": 1,
        "views": 1011,
        "weight": 0
    },
    ]
}


class People(BaseModel):
    name: str
    age: int
    address: str
    salary: float


@app.get("/")
def index():
    return {"message": "已正确创建FastApi服务！"}


@app.post('/insert')
def insert(people: People):
    age_after_10_years = people.age + 10
    msg = f'此人名字叫做：{people.name},十年后此人年龄：{age_after_10_years}'
    return {'success': True, 'msg': msg}


@app.get('/query/category')
def queryCategory():
    return {'data': category}


@app.get('/query/goods')
def queryGoods():
    return {'data': goods}
