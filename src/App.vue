<template>
  <div class="app">
    <router-view class="contain" />
    <Showinfo class="show-info" v-if="showData!=''"></Showinfo>
  </div>
</template>

<script>
import { getLocalStorage } from "@/serve/localstorage";
import Showinfo from "./components/ShowInfo/ShowInfo";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("home");
const { mapMutations  } = createNamespacedHelpers("my");
export default {
  components: { Showinfo },
  created() {
    if (!this.$store.state.my.token) {
      const token = getLocalStorage("token");
      if (token) {
        this.setToken(token);
      }
    }
    this.setLocation();
  },
  computed: {
    ...mapState({
      showData: "showData"
    })
  },
  methods: {
    ...mapMutations(["setToken"]),
    ...mapActions(["setLocation"])
  }
};
</script>
<style lang="stylus" scoped>
.app {
  height: 100%;

  .contain {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .foot {
    position: fixed;
    width: 100%;
    z-index: 10;
    height: 1.28rem;
    bottom: 0;
    background-color: #141d27;
  }

  .show-info {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
}
</style>
