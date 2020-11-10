<template>
  <div id="app">
    <Loading v-if ="isLoading" />
    <Alert />
    <router-view></router-view>
  </div>
</template>

<script>
import 'animate.css';
import Loading from './components/loading.vue';
import Alert from './components/alert.vue';

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
@import "./assets/main.scss";
</style>
