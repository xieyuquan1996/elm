<template>
  <div class="home">
    <div class="head">
      <div class="left-wrapper" @click="clickAddress">
        <span class="left-icon">
          <i class="icon-location"></i>
        </span>
        <div class="loaction-tittle">{{location}}</div>
        <span class="right-icon">
          <i class="icon-keyboard_arrow_right"></i>
        </span>
      </div>
      <transition>
        <div class="right-wrapper">
          <div class="content"></div>
        </div>
      </transition>
    </div>
    <div class="footer">
      <div class="kingkong-wrapper">
        <div class="kingkong-parent" v-for="(item,index) of kingkongs" :key="index">
          <div v-for="kingkong of item" :key="kingkong.cateId" class="kingkong-child">
            <div class="kingkong-img">
              <img class="img" :src="kingkong.icon" />
            </div>
            <div class="kingkong-name">{{kingkong.name}}</div>
          </div>
        </div>
        <div class="kingkong-parent"></div>
      </div>
      <div class="tittle-wrapper">附近商家</div>
      <div class="search-box">
        <ul class="search-content">
          <li v-for="item of searchList" :key="item.name" class="content">
            {{item.name}}
            <i v-if="item.icon" :class="item.icon"></i>
          </li>
        </ul>
      </div>
      <ul class="shop-wrapper">
        <li v-for="shop of shopList" :key="shop.shopId" class="shop-content" @click="chooseShop(shop.shopId)">
          <div class="shop-left">
            <img :src="shop.avatar" class="image">
          </div>
          <div class="shop-right">
            <div class="shop-right-top">{{shop.name}}</div>
            <div class="shop-right-center">
              <div class="sorce">
                <Star :score="shop.score" :starStyle="starStyle" class="start"></Star>
                <span>{{shop.score}}</span>
              </div>
              <div class="distance">
                <span>{{shop.deliveryTime}}分钟 |</span><span>{{shop.distance}}</span>
              </div>
            </div>
            <div class="shop-right-bottom">
              <span>起送￥{{shop.minPrice}}</span> | <span>配送￥{{shop.deliveryPrice}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Star from '@/components/star/Star.vue'
export default {
  components: {
    Star
  },
  data() {
    return {
      location: "华南大桥",
      kingkongList: [
        {
          cateId: 910,
          icon:
            "http://p1.meituan.net/jungle/8b5e1702d4145ccf058ba5fb31008c5310912.png",
          name: "美食"
        },
        {
          cateId: 101574,
          icon:
            "http://p0.meituan.net/jungle/45ff2f098a20a77122bff8385192f0ec10547.png",
          name: "美团超市"
        },
        {
          cateId: 101578,
          icon:
            "http://p1.meituan.net/jungle/12a9834827909fa55f54bce96e67470711250.png",
          name: "生鲜果蔬"
        },
        {
          cateId: 960,
          icon:
            "http://p1.meituan.net/jungle/da9181f93dd2e11c5d74cf685470408f10016.png",
          name: "美团专送"
        },
        {
          cateId: 101181,
          icon:
            "http://p1.meituan.net/jungle/39edab4073ecc494fdb175854fa64eaa9507.png",
          name: "跑腿代购"
        },
        {
          cateId: 940,
          icon:
            "http://p1.meituan.net/jungle/a2a306c5467aba7fac8d7410d161f8db9364.png",
          name: "下午茶"
        },
        {
          cateId: 100062,
          icon:
            "http://p0.meituan.net/jungle/58b60a312cf86f3a3afc4c96ff0e53438774.png",
          name: "汉堡披萨"
        },
        {
          cateId: 100180,
          icon:
            "http://p0.meituan.net/jungle/2ec76f8f4f21a4ec163adc7fccfa1a399428.png",
          name: "小吃馆"
        },
        {
          cateId: 100209,
          icon:
            "http://p0.meituan.net/jungle/2eee7747fd143249b100b9fa5ee5e31d9873.png",
          name: "家常菜"
        },
        {
          cateId: 23,
          icon:
            "http://p1.meituan.net/jungle/dfd03fd91f640682c16179ba85837f739679.png",
          name: "鲜花蛋糕"
        },
        {
          cateId: 101502,
          icon:
            "http://p1.meituan.net/jungle/99fb0a3687a7ad570d015ec081ff396a9989.png",
          name: "品牌连锁"
        },
        {
          cateId: 100321,
          icon:
            "http://p0.meituan.net/jungle/06e382720a8501fd9e2c8242ff39f5119391.png",
          name: "异国料理"
        },
        {
          cateId: 100526,
          icon:
            "http://p1.meituan.net/jungle/73cb2e0a3cd157352d928c5df821ca0710009.png",
          name: "无辣不欢"
        },
        {
          cateId: 100199,
          icon:
            "http://p0.meituan.net/jungle/de03d208665e43949db1a4126212ca9f9418.png",
          name: "暖胃粉面"
        },
        {
          cateId: 100252,
          icon:
            "http://p0.meituan.net/jungle/0ce9a33a4accc536ac9e2d8d91951c924673.png",
          name: "炸鸡零食"
        },
        {
          cateId: 100590,
          icon:
            "http://p0.meituan.net/jungle/194860655986a852e343dcb9dffefbd39670.png",
          name: "包子粥铺"
        },
        {
          cateId: 100191,
          icon:
            "http://p1.meituan.net/jungle/06dd49ea356f2094a89f7eceff9fdd029160.png",
          name: "能量西餐"
        },
        {
          cateId: 100493,
          icon:
            "http://p1.meituan.net/jungle/1e28e7f84ac8a852b3a83e43c0ef40089522.png",
          name: "饺子馆"
        },
        {
          cateId: 22,
          icon:
            "http://p1.meituan.net/jungle/f26c34269ac5dfb152867dcf75719f983422.png",
          name: "送药上门"
        },
        {
          cateId: 100325,
          icon:
            "http://p1.meituan.net/jungle/83bfbcf07221cb1ccbcd9114e81ec7ac9209.png",
          name: "快食简餐"
        }
      ],
      searchList: [
        {
          name: "综合排序",
          icon: "icon-arrow-down"
        },
        {
          name: "销量最高"
        },
        {
          name: "距离最近"
        },
        {
          name: "筛选",
          icon: "icon-screening"
        }
      ],
      shopList:[],
      starStyle: {
        height: '.266667rem',
        width: '.266667rem',
        'margin-right': 0
      }
    };
  },
  computed: {
    kingkongs() {
      const res = [];
      let temp = [];
      for (let i = 0; i < this.kingkongList.length && i < 10; i++) {
        temp.push(this.kingkongList[i]);
        if ((i + 1) % 5 == 0) {
          res.push(temp);
          temp = [];
        }
      }
      if (temp.length != 0) {
        res.push(temp);
      }
      return res;
    }
  },
  created(){
    const that = this
    this.$API.getShopList().then((data) => {
      if(data.data.data){
        that.shopList = data.data.data
      }
      
    })
  },
  methods: {
    clickAddress(){
      //this.$router.push({name: 'location'})
    },
    chooseShop(shopId){
      this.$store.commit('setShopId', shopId)
      this.$router.push({name: 'index'})
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './home.styl';
</style>