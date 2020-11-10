<template>
  <div>
    <Navbar />
    <div class="checkcontent">
      <h2>確認訂單</h2>
      <table class="ordertable">
        <tr>
          <th width="30%">品名</th>
          <th>單價</th>
          <th>小計</th>
        </tr>

        <tr v-for="item in orderInfo.products" :key="item.id">
          <td>
            <img :src="item.product.imgUrl" alt="" />
            <p>
              {{ item.product.title }}<br />數量：{{ item.qty }}
              {{ item.product.unit }}
            </p>
          </td>
          <td>
            NT {{ item.product.price }} 元<br />
            <span
              v-if="item.product.price !== item.final_total"
              style="color: red"
              >(以套用優惠)</span
            >
          </td>
          <td>NT {{ item.final_total }} 元</td>
        </tr>
        <tr>
          <td>總計</td>
          <td></td>
          <td>NT {{ orderInfo.total }} 元</td>
        </tr>
      </table>
      <h2>訂購人資訊</h2>
      <table class="userinfo">
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
            <span v-if="orderInfo.is_paid" style="color: #00bb00"
              >完成付款</span
            >
          </td>
        </tr>
      </table>
      <button @click="payOrder" v-if="!orderInfo.is_paid">確認付款</button>
      <router-link to="/">
        <button v-if="orderInfo.is_paid">繼續逛逛</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/navbar.vue';

export default {
  components: {
    Navbar,
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
      this.$http.get(api).then((res) => {
        vm.$store.dispatch('LoadingStatus', false);
        vm.orderInfo = res.data.order;
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/pay/${vm.orderId}`;

      vm.$store.dispatch('LoadingStatus', true);
      this.$http.post(api).then(() => {
        vm.$store.dispatch('LoadingStatus', false);
        vm.getorder();
      });
    },
  },
};
</script>

<style scoped lang="scss" >
.checkcontent {
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
  table.ordertable {
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
  table.userinfo {
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
        letter-spacing: 1.5px;
        font-size: 1.1em;
        padding: 10px 5px;
        border-bottom: 1px solid rgb(150, 199, 255);

        &:last-child {
          text-align: left;
        }
      }
    }
  }
  a {
    text-decoration: none;
  }
  button {
    display: block;
    width: 100%;
    border: none;
    padding: 5px 0;
    letter-spacing: 1px;
    font-size: 1.2em;
    background: #96c7ff;
    box-shadow: 3px 3px 0 #86aab5;
    color: white;
    transition: 0.3s;
    &:hover {
      background: #b8d9ff;
      box-shadow: 3px 3px 0 transparent;
      transform: translate(2px, 2px);
    }
  }
}

@media all and (max-width: 767px) {
  .checkcontent {
    width: 98%;
    max-width: 675px;
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
    button {
      width: 95%;
      margin: 1vh auto;
    }
  }
}

@media all and (max-width: 1259px) and (min-width: 768px) {
  .checkcontent {
    width: 98%;
    max-width: 1024px;
    table {
      tr {
        th{
          width: 40%;
        }
        td {
          &:first-child {
            flex-wrap: wrap;
          }
        }
      }
    }
  }
}
</style>
