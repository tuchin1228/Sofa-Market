<template>
  <div>
    <Dashboardnavbar />
    <main class="container ml-sm-auto p-4">
      <router-view />
    </main>
  </div>
</template>

<script>
import Dashboardnavbar from '@/components/Dashboardnavbar.vue';

export default {
  components: {
    Dashboardnavbar,
  },

  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    this.$http.defaults.headers.common.Authorization = `${token}`;
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/dashboard.scss";
</style>
