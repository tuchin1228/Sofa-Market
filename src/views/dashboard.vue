<template>
  <div>
    <Navbar />
    <main  class="container  ml-sm-auto p-4">
      <router-view />
    </main>
  </div>
</template>

<script>

import Navbar from '../components/dashboardnavbar.vue';

export default {
  components: {
    Navbar,
  },

  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = `${token}`;
  },
};
</script>

<style scoped lang="scss">
@import '../assets/dashboard.scss';
main{
  box-shadow: 0px 10px 10px #f1f1f1;
}
</style>
