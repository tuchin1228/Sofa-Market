<template>
  <div>
    <Navbar />

    <div class="contain">
      <Slick />
      <div class="newproduct">
        <router-link to="/categorylist?0=雙&1=人&2=座&3=沙&4=發">
          <section>
            <div class="imgbox">
              <img src="../assets/img/p1.jpg" alt="" />
            </div>
            <p>雙人系列<br /><span>質感加長沙發</span></p>
          </section>
        </router-link>
        <router-link to="/categorylist?0=單&1=人&2=沙&3=發">
          <section>
            <div class="imgbox">
              <img src="../assets/img/p15.jpg" alt="" />
            </div>
            <p>單人系列<br /><span>典雅單人沙發</span></p>
          </section>
        </router-link>
        <router-link to="/categorylist?0=三&1=人&2=座&3=沙&4=發">
          <section>
            <div class="imgbox">
              <img src="../assets/img/p2.jpg" alt="" />
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
            <img :src="item.imgUrl" alt="" />
          </div>
          <p>{{ item.category }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Slick from '../components/slick.vue';
import Navbar from '../components/navbar.vue';

export default {
  components: {
    Slick,
    Navbar,
  },
  data() {
    return {};
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
.contain {
  width: 1240px;
  margin: 85px auto 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  > p {
    margin: 3vh 0;
    font-size: 1.5em;
    font-weight: 500;
    letter-spacing: 2px;
    padding: 0.5vh 0;
    border-bottom: 1px solid #1a95ff;
    color: #1a95ff;
    text-align: center;
    width: 100%;
  }
  .newproduct {
    margin: 2vh 0;
    display: flex;
    justify-content: space-between;
    a {
      text-decoration: none;
      color: rgb(58, 58, 58);
      width: 32%;
    }
    section {
      .imgbox {
        overflow: hidden;
        cursor: pointer;
        img {
          width: 100%;
          transition: 0.3s;
        }
        &:hover {
          img {
            filter: brightness(1.1);
            transform: scale(1.05);
          }
        }
      }

      p {
        margin-top: 1vh;
        letter-spacing: 1.5px;
        padding: 0 10px;
        line-height: 1.2;
        font-size: 1em;
        font-weight: 300;
        border-left: 5px solid #a5c5ff;
        span {
          font-size: 1.5em;
          font-weight: 400;
          color: #001f75;
        }
      }
    }
  }
  .category_card {
    margin: 1vh 0vw;
    position: relative;
    cursor: pointer;
    a {
      text-decoration: none;
      .imgbox {
        width: 120px;
        height: 120px;
        overflow: hidden;
        position: relative;
        border-radius: 100%;

        img {
          transition: 0.5s ease-out;
          height: 100%;
        }

      }

      > p {
        text-align: center;
        font-weight: 300;
        letter-spacing: 2px;
        font-size: 1.3em;
        color: #5f5f5f;
        transition: 0.5s;
      }
      &:hover {
        > p {
          color: #75acff;
        }
        .imgbox {
          img {
            transform: scale(1.2);
          }

        }
      }
    }
  }
}
@media all and (max-width: 767px) {
  .contain {
    width: 100%;
    max-width: 675px;
    .category_card {
      width: 50%;
      a {
        .imgbox {
          margin: 0 auto;
          border-radius: 0%;
          overflow: hidden;
        }
      }
      &:hover {
        .imgbox img {
          filter: brightness(1.1);
          transform: scale(1) !important;
        }
      }
    }
    .newproduct {
      flex-direction: column;
      align-items: center;
      a {
        width: 95%;
      }
    }
  }
}
@media all and (max-width: 1259px) and (min-width: 768px) {
  .contain {
    width: 90%;
    .category_card {
      width: 25%;
      a {
        .imgbox {
          margin: 0 auto;
        }
      }
    }
    .newproduct {
      padding: 0 1vw;
      section p span {
        font-size: 1.2em;
      }
    }
  }
}
</style>
