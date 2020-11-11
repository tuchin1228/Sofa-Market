<template>
  <div>
    <Navbar />
    <div class="contain">
      <Slick />
      <div class="breadcrumbs">
        <router-link to="/">首頁</router-link>
        /
        <a
          href=""
          :class="{ disabled: categoryKey == 'All' }"
          to=""
          @click.prevent="categoryKey = 'All'"
          >所有商品</a
        >
        /
        <a href="" v-if="categoryKey !== 'All'" class="disabled" to="">{{
          categoryKey
        }}</a>
      </div>

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
  mounted() {},

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
.contain {
  width: 1240px;
  margin: 85px auto 0 auto;
  .breadcrumbs {
    margin: 1vh 0;
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
  .list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    a {
      text-decoration: none;
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
  .menu {
    margin-top: 3vh;
    ul {
      padding: 0;
      display: flex;
      justify-content: space-between;
      li {
        list-style: none;
        padding: 2px 1vw;
        font-size: 1.1em;
        margin: 0.5vh 0px;
        border: 1px solid #4688ff;
        color: #4688ff;
        transition: 0.3s;
        width: 140px;
        text-align: center;
        letter-spacing: 1.2px;
        font-weight: 300;
        background: linear-gradient(
          to left,
          rgb(255, 255, 255) 50%,
          #88c8ff 50%,
          #88c8ff 100%
        );
        background-size: 200%;
        background-position: 100%;
        cursor: pointer;
        &.active {
          background-position: 0%;
          color: white;
        }
      }
    }
  }
}

@media all and (max-width: 767px) {
  .contain {
    width: 100%;
    max-width: 675px;
    .breadcrumbs {
      margin: 1vh 1vw;
    }
    .list {
      justify-content: center;
      .productCard {
        margin: 1vh 1vw;
        width: 300px;
      }
      .previewbox {
        .dialog {
          width: 95%;
          top: 55%;
        }
      }
    }
    .menu {
      ul {
        flex-wrap: wrap;
        justify-content: center;
        li {
          width: 45%;
          margin: 1vh 1vw;
          max-width: 300px;
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
      .productCard {
        width: 300px;
        margin: 1vh 1vw;
      }
    }
    .menu {
      ul {
        flex-wrap: wrap;
        li {
          width: 23%;
        }
      }
    }
  }
}
</style>
