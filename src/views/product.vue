<template>
  <div>
    <div class="text-right">
      <button class="btn btn-primary" @click="openModal(false)">
        建立新產品
      </button>
    </div>
    <table class="table mt-4">
      <tr>
        <th width="15%">分類</th>
        <th width="35%">產品名稱</th>
        <th width="10%">原價</th>
        <th width="10%">售價</th>
        <th width="15%">是否啟用</th>
        <th width="15%">編輯</th>
      </tr>
      <tr v-for="item in productList" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.origin_price | currency }}</td>
        <td>{{ item.price | currency }}</td>
        <td>
          <span v-if="item.is_enabled" class="text-success">啟用</span>
          <span v-if="!item.is_enabled" class="text-danger">未啟用</span>
        </td>
        <td>
          <button
            class="btn btn-warning btn-sm mx-1"
            @click="openModal(true, item)"
          >
            編輯
          </button>
          <button
            class="btn btn-danger btn-sm"
            @click="opendeleteModal(item.id)"
          >
            刪除
          </button>
        </td>
      </tr>
    </table>
    <Page :pages="paginationData" @getpage="getProduct" />
    <div
      id="productModal"
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header  text-white" style="background:#99cfff">
            <h5 id="exampleModalLabel" class="modal-title">
              <span>新增產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    id="image"
                    v-model="tempProduct.imgUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile"
                    >或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="uploadstatus" />
                  </label>
                  <input
                    id="customFile"
                    ref="files"
                    type="file"
                    class="form-control"
                    @change="uploadFile"
                  />
                </div>
                <img
                  :src="tempProduct.imgUrl"
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="img-fluid"
                  alt=""
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    id="title"
                    v-model="tempProduct.title"
                    type="text"
                    class="form-control"
                    placeholder="請輸入標題"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      id="category"
                      v-model="tempProduct.category"
                      type="text"
                      class="form-control"
                      placeholder="請輸入分類"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      id="unit"
                      v-model="tempProduct.unit"
                      type="unit"
                      class="form-control"
                      placeholder="請輸入單位"
                    />
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      id="origin_price"
                      v-model="tempProduct.origin_price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入原價"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      id="price"
                      v-model="tempProduct.price"
                      type="number"
                      class="form-control"
                      placeholder="請輸入售價"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    id="description"
                    v-model="tempProduct.desc"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品描述"
                  />
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    id="content"
                    v-model="tempProduct.content"
                    type="text"
                    class="form-control"
                    placeholder="請輸入產品說明內容"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      class="form-check-input"
                      type="checkbox"
                    />
                    <label
                      class="form-check-label"
                      for="is_enabled"
                      :true-value="1"
                      :false-value="0"
                    >
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="submitProduct"
            >
              送出
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteProduct()"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Page from '../components/pagenation.vue';

export default {
  components: {
    Page,
  },
  data() {
    return {
      isEdit: false,
      tempProduct: {
        title: '',
        category: '',
        unit: '',
        origin_price: '',
        price: '',
        desc: '',
        content: '',
        imgUrl: '',
        is_enabled: false,
      },
      uploadstatus: false,
      tempdelete: '',
    };
  },
  computed: {
    productList() {
      return this.$store.getters.products.products;
    },
    paginationData() {
      return this.$store.getters.products.pagination;
    },
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct(page = 1) {
      this.$store.dispatch('getProduct', page);
    },
    openModal(Edit, item) {
      const vm = this;
      vm.isEdit = Edit;
      if (vm.isEdit === true) {
        vm.tempProduct = item;
      } else {
        vm.tempProduct = {};
      }

      $('#productModal').modal('show');
    },
    opendeleteModal(id) {
      $('#delProductModal').modal('show');
      this.tempdelete = id;
    },
    uploadFile() {
      const uploadfile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append('file-to-upload', uploadfile);
      vm.uploadstatus = true;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/upload`;
      vm.$http
        .post(api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          vm.uploadstatus = false;
          vm.$set(vm.tempProduct, 'imgUrl', res.data.imageUrl);
        });
    },
    submitProduct() {
      const vm = this;
      let httpmethod = 'post';
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/product`;
      if (vm.isEdit === true) {
        httpmethod = 'put';
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/product/${vm.tempProduct.id}`;
      }
      vm.$http[`${httpmethod}`](api, { data: vm.tempProduct }).then((res) => {
        if (res.data.success) {
          $('#productModal').modal('hide');
          vm.$store.dispatch('getProduct');
        }
      });
    },
    deleteProduct() {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/product/${this.tempdelete}`;
      this.$http.delete(api).then((res) => {
        if (res.data.success) {
          $('#delProductModal').modal('hide');
          this.$store.dispatch('getProduct');
        }
      });
    },
  },
};
</script>

<style>
</style>
