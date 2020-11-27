<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide>
      <router-link to="categorylist/-ML8mX5lDMN3dt-f47QL">
        <img src="../assets/img/p21.jpg" alt="長板沙發" />
        <p class=""><span>戶外野餐沙發</span><br />長板沙發</p>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <router-link to="categorylist/-ML3iyflcI5sVGwv7UHF">
        <img src="../assets/img/p2.jpg" alt="三人座沙發" />
        <p class=""><span>潔淨白三人沙發</span><br />三人座沙發</p>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <router-link to="categorylist/-ML3iud8tsn8sy6Hvt-p">
        <img src="../assets/img/p3.jpg" alt="雙人座沙發" />
        <p class=""><span>復古雙人沙發</span><br />雙人座沙發</p>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <router-link to="categorylist/-ML3ipAT9LLeU-veiyos">
        <img src="../assets/img/p4.jpg" alt="長板沙發" />
        <p class=""><span>海洋系長板沙發</span><br />長板沙發</p>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <router-link to="categorylist/-ML3ilf6hErmFkskULE2">
        <img src="../assets/img/p5.jpg" alt="雙人座沙發" />
        <p class=""><span>堆滿枕頭的沙發</span><br />雙人座沙發</p>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <router-link to="categorylist/-ML3iVWD0gyxzRblZ8jM">
        <img src="../assets/img/p6.jpg" alt="雙人座沙發" />
        <p class=""><span>簡潔雙人沙發</span><br />雙人座沙發</p>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <router-link to="categorylist/-ML3iPWd-7CWDkA6kLc_">
        <img src="../assets/img/p7.jpg" alt="圓筒沙發" />
        <p class=""><span>優雅圓筒沙發</span><br />圓筒沙發</p>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <router-link to="categorylist/-ML3iJM6mk5sU3VeJB68">
        <img src="../assets/img/p8.jpg" alt="雙人座沙發" />
        <p class=""><span>時髦雙人沙發</span><br />雙人座沙發</p>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <router-link to="categorylist/-ML8mjq-qfZPZs5KH5GZ">
        <img src="../assets/img/p9.jpg" alt="雙人座沙發" />
        <p class=""><span>火爐前的沙發</span><br />雙人座沙發</p>
      </router-link>
    </swiper-slide>
    <swiper-slide>
      <router-link to="categorylist/-ML3iE-w6bLCbMEdBNP3">
        <img src="../assets/img/p10.jpg" alt="單人沙發" />
        <p class=""><span>復古單人沙發</span><br />單人沙發</p>
      </router-link>
    </swiper-slide>
    <div slot="pagination" class="swiper-pagination" />
  </swiper>
</template>

<script>
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
