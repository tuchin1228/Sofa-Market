<template>
  <div class="productCard animate__animated animate__fadeIn">
    <router-link :to="{ name: 'ProductInfo', params: { productid: productInfo.id } }">
      <div class="imgbox">
        <img :src="productInfo.imgUrl" :alt="productInfo.title" />
        <div class="soldoutbox" v-if="!productInfo.is_enabled">
          <span class="soldout">已完售</span>
        </div>
        <div class="linkbox">
          <button
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
      <router-link :to="{ name: 'ProductInfo', params: { productid: productInfo.id } }">
        <p>
          {{ productInfo.title }} <br />
          NT.{{ productInfo.price | currency }}
        </p></router-link
      >
      <div class="right">
        <div class="favor" @click="setLocalStorage(productInfo.id)">
          <i class="fas fa-heart" v-if="checkfavor(productInfo.id)"></i>
          <i class="far fa-heart" v-else></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['productInfo'],
  data() {
    return {
      favor: [],
      previewData: {},
    };
  },
  computed: {
    CartContent() {
      return this.$store.getters.CartContent;
    },
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
      const same = this.CartContent.carts.filter((item) => item.product_id === id);
      if (same.length === 0) {
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
      } else {
        const alertInfo = {
          isShow: true,
          type: 'success',
          content: `${ProductTitle} 更改數量`,
        };
        const originQty = same[0].qty;
        const oldId = same[0].id;
        const newQty = originQty + 1;
        const cartproduct = {
          product_id: id,
          qty: newQty,
        };
        this.$store.dispatch('changeCartQty', { oldId, cartproduct, alertInfo });
      }
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
        vm.$store.dispatch('showalerts', {
          isShow: true,
          type: 'success',
          content: '成功加入願望',
        });
        OldData.push(id);
      } else if (Object.values(OldData).indexOf(id) !== -1) {
        OldData.splice(Object.values(OldData).indexOf(id), 1);
        vm.$emit('sendremoveID', id);
        vm.$store.dispatch('showalerts', {
          isShow: true,
          type: 'success',
          content: '成功移除願望',
        });
      } else if (Object.values(OldData).length === 6) {
        vm.$store.dispatch('showalerts', {
          isShow: true,
          type: 'danger',
          content: '願望清單最多6筆',
        });
      } else if (Object.values(OldData).indexOf(id) === -1) {
        OldData.push(id);
        vm.$store.dispatch('showalerts', {
          isShow: true,
          type: 'success',
          content: '成功加入願望',
        });
      }
      localStorage.setItem('id', JSON.stringify(OldData));
      vm.$store.dispatch('getLocalStorage');
      vm.favor = OldData;
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/components/productCard.scss";
</style>
