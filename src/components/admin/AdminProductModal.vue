<template>
  <div
    class="modal fade"
    ref="modal"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered">
      <div class="modal-content border-0">
        <div class="modal-header bg-primary text-white">
          <h3 id="productModalLabel" class="modal-title">
            <span v-if="propsProduct.title">編輯商品</span>
            <span v-else>新增商品</span>
          </h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-1">
                <div class="form-group">
                  <label
                    class="text-light bg-secondary mb-2 py-1 px-2"
                    for="mainImageUrl"
                    >請輸入主圖片網址</label
                  >
                  <input
                    id="mainImageUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model.trim="newProduct.imageUrl"
                  />
                  <img
                    class="img-fluid my-3 form-img"
                    :src="newProduct.imageUrl"
                    :alt="newProduct.title"
                  />
                </div>

                <div>
                  <label
                    class="btn btn-outline-success btn-sm d-block w-100 mt-3"
                  >
                    <input
                      id="upload_img"
                      style="display: none"
                      type="file"
                      @change="uploadMainImgage"
                    />
                    上傳圖片
                  </label>
                </div>
              </div>
              <div class="mt-4 mb-1">多圖新增</div>
              <!-- 大寫開頭 建構函式 -->
              <div v-if="Array.isArray(newProduct.imagesUrl)">
                <div
                  class="mb-4"
                  v-for="(item, index) in newProduct.imagesUrl"
                  :key="'addImage' + index"
                >
                  <hr />
                  <div class="form-group">
                    <label
                      class="text-light bg-secondary mb-2 py-1 px-2"
                      :for="'subImageUrl-' + index"
                      >請輸入副圖片 {{ index + 1 }} 的網址</label
                    >
                    <input
                      :id="'subImageUrl-' + index"
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                      v-model="newProduct.imagesUrl[index]"
                    />
                    <img class="img-fluid my-3 form-img" :src="item" alt />

                    <div>
                      <label
                        class="
                          btn btn-outline-success btn-sm
                          d-block
                          w-100
                          my-3
                        "
                      >
                        <input
                          id="upload_img"
                          style="display: none"
                          type="file"
                          @change="uploadSubImgage"
                        />
                        上傳圖片
                      </label>
                    </div>

                    <div class="mb2">
                      <button
                        class="btn btn-outline-danger btn-sm d-block w-100"
                        @click="newProduct.imagesUrl.splice(index, 1)"
                      >
                        刪除圖片
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  class="mt-4"
                  v-if="
                    !newProduct.imagesUrl.length ||
                    newProduct.imagesUrl[newProduct.imagesUrl.length - 1]
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="newProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
              <div v-else>
                <div class="mt-4 mb-2">
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="createImages"
                  >
                    新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control mt-1"
                  placeholder="請輸入標題"
                  v-model.trim="newProduct.title"
                />
              </div>

              <div class="row mt-3">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control mt-1"
                    placeholder="請輸入分類"
                    v-model="newProduct.category"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="unit">單位(個、台、隻...)</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control mt-1"
                    placeholder="請輸入單位"
                    v-model="newProduct.unit"
                  />
                </div>
              </div>

              <div class="row mt-3">
                <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control mt-1"
                    placeholder="請輸入原價"
                    v-model.number="newProduct.origin_price"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control mt-1"
                    placeholder="請輸入售價"
                    v-model.number="newProduct.price"
                  />
                </div>
              </div>
              <hr />

              <div class="form-group">
                <label for="description">商品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control mt-1"
                  placeholder="請輸入商品描述"
                  rows="6"
                  v-model.trim="newProduct.description"
                >
                </textarea>
              </div>
              <div class="form-group mt-3">
                <label for="content">商品規格</label>
                <textarea
                  id="content"
                  type="text"
                  class="form-control mt-1"
                  placeholder="請輸入商品規格"
                  rows="4"
                  v-model.trim="newProduct.content"
                >
                </textarea>
              </div>
              <hr />
              <div class="form-group">
                <label for="stuck">庫存(選填)</label>
                <input
                  id="stuck"
                  type="number"
                  min="0"
                  class="form-control mt-1"
                  placeholder="請輸入庫存量"
                  v-model.number="newProduct.stuck"
                />
              </div>
              <div class="form-group mt-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="newProduct.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-product', propsProduct)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from "@/assets/js/mixins/modalMixin";
export default {
  props: {
    propsProduct: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 新增陣列圖片
    createImages() {
      this.newProduct.imagesUrl = [""];
    },
    uploadMainImgage(e) {
      console.dir(e);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", file);
      this.$http
        .post(url, formData)
        .then((res) => {
          this.newProduct.imageUrl = res.data.imageUrl;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    uploadSubImgage(e) {
      console.dir(e);
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`;
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file-to-upload", file);
      this.$http
        .post(url, formData)
        .then((res) => {
          this.newProduct.imagesUrl[this.newProduct.imagesUrl.length - 1] =
            res.data.imageUrl;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  data() {
    return {
      modal: "",
      newProduct: [],
    };
  },
  watch: {
    propsProduct() {
      this.newProduct = this.propsProduct;
    },
  },
  mixins: [modalMixin],
};
</script>
