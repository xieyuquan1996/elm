<template>
  <Scroll ref="scroll">
    <ul class="good" ref="leftWrapper">
      <li
        class="tittle"
        v-for="(item,index) of goods"
        :key="item.name"
        :class="highlight(index)"
        @click="choose(index)"
        ref="good"
      >
        <span class="text">
          <i v-if="item.type != -1" :class="imgClass[item.type]"></i>
          {{item.name}}
        </span>
      </li>
    </ul>
  </Scroll>
</template>

<script>
import Scroll from "@/components/scroll/Scroll.vue";
export default {
  components: {
    Scroll
  },
  props: ["goods"],
  data() {
    return {
      currentIndex: 0,
      topList: [],
      scrollY: 0,
      jumpIndex: 0
    };
  },
  computed: {
    imgClass() {
      return ["decrease", "discount", "special", "invoice", "guarantee"];
    }
  },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      that.scrollY = this.$refs.scroll.scroll.wrapper.clientHeight;
    });
    this.$refs.good.map(item => {
      that.topList.push(-item.offsetTop);
    });
  },
  methods: {
    highlight(index) {
      return index === this.currentIndex ? "highlight" : "";
    },
    setCurrentIndex(val) {
      // 向上跳一个，防止被遮住
      if (this.scrollY <= -this.topList[val]) {
        this.jumpIndex += 1;
        this.scrollY -= this.jumpIndex * this.topList[1];
        this.scrollToY(this.jumpIndex);
      }
      // 向下跳一个，防止被遮住
      if (this.jumpIndex > this.currentIndex) {
        this.jumpIndex -= 1;
        this.scrollY += this.topList[1];
        this.scrollToY(this.jumpIndex);
      }
      this.currentIndex = val;
    },
    choose(index) {
      this.setCurrentIndex(index);
      this.$emit("choose", index);
    },
    scrollToY(index) {
      this.$refs.scroll.scrollTo(0, this.topList[index], 100);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './goodsName.styl';
</style>