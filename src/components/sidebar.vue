<template>
  <nav class="col-md-2 d-none d-md-block bg-dark sidebar">
    <div class="sidebar-sticky">
      <h6
        class="sidebar-heading d-flex justify-content-between
       align-items-center px-3 mt-4 mb-1 "
      >
        <span>商品管理</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle" />
        </a>
      </h6>
      <ul class="nav flex-column">
        <router-link to="/dashboard/product">
          <li class="nav-item">
            <a class="nav-link" href="#" :class="{'active':nowPath=='/dashboard/product'}">
              <span data-feather="home" />
              產品列表
            </a>
          </li>
        </router-link>
        <router-link to="/dashboard/order">
          <li class="nav-item">
            <a class="nav-link" href="#" :class="{'active':nowPath=='/dashboard/order'}">
              <span data-feather="file" />
              訂單管理
            </a>
          </li>
        </router-link>
          <router-link to="/dashboard/coupon">
          <li class="nav-item">
            <a class="nav-link" href="#" :class="{'active':nowPath=='/dashboard/coupon'}">
              <span data-feather="file" />
              優惠券管理
            </a>
          </li>
        </router-link>

      </ul>

      <h6
        class="sidebar-heading d-flex justify-content-between
       align-items-center px-3 mt-4 mb-1 "
      >
        <span>前台</span>
        <a class="d-flex align-items-center text-muted" href="#">
          <span data-feather="plus-circle" />
        </a>
      </h6>
      <ul class="nav flex-column mb-2">
         <router-link to="/">
          <li class="nav-item">
            <a class="nav-link" href="#" >
              <span data-feather="file" />
              首頁
            </a>
          </li>
        </router-link>
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
};
</script>

<style scoped lang="scss">
@import '../assets/sidebar';
</style>
