<template>
  <div>
    <Navbar />
    <div class="contain" v-if="ProductInfo !== null">
      <div class="breadcrumbs">
        <router-link to="/">首頁</router-link>
        /
        <router-link to="/categorylist">所有商品</router-link>
        /
        <router-link :to="{ path: `/categorylist`, query: ProductInfo.category }">
          {{ ProductInfo.category }}
        </router-link>
      </div>
      <div class="contents">
        <div class="phoneimg">
          <img :src="ProductInfo.imgUrl" :alt="ProductInfo.title" />
        </div>
        <div class="left">
          <div class="imgbox">
            <img :src="ProductInfo.imgUrl" :alt="ProductInfo.title" />
          </div>
          <p class="info" style="margin-bottom: 5vh">{{ ProductInfo.desc }}</p>
          <p class="disc"><span>規</span>格說明</p>
          <table>
            <tbody>
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
            </tbody>
          </table>
          <p class="disc"><span>訂</span>購方式</p>
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
          <p class="disc"><span>常</span>見問題</p>
          <p class="cont">
            Q：<strong>請問可以退換貨嗎?</strong><br />
            A：商品一經使用或組裝後，恕無法辦理退換貨
          </p>
          <p class="cont">
            Q：<strong>住家入口太小能退貨嗎?</strong><br />
            A：如配送、出入口、樓梯狹窄，請速洽線上客服，恕不接受空間限制搬運理由退換貨。
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
          <button class="cart" @click="ProductToCart(ProductInfo.id)" v-if="ProductInfo.is_enabled">
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
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import ProductCard from '@/components/ProductCard.vue';
import PreviewModal from '@/components/PreviewModal.vue';

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
        if (allproduct[index].id !== vm.ProductInfo.id && allproduct[index].is_enabled === true) {
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
    CartContent() {
      return this.$store.getters.CartContent;
    },
  },
  created() {
    const id = this.$route.params.productid;
    this.getProductInfo(id);
    this.$store.dispatch('getAll');
  },
  watch: {
    $route(to) {
      this.getProductInfo(to.params.productid);
    },
  },
  methods: {
    getProductInfo(id) {
      const vm = this;
      vm.$store.dispatch('LoadingStatus', true);
      vm.$http
        .get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/product/${id}`)
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
    ProductToCart(id) {
      const vm = this;
      const same = this.CartContent.carts.filter((item) => item.product_id === id);

      if (same.length === 0) {
        const cartcontent = {
          product_id: id,
          qty: vm.ProductCount,
        };
        const alertInfo = {
          isShow: true,
          type: 'success',
          content: `${vm.ProductInfo.title} 加入購物車`,
        };
        this.$store.dispatch('addToCart', { cartcontent, alertInfo });
      } else {
        const alertInfo = {
          isShow: true,
          type: 'success',
          content: `${vm.ProductInfo.title} 更改數量`,
        };
        const oldId = same[0].id;
        const newQty = vm.ProductCount;
        const cartproduct = {
          product_id: id,
          qty: newQty,
        };
        this.$store.dispatch('changeCartQty', { oldId, cartproduct, alertInfo });
      }
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
@import "@/assets/scss/frontend/productInfo.scss";
</style>
