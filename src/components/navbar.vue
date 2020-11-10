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
        <router-link to="/dashboard/product">
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
              <img :src="item.product.imgUrl" alt="" />
              <p>
                {{ item.product.title }}<br />數量： {{ item.qty }}
                {{ item.product.unit }}
              </p>
              <button @click="deleteCartProduct(item.id, item.product.title)">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <router-link to="/cart">
              <button class="checkout">前往結帳</button>
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
a {
  text-decoration: none;
}
.navcontain {
  z-index: 1000;
  padding: 10px 0 10px 0;
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  transition: 0.3s;
  background: rgb(255, 255, 255);
  box-shadow: 0 12px 6px rgba(255, 255, 255, 0);
}
.hasShadow {
  height: 70px;
  padding: 5px 0 5px 0;
  transition: 0.3s;
  box-shadow: 0 12px 6px rgba(0, 0, 0, 0.06);
}
.contents {
  width: 1240px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  background: rgb(255, 255, 255);
  justify-content: space-between;
  h1 {
    margin: 0;
    font-size: 2.2em;
    text-decoration: none;
    color: black;
    font-weight: 600;
  }
  .icon_group {
    position: relative;
    display: flex;
    a {
      position: relative;
      > i {
        margin: 1vh 1vw;
        font-size: 1.5em;
        cursor: pointer;
        color: #bfbfbf;
        transition: 0.2s;
        &:hover {
          color: #d1d1d1;
        }
      }
      > span {
        visibility: hidden;
        padding: 2px 4px;
        border-radius: 3px;
        display: block;
        position: absolute;
        width: max-content;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 100%);
        font-weight: 300;
        letter-spacing: 1.2px;
        color: rgb(255, 255, 255);
        background: rgba(20, 20, 20, 0.794);
        &::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          transform: translate(-50%, -100%);
          border-bottom: 5px solid rgba(20, 20, 20, 0.794);
          border-top: 5px solid transparent;
          border-right: 5px solid transparent;
          border-left: 5px solid transparent;
        }
      }
      &:hover {
        > span {
          visibility: visible;
        }
      }
    }

    .iconbox {
      position: relative;
      > span {
        right: 0;
        background: #ff5d5d;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        color: white;
        font-size: 0.8em;
        text-align: center;
        position: absolute;
      }
      .dialog {
        border-radius: 10px;
        position: absolute;
        transition: 1s;
        box-shadow: 4px 4px 10px #56565657;
        bottom: 0;
        right: 0;
        transform: translateY(100%);
        width: 300px;
        padding: 5px;
        background: rgb(255, 255, 255);
        position: absolute;
        border: 3px solid #90b7ff;
        .CartItem {
          display: flex;
          padding: 5px 0;
          justify-content: space-between;
          img {
            width: 30%;
          }
          p {
            padding: 0 3px;
            color: rgb(100, 100, 100);
            width: 60%;
            letter-spacing: 1.5px;
          }
          button {
            outline: none;
            width: 10%;
            border: none;
            background: white;
            i {
              margin: 0;
              color: rgb(42, 42, 42);
              font-size: 1em;
            }
            &:hover {
              background: rgb(233, 233, 233);
            }
          }
        }
        button.checkout {
          outline: none;
          display: block;
          width: 100%;
          border: none;
          background: rgb(111, 178, 255);
          color: white;
          font-size: 1.2em;
          padding: 0.5vh 0;
          &:hover {
            background: rgb(135, 191, 255);
          }
        }
      }
    }
  }
}
@media all and (max-width: 767px) {
  .navcontain {
    width: 100%;
    .contents {
      width: 95%;
      .icon_group {
        justify-content: space-between;
        width: 180px;
        a {
          span {
            width: 100px;
            text-align: center;
          }
        }
        .iconbox {
          .dialog {
            display: none;
          }
        }
      }
    }
  }
}
@media all and (max-width: 1259px) and (min-width: 768px) {
  .navcontain {
    width: 100%;
    .contents {
      width: 90%;
      .icon_group {
        a {
          span {
            width: 100px;
            text-align: center;
          }
        }
        .iconbox {
          .dialog {
            display: none;
          }
        }
      }
    }
  }
}
</style>
