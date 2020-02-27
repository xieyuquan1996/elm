<template>
  <span :class="imgClass[type]"></span>
</template>

<script>
export default {
  props: ['type'],
  computed: {
    imgClass() {
      return ["decrease", "discount", "special", "invoice", "guarantee"];
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.decrease, .discount, .special, .invoice, .guarantee
  display inline-block
  background-size: 100% 100%
  vertical-align: middle
.decrease
  bg-image('./decrease_4')
.discount
  bg-image('./discount_4')
.special
  bg-image('./special_4')
.invoice
  bg-image('./invoice_4')
.guarantee
  bg-image('./guarantee_4')
</style>