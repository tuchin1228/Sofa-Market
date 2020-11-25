<template>
  <div>
    <div class="text-right">
      <button class="btn btn-primary" @click="openModal(false)">
        新增優惠券
      </button>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>優惠碼</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in AllCoupon" :key="index">
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.due_date }}</td>
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
              @click="opendeleteModal(item)"
            >
              刪除
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagenation :pages="paginationData" @getpage="getCoupon" />
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background: #90caff; color: white">
            <h5 class="modal-title" id="exampleModalLabel">設定優惠券</h5>
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
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="tempCoupon.title"
                placeholder="請輸入標題"
              />
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="coupon_code"
                v-model="tempCoupon.code"
                placeholder="請輸入優惠碼"
              />
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input
                type="date"
                class="form-control"
                id="due_date"
                v-model="tempCoupon.due_date"
              />
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input
                min="1"
                max="99"
                type="number"
                class="form-control"
                id="price"
                v-model="tempCoupon.percent"
                placeholder="請輸入折扣百分比"
              />
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled"
                  id="is_enabled"
                />
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">
              更新優惠券
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除優惠券</span>
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
            <strong class="text-danger">{{ tempCoupon.title }}</strong>
            (刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon">
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
import Pagenation from '@/components/Pagenation.vue';

export default {
  data() {
    return {
      isEdit: false,
      tempCoupon: {
        title: '',
        is_enabled: '',
        percent: '',
        due_date: '',
        code: '',
      },
      AllCoupon: [],
      tempdelete: '',
      paginationData: {},
    };
  },
  components: {
    Pagenation,
  },
  created() {
    this.getCoupon();
  },
  methods: {
    getCoupon(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/coupons?page=${page}`;
      vm.$store.dispatch('LoadingStatus', true);
      vm.$http.get(api).then((res) => {
        vm.AllCoupon = res.data.coupons;
        vm.paginationData = res.data.pagination;
        vm.$store.dispatch('LoadingStatus', false);
      });
    },
    openModal(Edit, item) {
      const vm = this;
      vm.isEdit = Edit;
      if (vm.isEdit === true) {
        vm.tempCoupon = { ...item };
      } else {
        vm.tempCoupon = {};
      }

      $('#couponModal').modal('show');
    },
    updateCoupon() {
      const vm = this;
      let httpMethod = 'put';
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/coupon/${vm.tempCoupon.id}`;
      if (vm.tempCoupon.percent >= 1 || vm.tempCoupon.percent <= 99) {
        if (vm.isEdit === false) {
          httpMethod = 'post';
          api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/coupon`;
          const timecode = Math.floor(new Date(vm.tempCoupon.due_date) / 1000);
          vm.tempCoupon.due_date = timecode;
        }

        vm.$http[httpMethod](api, { data: vm.tempCoupon }).then(() => {
          $('#couponModal').modal('hide');
          vm.getCoupon();
        });
      }
    },
    opendeleteModal(item) {
      this.tempCoupon = item;

      $('#delCouponModal').modal('show');
    },
    deleteCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_USERPATH}/admin/coupon/${this.tempCoupon.id}`;
      vm.$http.delete(api).then(() => {
        $('#delCouponModal').modal('hide');

        vm.getCoupon();
      });
    },
  },
};
</script>
