<template>
  <div>
    <Navbar />

    <div class="contain" >
      <Slick />
      <div class="newproduct">
        <router-link to="/categorylist?0=雙&1=人&2=座&3=沙&4=發">
          <section>
            <div class="imgbox">
              <img src="@/assets/img/p1.jpg" alt="質感加長沙發" />
            </div>
            <p>雙人系列<br /><span>質感加長沙發</span></p>
          </section>
        </router-link>
        <router-link to="/categorylist?0=單&1=人&2=沙&3=發">
          <section>
            <div class="imgbox">
              <img src="@/assets/img/p15.jpg" alt="典雅單人沙發" />
            </div>
            <p>單人系列<br /><span>典雅單人沙發</span></p>
          </section>
        </router-link>
        <router-link to="/categorylist?0=三&1=人&2=座&3=沙&4=發">
          <section>
            <div class="imgbox">
              <img src="@/assets/img/p2.jpg" alt="樸實而奢華沙發" />
            </div>
            <p>三人系列<br /><span>樸實而奢華沙發</span></p>
          </section>
        </router-link>
      </div>
      <p>產品分類</p>
      <div class="category_card">
        <router-link :to="{ path: '/categorylist', query: 'All' }">
          <div class="imgbox" style="border: 1px solid #d0d0d0">
            <p
              style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 3.5em;
                color: #ababab;
              "
            >
              ALL
            </p>
          </div>
          <p>全部商品</p>
        </router-link>
      </div>
      <div v-for="item in categoryList" :key="item.id" class="category_card">
        <router-link :to="{ path: '/categorylist', query: item.category }">
          <div class="imgbox">
            <img :src="item.imgUrl" :alt="item.category" />
          </div>
          <p>{{ item.category }}</p>
        </router-link>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Slick from '@/components/Slick.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Slick,
    Navbar,
    Footer,
  },
  computed: {
    categoryList() {
      return this.$store.getters.Category;
    },
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.$store.dispatch('getAll');
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/frontend/index.scss";
</style>
