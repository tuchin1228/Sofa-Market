<template>
  <div>
    <Navbar />
    <div class="contain" v-if="ProductInfo !== null">
      <div class="breadcrumbs">
        <router-link to="/">首頁</router-link>
        /
        <router-link to="/categorylist">所有商品</router-link>
        /
        <router-link
          :to="{ path: `/categorylist`, query: ProductInfo.category }"
        >
          {{ ProductInfo.category }}
        </router-link>
      </div>
      <div class="contents">
        <div class="phoneimg">
          <img :src="ProductInfo.imgUrl" alt="" />
        </div>
        <div class="left">
          <div class="imgbox">
            <img :src="ProductInfo.imgUrl" alt="" />
          </div>
          <p class="info" style="margin-bottom: 5vh">{{ ProductInfo.desc }}</p>
          <p class="disc"><span>規格說明</span></p>
          <table>
            <tr>
              <td>尺寸<span>(公分)</span></td>
              <td>
                長200 x 深95 x 高86 /<br />
                座高40 / 座深65
              </td>
            </tr>
            <tr>
              <td>材質</td>
              <td>科技布、乳膠、羽絨</td>
            </tr>
          </table>
          <p class="disc"><span>訂購方式</span></p>
          <h4>網路訂購</h4>
          <p class="cont">立即下單，5天內到貨(不含例假日)</p>
          <h4>電話訂購</h4>
          <p class="cont">
            撥打服務專線 06-1234567 ，客服人員將協助訂購<br />
            <span>專線服務時間: 周一至周六 09:00 - 12:30 / 13:30 - 18:00</span>
          </p>
          <h4>到店選購</h4>
          <p class="cont">
            到店將有專人介紹，可選擇自行運送或公司配送<br />
            <span>店面位址:台南市北區沒有路87號</span><br />
            <span>營業時間:09:00 - 18:00</span>
          </p>
        </div>
        <div class="right">
          <h2>{{ ProductInfo.title }}</h2>
          <h3>{{ ProductInfo.category }}</h3>
          <div class="price">
            <h4>
              <span>{{ ProductInfo.price | currency }}</span
              >/ {{ ProductInfo.unit }}
            </h4>
            <h6 v-if="ProductInfo.origin_price !== ProductInfo.price">
              原價 <br />{{ ProductInfo.origin_price | currency }}
            </h6>
          </div>

          <div class="flexbox">
            <h5>選擇數量</h5>
            <div class="selectCount">
              <button @click="calculateProductCount('less')">-</button>
              <span>{{ ProductCount }}</span
              ><button @click="calculateProductCount('add')">+</button>
            </div>
            <div class="phoneselect">
              <select name="" id="" v-model="ProductCount">
                <option :value="count" v-for="count in 10" :key="count">
                  {{ count }}
                </option>
              </select>
            </div>
          </div>

          <h4 class="calc">小計:$ {{ ProductInfo.price * ProductCount }}</h4>
          <button
            class="cart"
            @click="ProductToCart"
            v-if="ProductInfo.is_enabled"
          >
            <i class="fas fa-shopping-cart"></i> 放入購物車
          </button>
          <button class="cart enabled" v-if="!ProductInfo.is_enabled">
            <i class="fas fa-shopping-cart"></i> 補貨中
          </button>
        </div>
        <div class="maybelove">
          <h2>也許你也喜歡...</h2>
          <ProductCard
            v-for="item in maybefavor"
            :key="item.id"
            :productInfo="item"
            @setPreviewProduct="getPreviewProduct"
            @sendremoveID="getremoveID"
          />
        </div>
        <transition
          enter-active-class="animate__animated animate__fadeIn animate__faster"
          leave-active-class="animate__animated animate__fadeOut animate__faster"
        >
          <div class="previewbox" v-if="showPreview === true">
            <div class="dialogBg" @click="showPreview = false"></div>
            <div class="dialog">
              <i class="fas fa-times" @click="showPreview = false"></i>
              <PreviewModal :previewData="PreviewProduct" />
            </div>
          </div>
        </transition>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/navbar.vue';
import Footer from '../components/footer.vue';
import ProductCard from '../components/productCard.vue';
import PreviewModal from '../components/previewModal.vue';

export default {
  components: {
    Navbar,
    Footer,
    ProductCard,
    PreviewModal,
  },
  data() {
    return {
      ProductInfo: null,
      ProductCount: 1,
      showPreview: false,
      favoriteID: [],
    };
  },
  computed: {
    maybefavor() {
      const vm = this;
      const allproduct = vm.$store.getters.Allproducts.products;
      const temparr = [];
      const result = new Set();
      const repeat = new Set();
      for (let i = 0; i < 4; i += 1) {
        const index = Math.floor(Math.random() * allproduct.length);
        if (
          allproduct[index].id !== vm.ProductInfo.id
          && allproduct[index].is_enabled === true
        ) {
          temparr.push(allproduct[index]);
        } else {
          i -= 1;
        }
        temparr.forEach((item) => (result.has(item) ? repeat.add(item) : result.add(item)));
        if (i === 3 && result.size !== 4) {
          i -= 1;
        }
      }
      return result;
    },
  },
  created() {
    const id = this.$route.params.productid;
    this.getProductInfo(id);
    this.$store.dispatch('getAll');
  },
  watch: {
    $route() {
      this.getProductInfo(this.$route.params.productid);
    },
  },
  methods: {
    getProductInfo(id) {
      const vm = this;
      vm.$store.dispatch('LoadingStatus', true);
      vm.$http
        .get(
          `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/product/${id}`,
        )
        .then((res) => {
          if (res.data.success) {
            vm.ProductInfo = res.data.product;
            vm.$store.dispatch('LoadingStatus', false);
          } else {
            vm.$router.push('/error');
            vm.$store.dispatch('LoadingStatus', false);
          }
        });
    },
    calculateProductCount(key) {
      const vm = this;
      if (key === 'add' && vm.ProductCount < 10) {
        vm.ProductCount += 1;
      } else if (key === 'less' && vm.ProductCount > 1) {
        vm.ProductCount -= 1;
      }
    },
    ProductToCart() {
      const vm = this;
      const cartcontent = {
        product_id: vm.ProductInfo.id,
        qty: vm.ProductCount,
      };
      const alertInfo = {
        isShow: true,
        type: 'success',
        content: `${vm.ProductInfo.title} 加入購物車`,
      };
      vm.$store.dispatch('addToCart', { cartcontent, alertInfo });
    },
    getPreviewProduct(item) {
      this.PreviewProduct = item;
      this.showPreview = true;
    },
    getremoveID(id) {
      this.FavoriteProduct.forEach((item, index) => {
        if (item.id === id) {
          this.FavoriteProduct.splice(index, 1);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.contain {
  width: 1240px;
  margin: 90px auto 0 auto;
  .breadcrumbs {
    padding: 0.5vh 0;
    border-bottom: 1px solid #dcdcdc;
    color: #a9a9a9;
    a {
      color: #a9a9a9;
      font-size: 1.1em;
      letter-spacing: 1.2px;
      &.disabled {
        pointer-events: none;
      }
    }
  }
  .contents {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    .phoneimg {
      display: none;
    }
    .maybelove {
      margin: 5vh 0;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      > h2 {
        width: 100%;
        background: #d7edfa;
        text-align: center;
        padding: 1vh 0;
        color: #5386b3;
        border-top: 2px solid #92cdff;
      }
    }
    .left {
      width: 70%;
      padding: 1vh 0vw;
      table {
        width: 100%;
        tr {
          td {
            padding: 1vh 1vw;
            letter-spacing: 2px;
            font-size: 1.2em;
            font-weight: 300;
            color: rgb(59, 59, 59);
            text-align: center;
            border-right: 1px solid #dcdcdc;
            border-bottom: 1px solid #dcdcdc;
            span {
              font-size: 0.7em;
            }
            &:first-child {
              border-left: 1px solid #dcdcdc;
            }
          }
          &:first-child {
            td {
              border-top: 1px solid #dcdcdc;
            }
          }
        }
      }
      .imgbox {
        text-align: center;
        padding: 10px;
        border: 1px solid #d8d8d8;
        > img {
          width: 100%;
        }
      }
      p.info {
        margin: 2vh 0;
        letter-spacing: 2px;
        font-size: 1.1em;
        font-weight: 300;
        padding: 0 1vw;
      }
      p.disc {
        margin: 2vh 0;
        text-align: center;
        letter-spacing: 1.5px;
        font-size: 1.6em;
        font-weight: 500;
        color: #58bbff;
        span {
          border-bottom: 2px solid #d9efff;
        }
      }
      h4 {
        font-weight: 300;
        font-size: 1.4em;
        margin-top: 5vh;
      }
      p.cont {
        font-size: 1.2em;
        padding: 0 1vw;
        font-weight: 300;
        letter-spacing: 1.5px;
        span {
          font-size: 0.8em;
        }
      }
    }
    .right {
      padding: 3vh 1vw;
      width: 30%;
      h2 {
        font-size: 1.5em;
        font-weight: 600;
        letter-spacing: 1.5px;
      }
      h3 {
        font-size: 1.1em;
        letter-spacing: 1.5px;
        font-weight: 300;
      }
      .price {
        display: flex;
        align-items: center;
        margin: 2vh 0 0 0;
      }
      h6 {
        margin: 0 1vw;
        font-size: 1em;
        font-weight: 400;
        text-decoration: line-through;
        color: rgb(121, 121, 121);
      }
      h4 {
        font-weight: 400;
        color: black;
        font-size: 1em;
        margin: 0;
        span {
          font-weight: 600;
          font-size: 2.3em;
        }
      }
      .flexbox {
        display: flex;
        align-items: center;
        .phoneselect {
          visibility: hidden;
        }
        h5 {
          margin: 0 10px 0 0;
          font-weight: 300;
          cursor: default;
          letter-spacing: 1.2px;
        }
        .selectCount {
          margin: 3vh 0;
          border: 1px solid #bbbbbb;
          width: fit-content;
          span {
            padding: 0 10px;
          }
          button {
            outline: none;
            &:hover {
              background: rgb(172, 172, 172);
            }
            &:nth-of-type(1) {
              border: none;
              border-right: 1px solid #cccccc;
              padding: 0 10px;
            }

            &:nth-of-type(2) {
              border: none;
              border-left: 1px solid #cccccc;
              padding: 0 10px;
            }
          }
        }
      }
      h4.calc {
        text-align: right;
        margin: 0.5vh 0;
        font-weight: 300;
        color: #989898;
        letter-spacing: 1.5px;
      }
      button.cart {
        outline: none;
        width: 100%;
        text-align: center;
        display: block;
        border: none;
        letter-spacing: 1.5px;
        background: #58bbff;
        color: #fff;
        padding: 1vh 0;
        transition: 0.3s;
        &:hover {
          background: #85ceff;
        }
      }
      button.enabled {
        cursor: default;
        background: #616161;
        &:hover {
          background: #616161;
        }
      }
    }

    .previewbox {
      z-index: 999;
      .dialogBg {
        left: 0;
        top: 0;
        height: 100vh;
        width: 100%;
        z-index: 99;
        position: fixed;
        background: #8c8c8c75;
      }
      .dialog {
        position: fixed;
        left: 50%;
        top: 45%;
        padding: 5vh 1vw 2vh 1vw;
        border-radius: 5px;
        transform: translate(-50%, -50%);
        width: 400px;
        background: white;
        box-shadow: 6px 6px 15px #5656563d;
        z-index: 1200;
        > i {
          position: absolute;
          right: 2%;
          top: 2%;
          cursor: pointer;
          padding: 5px 8px;
          font-size: 1.2em;
          border-radius: 100%;
          color: rgb(68, 68, 68);
          transition: 0.3s;
          &:hover {
            background: rgb(238, 238, 238);
          }
        }
      }
    }
  }
}

@media all and (max-width: 1259px) {
  .contain {
    width: 100%;
    max-width: 675px;
    .contents {
      flex-direction: column;
      .maybelove{
        order: 3;
      }
      .phoneimg {
        display: block;
        img {
          width: 100%;
        }
      }
      .previewbox {
        .dialog {
          width: 95%;
          top: 55%;
          max-width: 400px;
        }
      }
      .left {
        order: 2;
        width: 98%;
        margin: 0 auto;
        .imgbox {
          display: none;
        }
      }
      .right {
        order: 1;
        width: 100%;
        .flexbox {
          margin: 2vh 0;
          .selectCount {
            display: none;
          }
          .phoneselect {
            visibility: visible;
            select {
              width: 100px;
            }
          }
        }
      }
    }
  }
}
</style>
