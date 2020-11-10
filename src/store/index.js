import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    Allproducts: [],
    Category: [],
    CartContent: [],
    isLoading: false,
    Alert: {
      isShow: false,
      type: '',
      content: '',
    },
    LocalId: [],
  },
  mutations: {
    setProduct(state, payload) {
      state.products = payload;
    },
    setAllProduct(state, payload) {
      state.Allproducts = payload;
    },
    setCategory(state, payload) {
      state.Category = payload;
    },
    setCartContent(state, payload) {
      state.CartContent = payload;
    },
    setLoadingStatus(state, payload) {
      state.isLoading = payload;
    },
    setAlert(state, payload) {
      state.Alert = payload;
    },
    setLocalId(state, payload) {
      state.LocalId = payload;
    },
  },
  actions: {
    LoadingStatus({ commit }, status) {
      commit('setLoadingStatus', status);
    },
    getProduct({ commit }, page = 1) {
      commit('setLoadingStatus', true);
      axios.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/products?page=${page}`).then(
        (res) => {
          commit('setProduct', res.data);
          commit('setLoadingStatus', false);
        },
      );
    },
    getAll({ commit }) {
      commit('setLoadingStatus', true);
      axios.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/products/all`).then(
        (res) => {
          commit('setAllProduct', res.data);
          return res.data;
        },
      ).then((data) => {
        const temparr = data.products;
        const set = new Set();
        const result = temparr.filter(
          (item) => (!set.has(item.category) ? set.add(item.category) : false),
        );
        commit('setCategory', result);
        commit('setLoadingStatus', false);
      });
    },
    getCart({ commit }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`;
      commit('setLoadingStatus', true);
      axios.get(api).then((res) => {
        commit('setCartContent', res.data.data);
        commit('setLoadingStatus', false);
      });
    },
    addToCart(context, { cartcontent, alertInfo }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart`;
      context.commit('setLoadingStatus', true);
      axios.post(api, { data: cartcontent }).then(() => {
        context.commit('setLoadingStatus', false);
        context.dispatch('showalerts', alertInfo);
        context.dispatch('getCart');
      });
    },
    removeFromCart(context, { id, alertInfo }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/cart/${id}`;
      context.commit('setLoadingStatus', true);
      axios.delete(api).then(() => {
        context.commit('setLoadingStatus', false);
        context.dispatch('showalerts', alertInfo);
        context.dispatch('getCart');
      });
    },
    showalerts({ commit }, payload) {
      commit('setAlert', payload);
      setTimeout(() => {
        commit('setAlert', { isShow: false });
      }, 3000);
    },
    getLocalStorage({ commit }) {
      const favoriteID = JSON.parse(localStorage.getItem('id'));
      commit('setLocalId', favoriteID);
    },
  },
  modules: {
  },
  getters: {
    products: (state) => state.products,
    Allproducts: (state) => state.Allproducts,
    Category: (state) => state.Category,
    CartContent: (state) => state.CartContent,
    isLoading: (state) => state.isLoading,
    Alert: (state) => state.Alert,
    LocalId: (state) => state.LocalId,
  },
});
