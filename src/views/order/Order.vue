<template>
  <div class="order">
    <MyHeader :tittle="tittle" :routerName="routerName"></MyHeader>
    <div class="wrapper" v-if="showTableware||showNote" @click="closeWrapper">
      <Tableware
        :tablewareNum="tablewareNum"
        @selectTablewareNum="selectTablewareNum"
        v-if="showTableware"
      ></Tableware>
      <Note v-if="showNote" @sendNote="setNote" :data="note"></Note>
    </div>
    <div class="footer-wrapper">
      <div>
        <div class="address-wrapper">
          <div class="top-wrapper">
            <div class="location-wrapper" @click="selectLacation">
              <div class="icon">
                <i class="icon-location"></i>
              </div>
              <div class="location" v-if="address">
                <div class="address">{{address.address}} {{address.doorplate}}</div>
                <div class="phone">{{address.person}} {{address.sex}}</div>
              </div>
              <div class="location" v-else>请选择一个地址</div>
            </div>
            <div class="icon">
              <i class="icon-keyboard_arrow_right"></i>
            </div>
          </div>
          <div class="bottom-wrapper">
            <div class="time-wrapper">
              <div class="icon">
                <i class="icon-time"></i>
              </div>
              <div class="tittle">立即送出</div>
              <div class="time">(大约{{deliveryTimeFormat}}送达)</div>
            </div>
            <div class="more-wrapper">为减少接触，封闭管理时，请在地址中更新具体取餐地点</div>
          </div>
        </div>
        <div class="goods-wrapper">
          <div class="shop-wrapper">
            <img class="avatar" :src="seller.avatar" />
            <div class="name">{{seller.name}}</div>
          </div>
          <div class="foods-wrapper" v-for="food in sellFood" :key="food.name">
            <div class="image-wrapper">
              <img class="image" :src="food.image" />
            </div>
            <div class="info-wrapper">
              <div class="top-wraper">
                <div class="name">{{food.name}}</div>
                <div class="price">￥{{food.number * food.price}}</div>
              </div>
              <div class="bottom-wrapper">X{{food.number}}</div>
            </div>
          </div>
          <div class="delivery-wrapper">
            <div class="tittile">配送费</div>
            <div class="delivery-price">￥{{seller.deliveryPrice}}</div>
          </div>
          <div class="total-wrapper">
            <div class="total">总计￥{{totalPrice}}</div>
            <div class="subtotal">
              小计
              <span class="price">￥{{totalPrice}}</span>
            </div>
          </div>
        </div>
        <div class="play-wrapper">
          <div class="content-height way">
            <div class="left-way">支付方式</div>
            <div class="right-way">在线支付</div>
          </div>
          <div class="content-height tableware" @click="clickTableware">
            <div class="left-tableware">餐具数量</div>
            <div class="right-tableware">
              <div class="energy" v-if="tablewareNum==''">无需餐具（能量+10）</div>
              <div v-if="tablewareNum==''" class="dark">未选择</div>
              <div v-else>{{tablewareNum}}</div>
              <div>
                <i class="icon-keyboard_arrow_right"></i>
              </div>
              <div></div>
            </div>
          </div>
          <div class="content-height note" @click="clickNote">
            <div class="left-note">备注</div>
            <div class="right-note">
              <span class="right-note-content" v-if="note==''">点击选择无接触配送</span>
              <span class="right-note-content note-highlight" v-else>{{note}}</span>
            </div>
            <span class="note-icon">
              <i class="icon-keyboard_arrow_right"></i>
            </span>
          </div>
          <div class="content-height invoice">
            <div>发票</div>
            <div class="icon" @click="selectInvoice">
              <i class="icon-no" v-if="!invoice"></i>
              <i class="icon-yes" v-if="invoice"></i>
            </div>
          </div>
          <div class="content-height" v-if="invoice">
            <input class="my-input" type="text" placeholder="请填写个人或公司名称" />
          </div>
          <div class="content-height" v-if="invoice">
            <input class="my-input" type="text" placeholder="请填写纳税人识别号(选填)" />
          </div>
        </div>
        <div class="other">
          <i class="icon-remind"></i>
          不清楚优惠规则?
        </div>
      </div>
    </div>
    <div class="fix-wrapper">
      <div class="total">
        <div class="tittle">
          <div>合计</div>
          <div class="money">￥{{totalPrice}}</div>
        </div>
      </div>
      <div class="place_order" @click="placeOrder">提交订单</div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/myHeader/MyHeader.vue";
import Tableware from "@/components/Tableware/Tableware.vue";
import Note from "@/components/Note/Note.vue";

export default {
  components: {
    MyHeader,
    Tableware,
    Note
  },
  data() {
    return {
      note: "",
      tablewareNum: "",
      showTableware: false,
      showNote: false,
      routerName: "index",
      address: this.$store.state.address,
      tittle: "提交订单",
      seller: this.$store.state.seller,
      sellFood: this.$store.state.sellFood[this.$store.state.shopId],
      invoice: false
    };
  },
  computed: {
    totalPrice() {
      let sum = 0;
      this.sellFood.map(food => {
        sum += food.price * food.number;
      });
      return sum + this.seller.deliveryPrice;
    },
    deliveryTimeFormat() {
      let time = new Date();
      return (
        this.formatStr(time.getHours()) +
        ":" +
        this.formatStr(time.getSeconds())
      );
    }
  },
  methods: {
    closeWrapper() {
      this.closeNote();
      this.closeTableware();
    },
    setNote(val) {
      this.note = val;
      this.closeNote();
    },
    closeNote() {
      this.showNote = false;
    },
    clickNote() {
      this.showNote = true;
    },
    selectTablewareNum(val) {
      this.tablewareNum = val;
      this.closeTableware();
    },
    closeTableware() {
      this.showTableware = false;
    },
    clickTableware() {
      this.showTableware = true;
    },
    selectLacation() {
      this.$router.push({ path: "/address" });
    },
    selectInvoice() {
      this.invoice = !this.invoice;
    },
    formatStr(val) {
      return (Array(2).join("0") + val).slice(-2);
    },
    close() {
      this.$router.go(-1);
    },
    placeOrder() {
      alert("下单成功");
      this.$router.push({ path: "/" });
      this.$store.commit("setSellFood", []);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './order.styl';
</style>