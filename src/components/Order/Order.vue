<template>
  <ul class="Order">
    <li class="order-wrapper" v-for="item of orderList" :key="item.orderId">
      <div class="tittle-wrapper" @click="jumpShop(item.shopId)">
        <div class="avatar-wrapper">
          <img :src="item.avatar" class="avatar" />
        </div>
        <div class="name-wrapper">
          <div class="shop-name">{{item.shopName}}</div>
          <div class="tittle-icon">
            <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
      </div>
      <div class="food-wrapper">
        <p v-for="food of item.foodResults" :key="food.name" class="food-content">
          <span>{{food.foodName}}</span>
          <span class="food-count">X{{food.count}}</span>
        </p>
        <p class="time-total-wrapper">
          <span class="time-content">{{formatTime(item.orderTime)}}</span>
          <span class="total-content">实付{{item.orderTotal}}</span>
        </p>
      </div>
      <div class="info-wrapper">
        <span class="statue-content">{{getStatus(item.orderStatus)}}</span>
        <span class="again-contemt" @click="again(item)">再来一单</span>
        <span class="delete-content" @click="deleteOrder(item)">删除</span>
      </div>
    </li>
  </ul>
</template>

<script>

import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('home')
import { deleteLocalStorage } from "@/serve/localstorage";
export default {
  data() {
    return {
      orderList: [
       /* {
          orderId: 1,
          shopId: 26,
          shopName: "CoCo都可(大悦城店)",
          avatar:
            "https://p0.meituan.net/waimaipoi/ed31c20e4fc3fb2a8ad99449354a6c3122344.jpg",
          foodResults: [
            {
              foodName: "鲜芋奶茶/中杯",
              count: 1
            }
          ],
          orderTime: new Date(),
          orderTotal: 29.58,
          orderStatus: 1
        }*/
      ]
    };
  },
  created() {
    const that = this;
    // 验证是否登录了
    if (this.$store.state.home.token) {
      this.$API
        .validToken()
        .then(data => {
          if (!data.data.data.code) {
            that.$store.token = null;
            deleteLocalStorage("token");
            that.$router.push({ path: "/login" });
          } else {
            that.getOrders(that)
          }
        })
        .catch(err => {
          console.log(err);
          that.$router.push({ path: "/login" });
        });
    } else {
      this.$router.push({ path: "/login" });
    }
  },
  methods: {
    again(item){
      const that = this
      that.$API.getFoodsByOrderId(item.id).then(data => {
        if(data.data.data){
          // 跳转
          that.$router.push({'name': 'order', params: {
            seller: {
              deliveryPrice:'',
              shopId: '',
              avatar: '',
              name: ''
            },
            sellFood: data.data.data
          }})
        }
      })
      console.log('再来一单')
    },
    deleteOrder(){
      console.log('删除订单')
    },
    ...mapMutations(['setShopId']),
    getOrders(that) {
      that.$API.getOrder().then(data => {
        if (data.data.data) {
          that.orderList = [];
          data.data.data.map(item => {
            item.orderTime = new Date(item.orderTime);
            that.orderList.push(item);
          });
        }
      });
    },
    jumpShop(shopId) {
      this.setShopId(shopId);
      this.$router.push({ name: "index" });
    },
    getStatus(index) {
      return ["等待接单", "正在配送", "订单已完成"][index];
    },
    formatTime(val) {
      return this.dateFtt("yyyy-MM-dd hh:mm:ss", val);
    },
    dateFtt(fmt, date) {
      //author: meizz
      let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    }
  }
};
</script>

<style lang="stylus">
@import './order.styl';
</style>