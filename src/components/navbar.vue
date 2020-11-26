<template>
  <div class="navcontain" :class="{ hasShadow: hasShadow }">
    <div class="contents">
      <router-link to="/">
        <h1>SOFA</h1>
      </router-link>
      <div class="icon_group">
        <div class="iconbox">
          <router-link to="/favorite">
            <i class="fas fa-heart"></i>
            <span class="tooltips">願望清單</span>
          </router-link>
          <span v-if="LocalId && LocalId.length !== 0">{{
            LocalId.length
          }}</span>
        </div>
        <router-link to="/categorylist">
          <i class="fas fa-couch"></i>
          <span class="tooltips">所有商品</span>
        </router-link>
        <router-link to="/login">
          <i class="fas fa-user"></i>
          <span class="tooltips">後台管理</span>
        </router-link>

        <div
          class="iconbox"
          @mouseover="showcart = true"
          @mouseout="showcart = false"
        >
          <router-link to="/cart">
            <i class="fas fa-shopping-cart"></i>
          </router-link>
          <span v-if="CartContent && CartContent.length !== 0">{{
            CartContent.length
          }}</span>

          <div class="dialog" v-show="showcart">
            <div v-for="item in CartContent" :key="item.id" class="CartItem">
              <img :src="item.product.imgUrl" :alt="item.product.title" />
              <p>
                {{ item.product.title }}<br />數量： {{ item.qty }}
                {{ item.product.unit }}
              </p>
              <button @click="deleteCartProduct(item.id, item.product.title)">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <router-link to="/cart" v-if="CartContent.length !== 0">
              <button class="checkout">前往結帳</button>
            </router-link>
            <p v-if="CartContent.length == 0">購物車沒有東西!</p>
            <router-link to="/categorylist" v-if="CartContent.length == 0">
              <button class="checkout">前往購物</button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'animate.css';

export default {
  data() {
    return {
      hasShadow: false,
      showcart: false,
    };
  },
  created() {
    this.getCartContent();
    this.$store.dispatch('getLocalStorage');
  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  },
  computed: {
    LocalId() {
      return this.$store.getters.LocalId;
    },
    CartContent() {
      return this.$store.getters.CartContent.carts;
    },
  },
  methods: {
    handleScroll() {
      if (window.pageYOffset > 0) {
        this.hasShadow = true;
      } else {
        this.hasShadow = false;
      }
    },
    getCartContent() {
      this.$store.dispatch('getCart');
    },
    deleteCartProduct(id, ProductTitle) {
      const alertInfo = {
        isShow: true,
        type: 'success',
        content: `從購物車移除 ${ProductTitle}`,
      };
      this.$store.dispatch('removeFromCart', { id, alertInfo });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/navbar.scss";
</style>
