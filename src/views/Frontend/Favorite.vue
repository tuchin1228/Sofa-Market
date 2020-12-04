<template>
  <div>
    <Navbar />

    <div class="contain">
      <Slick />
      <div class="list">
        <div class="empty" v-if="FavoriteProduct.length === 0">
          <h3><span>目前無願望清單</span></h3>
          <p><span>點擊「追蹤」，即可加入願望清單</span></p>
          <div class="link">
            <router-link to="categorylist">立即選購</router-link>
          </div>
          <img src="@/assets/img/favor.png" alt="目前無願望清單" />
        </div>
        <h2 v-if="FavoriteProduct.length !== 0"><span>願</span>望清單</h2>
        <ProductCard
          :productInfo="item"
          v-for="item in FavoriteProduct"
          :key="item.id"
          @setPreviewProduct="getPreviewProduct"
          @sendremoveID="getremoveID"
        />

        <router-link to="categorylist" class="continue" v-if="FavoriteProduct.length !== 0"
          ><span>繼續購物</span></router-link
        >

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
    <Footer />
  </div>
</template>

<script>
import Slick from '@/components/Slick.vue';
import Navbar from '@/components/Navbar.vue';
import ProductCard from '@/components/ProductCard.vue';
import PreviewModal from '@/components/PreviewModal.vue';
import Footer from '@/components/Footer.vue';

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
@import "@/assets/scss/frontend/favorite.scss";
</style>
