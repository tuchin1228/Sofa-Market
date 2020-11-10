<template>
  <div>
    <Navbar />
    <main  class="container  ml-sm-auto p-4">
      <router-view />
    </main>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../components/dashboardnavbar.vue';

export default {
  components: {
    Navbar,
  },

  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = `${token}`;
  },
};
</script>

<style scoped lang="scss">
@import '../assets/dashboard.scss';
</style>
