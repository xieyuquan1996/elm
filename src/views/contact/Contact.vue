<template>
  <div class="contact">
    <div class="common person">
      <span class="left-common">联系人：</span>
      <input type="text" v-model="address.person" class="right-common" />
    </div>
    <div class="common sex-content">
      <span @click="clickSex('先生')">
        <span>
          <i class="icon-check_circle icon" :class="{'lighthigh': address.sex == '先生'}"></i>先生
        </span>
      </span>
      <span @click="clickSex('女士')">
        <span>
          <i class="icon-check_circle icon icon-right" :class="{'lighthigh': address.sex == '女士'}"></i>女士
        </span>
      </span>
    </div>
    <div class="common">
      <span class="left-common">手机号：</span>
      <input type="text" v-model="address.phone" class="right-common" maxlength="11" />
    </div>
    <div class="common">
      <span class="left-common">收货地址：</span>
      <div class="right-common address" @click="selectReceivingAddress">
        <i class="icon-white-location"></i>
        <div v-if="address.address!=''" class="address-content">{{address.address}}</div>
        <div v-else class="address-content dark-content">点击选择</div>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="common">
      <span class="left-common">门牌号：</span>
      <input type="text" v-model="address.doorplate" class="right-common" />
    </div>
    <div class="common-buttom hightligh" @click="saveAddress">保存</div>
    <div class="common-buttom" @click="deleteAddress">删除</div>
    <div class="common-buttom" @click="back()">返回</div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations,mapActions } = createNamespacedHelpers('home')
export default {
  data() {
    return {
      address: {
        address: "",
        latitude: 38.6518,
        longitude: 104.07642,
        doorplate: "",
        person: "",
        sex: "先生",
        phone: ""
      },
      addStatue: false
    };
  },
  created() {
    const that = this;
    if (that.$route.params.address) {
      that.address = Object.assign(
        that.address,
        that.$store.state.home.address
      );
    }
    that.addStatue = this.address.id ? false : true;
  },
  methods: {
    ...mapActions(['setShowData']),
    clickSex(sex) {
      this.address.sex = sex;
    },
    saveAddress() {
      const that = this;
      if (this.addStatue) {
        this.$API.addAddress(this.address).then(data => {
          if (data.data.data.code) {
            that.close();
          } else {
            that.setShowData( "新增地址失败，请稍后重试!");
          }
        }).catch(() => {
          that.setShowData( "新增地址失败，请稍后重试!");
        });
      } else {
        this.$API.saveAddress(this.address).then(data => {
          if (data.data.data.code) {
            that.close();
          } else {
            that.setShowData( "修改地址失败，请稍后重试!");
          }
        }).catch(() => {
          that.setShowData( "修改地址失败，请稍后重试!");
        });
      }
    },
    deleteAddress() {
      const that = this;
      this.$API.deleteAddress(this.address.id).then(data => {
        if (data.data.data.code) {
          that.close();
        } else {
          that.setShowData( "删除地址失败，请稍后重试!");
        }
      }).catch(() => {
        that.setShowData( "删除地址失败，请稍后重试!");
      });
    },
    back(){
      this.$store.dispatch('setLocation');
      this.close();
    },
    close() {
      this.$router.push({ name: "address" });
    },
    selectReceivingAddress() {
      this.setAddress(this.address);
      this.$router.push({ name: "location" });
    },
    ...mapMutations([
      'setAddress'
    ])
  }
};
</script>

<style lang="stylus" scoped>
@import './contact.styl';
</style>