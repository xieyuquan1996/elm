const data = require('./data.json')

function getSeller() {
    return data.seller
}

function getGoods() {
    return data.goods
}

function getRatings() {
    return data.ratings
}

export const API = {
    getSeller,
    getGoods,
    getRatings
}