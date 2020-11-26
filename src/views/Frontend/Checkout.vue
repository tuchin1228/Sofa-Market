<template>
  <div>
    <Navbar />
    <div class="checkcontent">
      <div class="check" v-if="!orderInfo.is_paid">
        <h2>確認訂單</h2>
        <table class="ordertable">
          <thead>
            <tr>
              <th width="40%">品名</th>
              <th>單價</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderInfo.products" :key="item.id">
              <td>
                <img :src="item.product.imgUrl" :alt="item.product.title" />
                <p>
                  {{ item.product.title }}<br />數量：{{ item.qty }}
                  {{ item.product.unit }}
                </p>
              </td>
              <td>
                NT {{ item.product.price }} 元<br />
                <span v-if="item.product.price !== item.final_total" style="color: red"
                  >(已套用優惠)</span
                >
              </td>
              <td>NT {{ item.final_total }} 元</td>
            </tr>
            <tr>
              <td>總計</td>
              <td></td>
              <td>NT {{ orderInfo.total }} 元</td>
            </tr>
          </tbody>
        </table>

        <h2>訂購人資訊</h2>
        <table class="userinfo">
          <tbody>
            <tr>
              <td>Email</td>
              <td>{{ orderInfo.user.email }}</td>
            </tr>
            <tr>
              <td>姓名</td>
              <td>{{ orderInfo.user.username }}</td>
            </tr>
            <tr>
              <td>電話</td>
              <td>{{ orderInfo.user.tel }}</td>
            </tr>
            <tr>
              <td>收件人地址</td>
              <td>{{ orderInfo.user.address }}</td>
            </tr>
            <tr>
              <td>付款狀態</td>
              <td>
                <span v-if="!orderInfo.is_paid" style="color: red">尚未付款</span>
                <span v-if="orderInfo.is_paid" style="color: #00bb00">完成付款</span>
              </td>
            </tr>
          </tbody>
        </table>
        <button @click="payOrder" v-if="!orderInfo.is_paid">確認付款</button>
      </div>
      <div class="finish" v-if="orderInfo.is_paid">
        <h2>完成付款</h2>
        <table class="userinfo">
          <tbody>
            <tr>
              <td>Email</td>
              <td>{{ orderInfo.user.email }}</td>
            </tr>
            <tr>
              <td>姓名</td>
              <td>{{ orderInfo.user.username }}</td>
            </tr>
            <tr>
              <td>電話</td>
              <td>{{ orderInfo.user.tel }}</td>
            </tr>
            <tr>
              <td>收件人地址</td>
              <td>{{ orderInfo.user.address }}</td>
            </tr>
            <tr>
              <td>付款時間</td>
              <td>{{ orderInfo.paid_date | totime }}</td>
            </tr>
            <tr>
              <td>訂單金額</td>
              <td>NT {{ orderInfo.total }} 元</td>
            </tr>
          </tbody>
        </table>
        <router-link to="/">
          <button v-if="orderInfo.is_paid">繼續逛逛</button>
        </router-link>
      </div>
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
  data() {
    return {
      orderId: '',
      orderInfo: {
        user: {},
      },
    };
  },
  created() {
    this.orderId = this.$route.params.id;
    this.getorder();
  },
  methods: {
    getorder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/order/${vm.orderId}`;
      vm.$store.dispatch('LoadingStatus', true);
      vm.$http.get(api).then((res) => {
        vm.$store.dispatch('LoadingStatus', false);
        vm.orderInfo = res.data.order;
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/pay/${vm.orderId}`;

      vm.$store.dispatch('LoadingStatus', true);
      vm.$http.post(api).then(() => {
        vm.$store.dispatch('LoadingStatus', false);
        vm.getorder();
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/checkout.scss";
</style>
