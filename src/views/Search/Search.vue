<template>
  <div class="search">
    <div class="top-wrapper">
      <div class="icon-back" @click="$router.go(-1)">
        <i class="icon-arrow_lift"></i>
      </div>
      <div class="input-wrapper">
        <input class="input" type="text" placeholder="请输入商家或商品名称" v-model="keyword" @focus="showShopList=false"/>
        <span class="icon">
          <i class="icon-search"></i>
        </span>
      </div>
      <div class="search-div" @click="selectKeyword(keyword)">搜索</div>
    </div>
    <ul class="result-wrapper" v-if="resultList.length>0&&!showShopList">
      <li
        v-for="(item,index) of resultList"
        :key="index"
        class="result-content"
        @click="selectKeyword(item.name)"
      >
        <span class="icon">
          <i class="icon-search"></i>
        </span>
        <span class="name">{{item.name}}</span>
        <span class="count">约有{{item.count}}个结果</span>
      </li>
      <li class="result-content" v-if="keyword.length>0" @click="selectKeyword(keyword)">搜索“{{keyword}}”</li>
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
      resultList: []
    };
  },
  methods: {
    selectKeyword(val) {
      if(val != ''){
        this.showShopList = true;
        this.keyword = val;
      } else {
        this.$store.dispatch('setShowData', '输入的内容不能为空')
      }
    }
  },
  watch: {
    keyword (newVal){
      if(newVal != ''){
        const that = this
        that.$API.getShopListGroup(newVal).then(data => {
          if(data.data.data){
            that.resultList = data.data.data
          }
        })
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './search.styl';
</style>