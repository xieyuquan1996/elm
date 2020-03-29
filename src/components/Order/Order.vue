<template>
  <ul class="Order">
    <li class="order-wrapper" v-for="item of orderList" :key="item.orderId">
      <div class="tittle-wrapper">
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
        <p v-for="food of item.foods" :key="food.name" class="food-content">
          <span>{{food.foodName}}</span>
          <span class="food-count">X{{food.count}}</span>
        </p>
        <p class="time-total-wrapper">
          <span class="time-content">{{formatTime(item.orderTime)}}</span>
          <span class="total-content">实付{{item.total}}</span>
        </p>
      </div>
      <div class="info-wrapper">
        <span class="statue-content">{{item.status}}</span>
        <span class="again-contemt">再来一单</span>
        <span class="delete-content">删除</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      orderList: [
        {
          orderId: 1,
          shopName: "CoCo都可(大悦城店)",
          avatar:
            "https://p0.meituan.net/waimaipoi/ed31c20e4fc3fb2a8ad99449354a6c3122344.jpg",
          foods: [
            {
              foodName: "鲜芋奶茶/中杯",
              count: 1
            }
          ],
          orderTime: new Date(),
          total: 29.58,
          status: "订单已完成"
        }
      ]
    };
  },
  methods: {
    formatTime(val) {
      return this.dateFtt('yyyy-MM-dd hh:mm:ss', val);
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