<template>
  <div class="container content">
    <h2 class="text-center">優惠券</h2>
    <div class="text-end mt-4">
      <button @click="openModal('new')" class="btn btn-primary">
        建立新的商品
      </button>
    </div>
    <!-- 訂單列表 -->
    <table class="table align-middle mt-4">
      <thead>
        <tr>
          <th width="5%">順序</th>
          <th width="8%">優惠券編號</th>
          <th width="9%">優惠券名稱</th>
          <th width="10%">優惠券代碼</th>
          <th width="7%">折扣率</th>
          <th width="10%">優惠券到期日</th>
          <th class="text-end" width="9%">啟用狀態</th>
          <th width="12%"></th>
        </tr>
      </thead>
      <tbody>
        <tr class="align-middle" v-for="item in coupons" :key="item.id">
          <td>{{ item.num }}</td>
          <td>{{ item.id }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td class="text-end">
            <span v-if="item.is_enabled" class="text-success fw-bold"
              >啟用</span
            >
            <span v-else>未啟用</span>
          </td>
          <td class="text-end">
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', item)"
              >
                修改
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center mt-5">
      <Pagination :page="pagination" @get-page="getCoupon"></Pagination>
    </div>

    <!-- Modal -->
    <AdminCouponModal
      ref="adminModal"
      :props-coupon="tempCoupon"
      @update-coupon="updateCoupon"
    ></AdminCouponModal>
    <!-- 刪除按鈕彈出 Modal -->
    <DelCouponModal
      ref="adminDelModal"
      :props-coupon="tempCoupon"
      @delete-coupon="deleteCoupon"
    ></DelCouponModal>
  </div>
</template>

<script>
import Pagination from "@/components/admin/AdminPagination.vue";
import AdminCouponModal from "@/components/admin/AdminCouponModal.vue";
import DelCouponModal from "@/components/admin/DelCouponModal.vue";

export default {
  data() {
    return {
      isNew: true,
      coupons: {},
      pagination: {},
      tempCoupon: {},
    };
  },
  components: {
    Pagination,
    AdminCouponModal,
    DelCouponModal,
  },
  methods: {
    showAlert(res) {
      this.$swal(res.data.message);
    },
    getCoupon(num = this.pagination.current_page || 1) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupons?page=${num}`;
      this.$http
        .get(url)
        .then((res) => {
          if (res.data.success) {
            const { coupons, pagination } = res.data;
            this.coupons = coupons;
            this.pagination = pagination;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    openModal(isNew, item) {
      switch (isNew) {
        case "new":
          // 先設定預設內容 due_date 轉為當前 Unix Timestamp 時間戳
          this.tempCoupon = {
            due_date: Math.floor(Date.now() / 1000),
            is_enabled: 0,
          };
          this.$refs.adminModal.openModal();
          break;
        case "edit":
          // 因為傳參考特性會連動到資料，因此將資料進行淺層複製
          this.getCoupon();
          this.tempCoupon = { ...item };
          this.isNew = false;
          this.$refs.adminModal.openModal();
          break;
        case "delete":
          // 因為傳參考特性會連動到資料，因此將資料進行淺層複製
          this.tempCoupon = { ...item };
          // Modal需要拿到 title 和刪除按鈕時需要獲得 id
          this.$refs.adminDelModal.openModal();
          break;
        default:
          break;
      }
    },
    updateCoupon(propsCoupon) {
      // 預設為 新增
      let url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon`;
      let httpMethod = "post";
      // 根據 isNew 來判斷要串接 post 或是 put API
      if (!this.isNew) {
        // 進入編輯狀態
        url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${propsCoupon.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](url, { data: propsCoupon }) // post 或 put
        .then((res) => {
          if (res.data.success) {
            this.$refs.adminModal.closeModal(); // 關掉 modal
            this.getCoupon(); // 重整畫面
          } else {
            this.showAlert(res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteCoupon(propsCoupon) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/coupon/${propsCoupon.id}`;
      this.$http
        .delete(url)
        .then((res) => {
          this.$refs.adminCouponDelModal.closeModal(); // 關掉 modal
          this.showAlert(res);
          this.getCoupon();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    console.clear();
    this.getCoupon();
  },
};
</script>
