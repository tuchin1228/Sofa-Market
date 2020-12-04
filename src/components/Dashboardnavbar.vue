<template>
  <nav class="container navbar navbar-expand-lg rounded">
    <a href="#">後台管理</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExample09"
      aria-controls="navbarsExample09"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <i class="fas fa-align-justify"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarsExample09">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link
            to="/dashboard/product"
            class="nav-link"
            :class="{ active: nowPath == '/dashboard/product' }"
            >產品列表</router-link
          >
        </li>
        <li class="nav-item active">
          <router-link
            to="/dashboard/order"
            class="nav-link"
            :class="{ active: nowPath == '/dashboard/order' }"
            >訂單管理</router-link
          >
        </li>
        <li class="nav-item active">
          <router-link
            to="/dashboard/coupon"
            class="nav-link"
            :class="{ active: nowPath == '/dashboard/coupon' }"
            >優惠券管理</router-link
          >
        </li>
        <li class="nav-item active">
          <router-link class="nav-link" to="/">前台</router-link>
        </li>
        <li class="nav-item active">
          <a class="nav-link" href="#" @click="signout">登出</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      nowPath: '',
    };
  },
  watch: {
    $route(to) {
      this.nowPath = to.fullPath;
    },
  },
  created() {
    this.nowPath = this.$route.fullPath;
  },
  methods: {
    signout() {
      const api = `${process.env.VUE_APP_APIPATH}/logout`;
      this.$http.post(api).then((res) => {
        if (res.data.success) {
          this.$router.push('/login');
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/components/dashboardnavbar.scss";
</style>
