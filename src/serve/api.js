const axios = require('axios')
import store from '../store/index.js'

import {getLocalStorage} from './localstorage'

const instance = axios.create({
    "Content-Type": "application/json; charset=UTF-8"
})

//http request 拦截器 在发送请求之前做些什么
let request = function (config) {
    const token = store.token || getLocalStorage("token")
    if(token){
        Object.assign(config.headers.common, {"Authorization": token})
    }
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

function getNowLocation(val){
    const data = {
        key:'1c44f767c5d319c1dee50f3d45dcc0b8',
        radius:'1000',
        extensions:'all',
        batch:'false',
        roadlevel:'0'
      }
    data.location = val
    return instance.get('/v3/geocode/regeo',{params:data})
}

function getSeller(shopId) {
    return instance.get(`/api/shop/id/${shopId}`)
}

function getGoods(shopId) {
    return instance.get(`/api/goods/shopId/${shopId}`)
}

function getGoodsTest(shopId) {
    return instance.get(`/api/goods/shopId/${shopId}`)
}

function getRatings(shopId) {
    return instance.get(`/api/ratings/shopId/${shopId}`)
}

function getRatingsByFoodId(foodId) {
    return instance.get(`/api/ratings/foodId/${foodId}`)
}

function getShopList() {
    return instance.get(`/api/shop/place/`)
}

function getVerityCode(phone){
    return instance.get(`/api/user/verityCode/${phone}`)
}

function getAddress(shopId){
    return instance.get(`/api/address/get/${shopId}`)
}

function getAddressList(){
    return instance.get(`/api/address/get`)
}

function saveAddress(address){
    let param = new URLSearchParams()
    for(const key in address){
        param.append(key, address[key])
    }
    return instance.post(`/api/address/update`,param)
}

function addAddress(address){
    let param = new URLSearchParams()
    for(const key in address){
        param.append(key, address[key])
    }
    return instance.post(`/api/address/add`,param)
}

function deleteAddress(id){
    let param = new URLSearchParams()
    param.append('id',id)
    return instance.post(`/api/address/delete`,param)
}

function login(phone, code) {
    let param = new URLSearchParams()
    param.append('phone',phone)
    param.append('code', code)
    return instance.post(`/api/user/verity`,param)
}

function validToken() {
    let param = new URLSearchParams()
    param.append('uuid',store.token || getLocalStorage('token'))
    return instance.post(`/api/token/valid`,param)
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
    addGoods,
    getShopList,
    getGoodsTest,
    getVerityCode,
    login,
    getRatingsByFoodId,
    validToken,
    getAddress,
    saveAddress,
    addAddress,
    deleteAddress,
    getAddressList,
    getNowLocation
}