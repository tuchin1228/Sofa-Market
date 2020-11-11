<template>
  <div>
    <Navbar />

    <div class="contain">
      <Slick />
      <div class="list">
        <div class="empty" v-if="FavoriteProduct.length === 0">
          <h3><span>目前無願望清單</span></h3>
          <p><span>點擊商品旁愛心，即可加入願望清單</span></p>
          <img src="../assets/img/favor.png" alt="" />
        </div>
        <h2 v-if="FavoriteProduct.length !== 0">願望清單</h2>
        <ProductCard
          :productInfo="item"
          v-for="item in FavoriteProduct"
          :key="item.id"
          @setPreviewProduct="getPreviewProduct"
          @sendremoveID="getremoveID"
        />

        <div class="productCard"></div>
        <div class="productCard"></div>
        <div class="productCard"></div>

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
    <Footer/>
  </div>
</template>

<script>
import 'animate.css';
import Slick from '../components/slick.vue';
import Navbar from '../components/navbar.vue';
import ProductCard from '../components/productCard.vue';
import PreviewModal from '../components/previewModal.vue';
import Footer from '../components/footer.vue';

export default {
  components: {
    Slick,
    Navbar,
    ProductCard,
    PreviewModal,
    Footer,
  },
  data() {
    return {
      FavoriteProduct: [],
      PreviewProduct: {},
      showPreview: false,
      favoriteID: [],
    };
  },
  created() {
    this.favoriteID = JSON.parse(localStorage.getItem('id'));
    this.getFavoriteProduct();
  },
  methods: {
    getFavoriteProduct() {
      const vm = this;
      const temparr = [];
      vm.favoriteID.forEach((id) => {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/product/${id}`;
        vm.$http.get(api).then((res) => {
          temparr.push(res.data.product);
        });
      });
      vm.FavoriteProduct = temparr;
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
  margin: 85px auto 0 auto;
}
.list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  a {
    text-decoration: none;
  }
  > h2 {
    width: 100%;
    margin: 2vh 0;
    font-weight: 600;
    text-align: center;
    color: #ff8585;
    letter-spacing: 1.5px;
    font-size: 2.5em;
  }
  .empty {
    margin-top: 5vh;
    width: 100%;
    text-align: center;
    img {
      width: 800px;
    }
    h3 {
      font-weight: 600;
      font-size: 1.6em;
      span {
        padding: 0 10px;
        border: 3px solid black;
      }
    }
    p {
      margin: 2vh 0;
      font-weight: 400;
      letter-spacing: 1.5px;
      font-size: 1.2em;
      span {
        padding: 0 1vw;
        border-bottom: 1px solid black;
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
      padding: 1vh 1vw;
      border-radius: 5px;
      transform: translate(-50%, -50%);
      width: 1100px;
      height: 500px;
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

@media all and (max-width: 767px) {
  .contain {
    width: 100%;
    max-width: 675px;
    .list {
      justify-content: center;
      .productCard {
        width: 300px;
        margin: 1vh 1vw;
      }
      .empty {
        img {
          width: 100%;
        }
      }
    }
  }
}

@media all and (max-width: 1259px) and (min-width: 768px) {
  .contain {
    width: 90%;
    max-width: 1024px;
    .list {
      .empty {
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
