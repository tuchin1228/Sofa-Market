<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide>
      <img src="../assets/img/p21.jpg" alt="長板沙發" />
      <p class=""><span>戶外野餐沙發</span><br />長板沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p2.jpg" alt="三人座沙發" />
      <p class=""><span>潔淨白三人沙發</span><br />三人座沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p3.jpg" alt="雙人座沙發" />
      <p class=""><span>復古雙人沙發</span><br />雙人座沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p4.jpg" alt="長板沙發" />
      <p class=""><span>海洋系長板沙發</span><br />長板沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p5.jpg" alt="雙人座沙發" />
      <p class=""><span>堆滿枕頭的沙發</span><br />雙人座沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p6.jpg" alt="雙人座沙發" />
      <p class=""><span>簡潔雙人沙發</span><br />雙人座沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p7.jpg" alt="圓筒沙發" />
      <p class=""><span>優雅圓筒沙發</span><br />圓筒沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p8.jpg" alt="雙人座沙發" />
      <p class=""><span>時髦雙人沙發</span><br />雙人座沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p9.jpg" alt="雙人座沙發" />
      <p class=""><span>火爐前的沙發</span><br />雙人座沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p10.jpg" alt="單人沙發" />
      <p class=""><span>復古單人沙發</span><br />單人沙發</p>
    </swiper-slide>
    <div slot="pagination" class="swiper-pagination" />
  </swiper>
</template>

<script>
import 'animate.css';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  name: 'SwiperExampleSpaceBetween',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        speed: 1200,
        loop: true,
        autoplay: {
          delay: 3500,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
    };
  },
};
</script>

<style scoped lang="scss" >
@import "@/assets/slick.scss";
</style>
