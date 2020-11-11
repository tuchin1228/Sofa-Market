<template>
  <div class="contain">
    <Navbar />
    <div class="imgbox">
      <img src="../assets/img/404.png" alt="" />
      <router-link to="/"> 回首頁 </router-link>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from '../components/navbar.vue';
import Footer from '../components/footer.vue';

export default {
  components: {
    Navbar, Footer,
  },
};
</script>

<style scoped lang="scss">
.imgbox {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  a {
    display: block;
    margin: 1vh auto;
    text-decoration: none;
    background: #95e0ff;
    width: 100px;
    padding: 5px 0;
    border-radius: 5px;
    letter-spacing: 1.5px;
    font-size: 1.2em;
    color: white;
    box-shadow: 2px 2px 0 #83c5e2;
    transition: 0.3s;
    &:hover {
      background: #a5e4ff;
      box-shadow: 2px 2px 0 transparent;
      transform: translate(1px, 1px);
    }
  }
}
</style>
