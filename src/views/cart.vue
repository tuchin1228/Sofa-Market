<template>
  <div>
    <Navbar />
    <div class="cartcontent">
      <h2>購物車</h2>
      <table>
        <tr>
          <th width="30%">品名</th>
          <th>單價</th>
          <th>小計</th>
          <th>刪除</th>
        </tr>

        <tr v-for="item in CartContent.carts" :key="item.id">
          <td>
            <img :src="item.product.imgUrl" alt="" />
            <p>
              {{ item.product.title }}<br />數量：{{ item.qty }}
              {{ item.product.unit }}
            </p>
          </td>
          <td>
            NT {{ item.product.price }} 元<br />
            <span v-if="item.total !== item.final_total" style="color: red"
              >(以套用優惠)</span
            >
          </td>
          <td>NT {{ item.final_total }} 元</td>
          <td>
            <button
              class="deleteCart"
              @click="deleteCartProduct(item.id, item.product.title)"
            >
              刪除
            </button>
          </td>
        </tr>
        <tr v-if="CartContent.carts.length == 0">
          <td colspan="4" style="display: table-cell">購物車沒有東西!</td>
        </tr>
        <tr>
          <td>總 計</td>
          <td></td>
          <td>NT {{ CartContent.total }} 元</td>
          <td></td>
        </tr>
      </table>

      <h2>訂購人資訊</h2>

      <validation-observer v-slot="{ invalid }">
        <div class="form">
          <div class="inputbox leftinput">
            <validation-provider rules="required" v-slot="{ errors, classes }">
              <div class="textbox">

                <label for="username">收件人姓名</label>
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

                <label for="tel">收件人電話</label>
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

                <label for="address">收件人地址</label>
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
            <validation-provider
              rules="required|email"
              v-slot="{ errors, classes }"
            >
              <div class="textbox">

                <label for="email">Email</label>
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
            <validation-provider
              :rules="{ required: false }"
              v-slot="{ errors, classes }"
            >
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
            </tr>
            <tr>
              <td>coupon50</td>
              <td>50</td>
            </tr>
            <tr>
              <td>coupon80</td>
              <td>80</td>
            </tr>
            <tr>
              <td>coupon90</td>
              <td>90</td>
            </tr>
          </table>
          <div class="sale" v-if="final_price">
            <p>原價{{ CartContent.total }}元</p>
            <h3>優惠價 {{ final_price }} 元</h3>
          </div>

          <router-link class="btnbox" to="/categorylist" v-if="!final_price">
            <button>再去逛逛</button>
          </router-link>
          <div class="btnbox">
            <button @click="goCheckout">結帳去</button>
          </div>
          <p class="nosale">(不使用可直接結帳)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/navbar.vue';

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
    };
  },
  components: {
    Navbar,
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
      this.$http.post(api, { data: couponcode }).then((res) => {
        if (res.data.success) {
          this.$store.dispatch('showalerts', {
            isShow: true,
            type: 'success',
            content: '以套用優惠券',
          });
          vm.$store.dispatch('LoadingStatus', false);
          vm.final_price = res.data.data.final_total;
        } else {
          vm.$store.dispatch('LoadingStatus', false);
          this.$store.dispatch('showalerts', {
            isShow: true,
            type: 'danger',
            content: res.data.message,
          });
        }
      });
    },
    submitInfo() {
      if (this.CartContent.carts.length === 0) {
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
          this.$router.push(`/checkout/${res.data.orderId}`);
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.cartcontent {
  padding: 80px 0;
  width: 1240px;
  margin: 1vh auto;
  > h2 {
    text-align: center;
    margin: 5vh 0 0 0;
    font-size: 2em;
    font-weight: 600;
    color: rgb(42, 42, 42);
    letter-spacing: 1.5px;
  }
  > table {
    margin: 2vh 0 3vh 0;
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    tr {
      th {
        text-align: center;
        font-size: 1.2em;
        font-weight: 500;
        padding: 5px 0;
        color: white;
        background: rgb(150, 199, 255);
      }
      td {
        text-align: center;
        padding: 10px 0;
        border-bottom: 1px solid rgb(150, 199, 255);
        &:first-child {
          display: flex;
          align-items: flex-start;
          justify-content: left;
          img {
            width: 150px;
          }
          p {
            text-align: left;
            padding: 0 5px;
            font-size: 1.2em;
            letter-spacing: 1.5px;
            font-weight: 300;
            color: rgb(61, 61, 61);
          }
        }
        button.deleteCart {
          outline: none;
          background: #ff6262;
          border: none;
          color: white;
          padding: 3px 8px;
          letter-spacing: 2px;
          font-weight: 300;
          border-radius: 5px;
          transition: 0.3s;
          box-shadow: 2px 2px 0 #c77474;
          &:hover {
            transform: translate(2px, 2px);
            background: #ff7e7e;
          }
        }
      }
    }
  }

  .form {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    width: 600px;
    margin: 0 auto;

    .inputbox {
      margin: 1vh 1vw;
      flex: 1;
      .textbox {
        margin: 2vh 0;
      }
      input {
        padding: 5px;
        border-radius: 5px;
        transition: 0.3s;
        border: 1px solid #d8d8d8;
      }
    }
    button {
      margin-top: 1.5vh;
      display: block;
      width: 100%;
      border: none;
      background: #96c7ff;
      color: white;
      padding: 5px 0;
      width: 95%;
      transition: 0.3s;
      &:hover {
        background: #a8d0ff;
        transform: translate(2px, 2px);
      }
      &[disabled] {
        box-shadow: none;
        background: gray;
      }
      &[disabled]:hover {
        transform: none;
      }
    }
  }

  .couponDialog {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 1002;
    height: 100%;
    .bg {
      width: 100%;
      height: 100%;
      background: #8c8c8c75;
    }
    .dialog {
      position: absolute;
      width: 500px;
      border-radius: 10px;
      padding: 1vh 1vw;
      box-shadow: 6px 6px 15px #5656563d;
      background: white;
      height: 400px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      a {
        display: block;
      }
      h2 {
        text-align: center;
        letter-spacing: 1.5px;
        font-size: 1.5em;
        margin: 1vh 0;
      }
      .flb {
        display: flex;
        justify-content: center;
        input {
          padding: 5px;
          border-radius: 5px;
          border: 1px solid #d8d8d8;
        }
        button {
          margin: 0 10px;
          outline: none;
          background: #5b9aff;
          border: none;
          color: white;
          padding: 3px 8px;
          letter-spacing: 2px;
          font-weight: 300;
          border-radius: 5px;
          transition: 0.3s;
          box-shadow: 2px 2px 0 #abd7ff;
          &:hover {
            transform: translate(2px, 2px);
          }
        }
      }

      table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        margin-top: 2vh;
        tr {
          td {
            padding: 3px 0;
            text-align: center;
            color: #5d5d5d;
            font-weight: 300;
            font-size: 1.1em;
            border-bottom: 1px solid rgb(136, 192, 255);
            border-right: 1px solid rgb(136, 192, 255);
            &:first-child {
              border-left: 1px solid rgb(136, 192, 255);
            }
          }
          &:first-child td {
            background: rgb(150, 199, 255);
            color: white;
            border-top: 1px solid rgb(136, 192, 255);
          }
        }
      }
      .sale {
        p {
          margin: 1vh 0;
          text-align: center;
          font-size: 1em;
          color: rgb(93, 93, 93);
          text-decoration: line-through;
        }
        h3 {
          text-align: center;
          font-size: 1.4em;
          font-weight: 500;
          margin: 0;
          color: red;
        }
      }

      .btnbox {
        margin-top: 1.5vh;
        button {
          width: 100%;
          outline: none;
          border: none;
          padding: 5px 0;
          background: #96c7ff;
          color: white;
          letter-spacing: 1.5px;
          font-size: 1.1em;
          transition: 0.3s;
          &:hover {
            background: #a8d1ff;
          }
        }
      }
      > p.nosale {
        text-align: center;
        letter-spacing: 1.5px;
        color: rgb(121, 121, 121);
      }
    }
  }
}

@media all and (max-width: 767px) {
  .cartcontent {
    width: 98%;
    table {
      tr {
        td {
          &:first-child {
            flex-direction: column;
            img {
              width: 120px;
            }
            p {
              font-size: 1em;
            }
          }
        }
      }
    }
    .couponDialog {
      .dialog {
        width: 95%;
        .flb {
          input {
            flex: 4;
          }
          button {
            flex: 1;
          }
        }
      }
    }
    .form {
      width: 100%;
    }
  }
}
@media all and (max-width: 1259px) and (min-width: 768px) {
  .cartcontent {
    width: 98%;
    table {
      tr {
        td {
          &:first-child {
            align-items: center;
            flex-direction: column;
          }
        }
      }
    }
    .couponDialog {
      .flb {
        input {
          flex: 4;
        }
        button {
          flex: 1;
        }
      }
    }
  }
}
</style>
