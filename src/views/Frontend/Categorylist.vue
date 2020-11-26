<template>
  <div>
    <Navbar />
    <div class="contain">
      <Slick />

      <div class="menu">
        <ul>
          <li
            @click="categoryKey = 'All'"
            :class="{ active: categoryKey === 'All' }"
          >
            全部
          </li>
          <li
            v-for="item in categoryList"
            :key="item.id"
            @click="categoryKey = item.category"
            :class="{ active: categoryKey === item.category }"
          >
            {{ item.category }}
          </li>
        </ul>
      </div>
      <div class="list">
        <ProductCard
          :productInfo="item"
          v-for="item in productList"
          :key="item.id"
          @setPreviewProduct="getPreviewProduct"
          v-show="item.category === categoryKey || categoryKey == 'All'"
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
    <Footer />
  </div>
</template>

<script>
import 'animate.css';
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
      categoryKey: 'All',
      Category: [],
      PreviewProduct: {},
      showPreview: false,
    };
  },
  computed: {
    productList() {
      return this.$store.getters.Allproducts.products;
    },
    categoryList() {
      return this.$store.getters.Category;
    },
  },
  created() {
    this.getProduct();
    const query = Object.values(this.$route.query).join('');
    if (query !== '') {
      this.categoryKey = query;
    }
  },

  methods: {
    getPreviewProduct(item) {
      this.PreviewProduct = item;
      this.showPreview = true;
    },
    getProduct() {
      this.$store.dispatch('getAll');
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/categorylist.scss";
</style>
