<template>
  <div class="home">
    <component :is="currentComponent">
    </component>
    <div class="bottom-wrapper">
      <div
        v-for="item of bottomList"
        :key="item.name"
        class="bottom-child"
        :class="{highlight: item.name==page}"
        @click="selectPage(item)"
      >
        <div>
          <i :class="item.icon"></i>
        </div>
        <div>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "@/components/Home/Home.vue";
import Order from "@/components/Order/Order.vue";
export default {
  components: {
    Home, Order
  },
  data() {
    return {
      // 当前动态组件的名称
      currentComponent: "Home",
      page: "首页",
      bottomList: [
        {
          name: "首页",
          icon: "icon-home",
          components: "Home"
        },
        {
          name: "订单",
          icon: "icon-order",
          components: "Order"
        }
      ]
    };
  },
  computed: {},
  created() {},
  methods: {
    selectPage(data) {
      this.page = data.name;
      this.currentComponent = data.components;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './home.styl';
</style>