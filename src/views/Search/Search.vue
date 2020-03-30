<template>
  <div class="search">
    <div class="top-wrapper">
      <div class="icon-back">
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <div class="input-wrapper">
        <input class="input" type="text" v-model="keyword" @focus="showShopList=false"/>
        <span class="icon">
          <i class="icon-screening"></i>
        </span>
      </div>
      <div class="search-div">搜索</div>
    </div>
    <ul class="result-wrapper" v-if="resultList.length>0&&!showShopList">
      <li
        v-for="(item,index) of resultList"
        :key="index"
        class="result-content"
        @click="selectKeyword(item.name)"
      >
        <span class="icon">
          <i class="icon-screening"></i>
        </span>
        <span class="name">{{item.name}}</span>
        <span class="count">约有{{item.count}}个结果</span>
      </li>
    </ul>
    <ShopList v-if="showShopList" :keyword="keyword"></ShopList>
  </div>
</template>

<script>
import ShopList from "@/components/ShopList/ShopList.vue";
export default {
  components: {
    ShopList
  },
  data() {
    return {
      keyword: "",
      showShopList: false,
      resultList: [
        {
          name: "测试",
          count: 1
        }
      ]
    };
  },
  methods: {
    selectKeyword(val) {
      this.showShopList = true;
      this.keyword = val;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './search.styl';
</style>