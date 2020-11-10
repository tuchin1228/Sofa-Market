<template>
  <swiper class="swiper" :options="swiperOption">
    <swiper-slide>
      <img src="../assets/img/p21.jpg" alt="" />
      <p class=""><span>戶外野餐沙發</span><br />長板沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p2.jpg" alt="" />
      <p class=""><span>潔淨白三人沙發</span><br />三人座沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p3.jpg" alt="" />
      <p class=""><span>復古雙人沙發</span><br />雙人座沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p4.jpg" alt="" />
      <p class=""><span>海洋系長板沙發</span><br />長板沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p5.jpg" alt="" />
      <p class=""><span>堆滿枕頭的沙發</span><br />雙人座沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p6.jpg" alt="" />
      <p class=""><span>簡潔雙人沙發</span><br />雙人座沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p7.jpg" alt="" />
      <p class=""><span>優雅圓筒沙發</span><br />圓筒沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p8.jpg" alt="" />
      <p class=""><span>時髦雙人沙發</span><br />雙人座沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p9.jpg" alt="" />
      <p class=""><span>火爐前的沙發</span><br />雙人座沙發</p>
    </swiper-slide>
    <swiper-slide>
      <img src="../assets/img/p10.jpg" alt="" />
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
.swiper {
  height: 400px;
  width: 1240px;
  margin-top: 2vh;
  .swiper-slide {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: bold;
    font-size: 1.2em;
    background-color: white;
    img {
      position: absolute;
      top: -20%;
      width: 100%;
    }
  }
  /deep/ .swiper-pagination-bullet {
    width: 12px !important;
    height: 12px !important;
  }
  --swiper-theme-color: #114eab;
  .swiper-slide-active {
    position: relative;
    p {
      position: absolute;
      top: 2%;
      left: 2%;
      font-size: 1.5em;
      z-index: 100;
      text-align: left;
      animation: fade-in 1s 1s linear;
      animation-fill-mode: both;
      line-height: 1.2;
      color: #ffffff;
      text-shadow: 0 2px 0 #9e5e0e;
      span {
        font-size: 2em;
        color: #fff8a0;
        text-shadow: 2px 2px 0 #bd5902;
      }
    }
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateX(100px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media all and (max-width: 767px) {
  .swiper {
    width: 100%;
    .swiper-slide {
      overflow-x: hidden;
      img {
        height: 100%;
        width: auto;
        top: 0;
      }
    }
    .swiper-slide-active {
      p {
        bottom: 0;
        height: fit-content;
        span {
          font-size: 1.6em;
        }
      }
    }
  }
}

@media all and (max-width: 1259px) and (min-width: 768px) {
  .swiper {
    width: 100%;
    .swiper-slide {
      img {
        top: 0;
      }
    }
  }
}
</style>
