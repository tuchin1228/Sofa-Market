<template>
  <div class="loginbg">
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3">會員登入</h1>
      <label for="inputEmail" class="">帳號</label>
      <input
        id="inputEmail"
        v-model="user.username"
        type="email"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
      />
      <label for="inputPassword" class="">密碼</label>
      <input
        id="inputPassword"
        v-model="user.password"
        type="password"
        class="form-control"
        placeholder="Password"
        required
      />

      <button class="btn btn-lg btn-block" type="submit">登入</button>
      <button class="btn btn-lg btn-block" type="button">
        <router-link to="/"> 回首頁 </router-link>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signin() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      vm.$store.dispatch('LoadingStatus', true);
      vm.$http.post(api, vm.user).then((res) => {
        if (res.data.success) {
          const { token } = res.data;
          const { expired } = res.data;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          vm.$store.dispatch('LoadingStatus', false);
          vm.$router.push('/dashboard/product');
        }
      });
    },
  },
};
</script>

<style scope lang="scss">
@import "@/assets/login.scss";
</style>
