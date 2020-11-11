<template>
  <div class="productCard animate__animated animate__fadeIn">
    <router-link
      :to="{ name: 'ProductInfo', params: { productid: productInfo.id } }"
    >
      <div class="imgbox">
        <img :src="productInfo.imgUrl" alt="" />
        <div class="soldoutbox" v-if="!productInfo.is_enabled">
          <span class="soldout">已完售</span>
        </div>
        <div class="linkbox">
          <button
            href=""
            @click.prevent="
              previewData = setPreviewProduct(productInfo);
              showPreview = true;
            "
          >
            立即預覽
          </button>
          <button
            @click.prevent="ProductToCart(productInfo.id, productInfo.title)"
            v-if="productInfo.is_enabled"
          >
            加入購物車
          </button>
        </div>
        <div class="phonelinkbox" v-if="productInfo.is_enabled">
          <button
            href=""
            @click.prevent="
              previewData = setPreviewProduct(productInfo);
              showPreview = true;
            "
          >
            立即預覽
          </button>
          <button
            @click.prevent="ProductToCart(productInfo.id, productInfo.title)"
            v-if="productInfo.is_enabled"
          >
            加入購物車
          </button>
        </div>
      </div>
    </router-link>

    <span class="categorySpan">{{ productInfo.category | lastword }}</span>
    <div class="titlebox">
      <router-link
        :to="{ name: 'ProductInfo', params: { productid: productInfo.id } }"
      >
        <p>
          {{ productInfo.title }}<br />售價 NT.{{
            productInfo.price | currency
          }}
        </p></router-link
      >
      <div class="favor" @click="setLocalStorage(productInfo.id)">
        <i class="fas fa-heart" v-if="checkfavor(productInfo.id)"></i>
        <i class="far fa-heart" v-else></i>
      </div>
    </div>
  </div>
</template>

<script>
import 'animate.css';

export default {
  props: {
    productInfo: {
      type: Object,
      require,
    },
  },
  data() {
    return {
      favor: [],
      previewData: {},
    };
  },
  created() {
    this.createLocal();
  },
  methods: {
    setPreviewProduct(item) {
      this.$emit('setPreviewProduct', item);
    },
    checkfavor(id) {
      if (this.favor.indexOf(id) !== -1) {
        return true;
      }
      return false;
    },
    ProductToCart(id, ProductTitle) {
      const cartcontent = {
        product_id: id,
        qty: 1,
      };
      const alertInfo = {
        isShow: true,
        type: 'success',
        content: `${ProductTitle} 加入購物車`,
      };
      this.$store.dispatch('addToCart', { cartcontent, alertInfo });
    },
    createLocal() {
      if (localStorage.getItem('id') == null) {
        localStorage.setItem('id', '[]');
      } else {
        this.favor = localStorage.getItem('id');
      }
    },
    setLocalStorage(id) {
      const vm = this;
      let OldData = [];
      OldData = JSON.parse(localStorage.getItem('id'));

      if (Object.values(OldData).length === 0) {
        this.$store.dispatch('showalerts', {
          isShow: true,
          type: 'success',
          content: '成功加入願望',
        });
        OldData.push(id);
      } else if (Object.values(OldData).indexOf(id) !== -1) {
        OldData.splice(Object.values(OldData).indexOf(id), 1);
        this.$emit('sendremoveID', id);
        this.$store.dispatch('showalerts', {
          isShow: true,
          type: 'success',
          content: '成功移除願望',
        });
      } else if (Object.values(OldData).length === 6) {
        this.$store.dispatch('showalerts', {
          isShow: true,
          type: 'danger',
          content: '願望清單最多6筆',
        });
      } else if (Object.values(OldData).indexOf(id) === -1) {
        OldData.push(id);
        this.$store.dispatch('showalerts', {
          isShow: true,
          type: 'success',
          content: '成功加入願望',
        });
      }
      localStorage.setItem('id', JSON.stringify(OldData));
      this.$store.dispatch('getLocalStorage');
      vm.favor = OldData;
    },
  },
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.productCard {
  margin: 1.5vh 0vw;
  width: 300px;
  position: relative;
  &:hover {
    .titlebox p {
      color: rgb(119, 119, 119);
    }
    .imgbox {
      img {
        transform: scale(1.1);
      }
       .linkbox {
        transform: translate(-50%, 0%);
        visibility: visible;
      }
    }

  }

  .titlebox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    p {
      text-align: left;
      font-size: 1em;
      margin: 0;
      font-weight: 300;
      letter-spacing: 1.5px;
      padding: 0.5vh 0;
      transition: 0.3s;
      text-decoration: none;
      color: rgb(47, 47, 47);
    }
    .favor {
      border-radius: 5px;
      margin: 5px 0;
      cursor: pointer;
      background: white;
      i {
        color: rgb(255, 112, 112);
        padding: 5px;
        font-size: 1.5em;
      }
    }
  }

  .categorySpan {
    top: 0;
    right: 0;
    background: #82c5ff;
    transform: translate(8px, -8px);
    border: 3px solid white;
    font-size: 1.1em;
    color: white;
    letter-spacing: 2px;
    font-weight: 400;
    padding: 2px 5px;
    position: absolute;
  }
  .imgbox {
    position: relative;
    overflow: hidden;
    .phonelinkbox {
      display: none;
    }
    .soldoutbox {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.767);
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        width: fit-content;
        transform: translate(-50%, -50%) rotate(10deg);
        font-size: 2.5em;
        color: #c50000;
        border: 4px solid #c50000;
      }
    }

    img {
      width: 100%;
      transition: 0.3s;
      box-shadow: 4px 4px 0 #dff6ff;
    }
    .linkbox {
      width: 100%;
      display: flex;
      justify-content: space-around;
      position: absolute;
      bottom: 0;
      left: 50%;
      color: white;
      transform: translate(-50%, 100%);
      visibility: hidden;
      transition: 0.3s;
      button {
        display: block;
        border: none;
        outline: none;
        width: 100%;
        padding: 0.5vh 0;
        text-align: center;
        color: white;
        background: rgba(0, 0, 0, 0.733);
        text-decoration: none;
        letter-spacing: 1.2px;
        &:hover {
          background: rgba(37, 37, 37, 0.733);
        }
      }
    }

  }
}

@media all and (max-width: 1259px) {
  .productCard {
    .imgbox{
      .soldoutbox{
        span{
          width: auto;
        }
      }
    }
    &:hover {
      .imgbox {
        img {
          transform: scale(1);
        }
      }
    }
  }

  .productCard .imgbox {
    .linkbox {
      display: none;
    }
    img {
      box-shadow: none;
    }
    .phonelinkbox {
      width: 100%;
      display: flex;
      button {
        outline: none;
        width: 100%;
        border: none;
        color: white;
        background: #82c5ff;
        padding: 4px 0;
        letter-spacing: 1.5px;
        &:first-child {
          border-right: 1px solid white;
        }
      }
    }
  }
}
</style>
