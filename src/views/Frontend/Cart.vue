<template>
  <div>
    <Navbar />
    <div class="cartcontent">
      <h2><span>購</span>物車</h2>
      <table>
        <thead>
          <tr>
            <th width="40%">品名</th>
            <th width="15%">數量</th>
            <th>小計</th>
            <th width="20%">刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in CartContent.carts" :key="item.id">
            <td>
              <img :src="item.product.imgUrl" :alt="item.product.title" />
              <p>
                {{ item.product.title }}<br />單價：${{ item.product.price }}元
              </p>
            </td>

            <td>
              <div class="selectCount">
                <button
                  @click="
                    calculateProductCount(
                      'less',
                      item.qty,
                      item.id,
                      item.product.id,
                      item.product.title
                    )
                  "
                >
                  -
                </button>
                <span>{{ item.qty }}</span
                ><button
                  @click="
                    calculateProductCount(
                      'add',
                      item.qty,
                      item.id,
                      item.product.id,
                      item.product.title
                    )
                  "
                >
                  +
                </button>
              </div>
              <div class="phoneselect">
                <select
                  name=""
                  id=""
                  v-model="item.qty"
                  @change="
                    calculateProductCount(
                      'select',
                      item.qty,
                      item.id,
                      item.product.id,
                      item.product.title
                    )
                  "
                >
                  <option :value="count" v-for="count in 10" :key="count">
                    {{ count }}
                  </option>
                </select>
              </div>
            </td>
            <td>${{ item.final_total }} 元</td>
            <td>
              <button class="deleteCart" @click="deleteCartProduct(item.id, item.product.title)">
                刪除
              </button>
            </td>
          </tr>
          <tr v-if="CartContent.carts && CartContent.carts.length === 0">
            <td colspan="5" style="display: table-cell">
              購物車沒有東西! <br /><router-link to="/categorylist">立即選購</router-link>
            </td>
          </tr>
          <tr>
            <td>總 計</td>
            <td></td>
            <td>$ {{ CartContent.total }} 元</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <h2><span>訂</span>購人資訊</h2>

      <validation-observer v-slot="{ invalid }">
        <div class="form">
          <div class="inputbox leftinput">
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="textbox">
                <label for="username">收件人姓名*</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  v-model="order.user.username"
                  class="form-control"
                  :class="classes"
                  placeholder="輸入姓名"
                />

                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
            <validation-provider
              :rules="{ required: true, regex: /^[09]{2}[0-9]{8}$/ }"
              v-slot="{ classes }"
            >
              <div class="textbox">
                <label for="tel">收件人電話*</label>
                <input
                  id="tel"
                  type="text"
                  name="tel"
                  v-model="order.user.tel"
                  class="form-control"
                  :class="classes"
                  placeholder="輸入十碼手機號碼"
                />

                <span class="invalid-feedback">輸入十碼手機號碼</span>
              </div>
            </validation-provider>
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="textbox">
                <label for="address">收件人地址*</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  v-model="order.user.address"
                  class="form-control"
                  :class="classes"
                  placeholder="輸入地址"
                />

                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
          </div>

          <div class="inputbox rightinput">
            <validation-provider rules="required|email" v-slot="{ errors, classes }">
              <div class="textbox">
                <label for="email">Email*</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  v-model="order.user.email"
                  class="form-control"
                  :class="classes"
                  placeholder="輸入信箱"
                />

                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
            <validation-provider :rules="{ required: false }" v-slot="{ errors, classes }">
              <div class="textbox">
                <label for="message">備註</label>
                <input
                  id="message"
                  type="text"
                  name="message"
                  v-model="order.message"
                  class="form-control"
                  :class="classes"
                  placeholder="特殊需求"
                />

                <span class="invalid-feedback">{{ errors[0] }}</span>
              </div>
            </validation-provider>
          </div>
          <button :disabled="invalid" @click="submitInfo">送出</button>
        </div>
      </validation-observer>

      <div class="couponDialog" v-if="showCouponDialog">
        <div class="bg"></div>
        <div class="dialog">
          <h2>使用優惠券</h2>
          <div class="flb">
            <input type="text" placeholder="輸入優惠碼" v-model="couponcode" />
            <button @click="useCoupon(couponcode)">套用</button>
          </div>

          <table>
            <tr>
              <td>名稱</td>
              <td>折數</td>
              <td>使用</td>
            </tr>
            <tr>
              <td><span id="coupon50">coupon50</span></td>
              <td>五折</td>
              <td><button @click="copycoupon('coupon50')">Copy</button></td>
            </tr>
            <tr>
              <td><span id="coupon80">coupon80</span></td>
              <td>八折</td>
              <td><button @click="copycoupon('coupon80')">Copy</button></td>
            </tr>
            <tr>
              <td><span id="coupon90">coupon90</span></td>
              <td>九折</td>
              <td><button @click="copycoupon('coupon90')">Copy</button></td>
            </tr>
          </table>

          <div class="sale" v-if="final_price">
            <p>原價{{ CartContent.total }}元</p>
            <h3>優惠價 {{ final_price }} 元</h3>
          </div>
          <div class="ischeckout">
            <router-link class="btnbox" to="/categorylist" v-if="!final_price">
              <button>再去逛逛</button>
            </router-link>
            <div class="btnbox">
              <button @click="goCheckout">結帳去</button>
              <p class="nosale" v-if="!final_price">(不使用可直接結帳)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  data() {
    return {
      order: {
        user: {
          username: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      couponcode: '',
      final_price: '',
      showCouponDialog: false,
      ProductCount: 1,
    };
  },
  components: {
    Navbar,
    Footer,
  },
  computed: {
    CartContent() {
      return this.$store.getters.CartContent;
    },
  },
  created() {
    this.$store.dispatch('getCart');
  },
  methods: {
    copycoupon(id) {
      const TextRange = document.createRange();
      TextRange.selectNode(document.getElementById(id));
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(TextRange);
      document.execCommand('copy');
      const alertInfo = {
        isShow: true,
        type: 'success',
        content: '已複製優惠券',
      };
      this.$store.dispatch('showalerts', alertInfo);
    },
    calculateProductCount(key, qty, oldId, id, title) {
      if (key === 'add' && qty < 10) {
        const alertInfo = {
          isShow: true,
          type: 'success',
          content: `${title} 更改數量`,
        };
        const newQty = qty + 1;
        const cartproduct = {
          product_id: id,
          qty: newQty,
        };
        this.$store.dispatch('changeCartQty', { oldId, cartproduct, alertInfo });
      } else if (key === 'less' && qty > 1) {
        const alertInfo = {
          isShow: true,
          type: 'success',
          content: `${title} 更改數量`,
        };
        const newQty = qty - 1;
        const cartproduct = {
          product_id: id,
          qty: newQty,
        };
        this.$store.dispatch('changeCartQty', { oldId, cartproduct, alertInfo });
      } else if (key === 'select') {
        const alertInfo = {
          isShow: true,
          type: 'success',
          content: `${title} 更改數量`,
        };
        const newQty = qty;
        const cartproduct = {
          product_id: id,
          qty: newQty,
        };
        this.$store.dispatch('changeCartQty', { oldId, cartproduct, alertInfo });
      }
    },
    deleteCartProduct(id, ProductTitle) {
      const alertInfo = {
        isShow: true,
        type: 'success',
        content: `從購物車移除 ${ProductTitle}`,
      };
      this.$store.dispatch('removeFromCart', { id, alertInfo });
    },
    useCoupon(code) {
      const vm = this;
      const couponcode = {
        code,
      };
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/coupon`;

      vm.$store.dispatch('LoadingStatus', true);
      vm.$http.post(api, { data: couponcode }).then((res) => {
        if (res.data.success) {
          vm.$store.dispatch('showalerts', {
            isShow: true,
            type: 'success',
            content: '以套用優惠券',
          });
          vm.$store.dispatch('LoadingStatus', false);
          vm.final_price = res.data.data.final_total;
        } else {
          vm.$store.dispatch('LoadingStatus', false);
          vm.$store.dispatch('showalerts', {
            isShow: true,
            type: 'danger',
            content: res.data.message,
          });
        }
      });
    },
    submitInfo() {
      if (this.CartContent.carts && this.CartContent.carts.length === 0) {
        this.$store.dispatch('showalerts', {
          isShow: true,
          type: 'danger',
          content: '購物車沒有東西',
        });
        return;
      }

      this.showCouponDialog = true;
    },
    goCheckout() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/order`;
      vm.$store.dispatch('LoadingStatus', true);
      vm.$http.post(api, { data: vm.order }).then((res) => {
        if (res.data.success) {
          vm.$store.dispatch('LoadingStatus', false);
          vm.$router.push(`/checkout/${res.data.orderId}`);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/frontend/cart.scss";
</style>
