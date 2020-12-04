<template>
  <div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="20%">購買時間</th>
          <th width="20%">Email</th>
          <th width="20%">購買款項</th>
          <th width="20%">總金額</th>
          <th width="20%">是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in OrderList" :key="item.id">
          <td>{{ item.create_at | datefilter }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <ul>
              <li v-for="product in item.products" :key="product.id">
                <p>{{ product.product.title }}:</p>
                <p>{{ product.qty }} {{ product.product.unit }}</p>
              </li>
            </ul>
          </td>
          <td>{{ item.total | currency }} 元</td>
          <td>
            <span v-if="item.is_paid" style="color: #61b861; font-weight: 600"
              >已付款</span
            >
            <span v-if="!item.is_paid" style="color: #ff7e7e; font-weight: 600"
              >未付款</span
            >
          </td>
        </tr>
      </tbody>
    </table>
    <Pagenation :pages="paginationData" @getpage="getOrder" />
  </div>
</template>

<script>
import Pagenation from '@/components/Pagenation.vue';

export default {
  components: {
    Pagenation,
  },
  data() {
    return {
      OrderList: [],
      paginationData: {},
    };
  },
  created() {
    this.getOrder();
  },
  methods: {
    getOrder(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/orders?page=${page}`;
      vm.$store.dispatch('LoadingStatus', true);
      vm.$http.get(api).then((res) => {
        vm.paginationData = res.data.pagination;
        vm.OrderList = res.data.orders;
        vm.$store.dispatch('LoadingStatus', false);
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/backend/order.scss";
</style>
