const axios = require('axios')
import store from '../store/index.js'

const instance = axios.create({
    "Content-Type": "application/json; charset=UTF-8"
})

//http request 拦截器 在发送请求之前做些什么
let request = function (config) {
    // 在发送请求之前做些什么
    store.commit('setLoading', 1)
    return config;
}
//http request 拦截器 在请求错误时做些什么
let request_err = function (err) {
    // 对请求错误做些什么
    store.commit('setLoading', 1)
    return Promise.reject(err);
};

instance.interceptors.request.use(request, request_err)

/**
 * 响应成功前做拦截处理
 * @param {响应} res 
 */
let response = function (res) {
    store.commit('setLoading', -1)
    return res;
};
/**
 * 响应失败前拦截处理
 * @param {响应} err 
 */
let response_err = function (err) {
    store.commit('setLoading', -1)
    return err;
};

instance.interceptors.response.use(response, response_err)


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
function addShop() {
    return instance.post('/api/shop/add', data.seller)
}

/**
 * 新增用户
 */
function addUser() {
    return instance.post('/api/user/add', data.ratings)
}

/**
 * 新增商品
 */
function addGoods(shopId) {
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