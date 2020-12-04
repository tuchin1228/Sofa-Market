<template>
  <div class="contain">
    <Navbar />
    <div class="imgbox">
      <img src="@/assets/img/404.png" alt="Error" />
      <router-link to="/"> 回首頁 </router-link>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/frontend/error.scss";
</style>
