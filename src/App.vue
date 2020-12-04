<template>
  <div id="app">
    <Loading v-if ="isLoading" />
    <Alert />
    <router-view ></router-view>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import Alert from '@/components/Alert.vue';

export default {
  components: {
    Loading, Alert,
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>
<style lang="scss">
@import "~bootstrap/scss/bootstrap";
@import "./assets/scss/base/_reset.scss";
</style>
