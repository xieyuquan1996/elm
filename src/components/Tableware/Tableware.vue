<template>
  <div class="tableware" @click.stop="">
    <div class="commom tittle">选"无需餐具":在"我的内收取环保能量"</div>
    <ul class="num-wrapper" ref="ul">
      <li class="normal" v-for="item of numList" :key="item" :class="{hightligh: tablewareNum == item}" @click.stop="clickNum(item)" ref="li">{{item}}</li>
    </ul>
  </div>
</template>

<script>
export default {
    props:['tablewareNum'],
  data() {
    return {
      numList: [
        "无需餐具(能量+10)",
        "1份",
        "2份",
        "3份",
        "4份",
        "5份",
        "6份",
        "7份",
        "8份",
        "9份",
        "10份",
        "10份以上"
      ],
      lastTime: new Date(),
      liTopList: []
    };
  },
  mounted() {
    const that = this;
    this.$refs.li.map(item => {
      that.liTopList.push(item.offsetTop);
    });
    this.$refs.ul.scrollTop = this.liTopList[
      that.numList.findIndex(item => that.tablewareNum == item)
    ];
  },
  methods: {
      stop(){},
    clickNum(num) {
      this.$emit('selectTablewareNum', num);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './Tableware.styl';
</style>