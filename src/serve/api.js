const axios = require('axios')

const instance = axios.create({
    "Content-Type": "application/json; charset=UTF-8"
})

const data = require('./data.json')

function getSeller(shopId) {
    return instance.get(`/api/shop/shopId/${shopId}`)
}

function getGoods(shopId) {
    return instance.get(`/api/goods/shopId/${shopId}`)
}

function getRatings(shopId) {
    return instance.get(`/api/rating/shopId/${shopId}`)
}

/**
 * 新增商店
 */
function addShop(){
    return instance.post('/api/shop/add', data.seller)
}

/**
 * 新增用户
 */
function addUser(){
    return instance.post('/api/user/add', data.ratings)
}

/**
 * 新增商品
 */
function addGoods(shopId){
    return instance.post(`/api/goods/add/${shopId}`, data.goods)
}

export const API = {
    getSeller,
    getGoods,
    getRatings,
    addShop,
    addUser,
    addGoods
}