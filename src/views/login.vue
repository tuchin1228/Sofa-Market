<template>
  <div class="row align-items-cente ">
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">
        會員登入
      </h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        id="inputEmail"
        v-model="user.username"
        type="email"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
      >
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        id="inputPassword"
        v-model="user.password"
        type="password"
        class="form-control"
        placeholder="Password"
        required
      >
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        登入
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
          this.$router.push('/dashboard/product');
        }
      });
    },
  },
  created() {

  },
};
</script>

<style scope lang="scss">
@import '../assets/login.scss'
</style>
