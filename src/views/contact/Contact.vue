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
    <div class="common-buttom" @click="close">返回</div>
  </div>
</template>

<script>
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
        that.$route.params.address,
        that.$store.state.address
      );
    }
    that.addStatue = this.address.id ? false : true;
  },
  methods: {
    clickSex(sex) {
      this.address.sex = sex;
    },
    saveAddress() {
      const that = this;
      if (this.addStatue) {
        this.$API.addAddress(this.address).then(data => {
          if (data.data.data.code) {
            that.close();
          }
        });
      } else {
        this.$API.saveAddress(this.address).then(data => {
          if (data.data.data.code) {
            that.close();
          }
        });
      }
    },
    deleteAddress() {
      const that = this;
      this.$API.deleteAddress(this.address.id).then(data => {
        if (data.data.data.code) {
          that.close();
        }
      });
    },
    close() {
      this.$store.commit("setTempAddress", {});
      this.$router.push({ name: "address" });
    },
    selectReceivingAddress() {
      this.$store.commit("setTempAddress", this.address);
      this.$router.push({ name: "location" });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './contact.styl';
</style>