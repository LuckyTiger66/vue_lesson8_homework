<template>
  <header class="nav-header">
    <Navbar></Navbar>
  </header>
  <main id="main" class="container content">
    <h2 class="text-center pt-4 mt-3">後台登入</h2>
    <article class="login-article text-center my-4">
      <div class="login p-4 rounded">
        <div class="row justify-content-center">
          <h3 class="h3 pb-3 mb-3 font-weight-normal text-main login-title">
            請輸入管理者資料
          </h3>
          <div class="col-auto">
            <form id="form" class="form-signin" @submit.prevent="login">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control border-double"
                  id="username"
                  placeholder="name@example.com"
                  required
                  autofocus
                  v-model="loginData.username"
                />
                <label for="username">Email address</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control border-double"
                  id="password"
                  placeholder="Password"
                  required
                  v-model="loginData.password"
                  autocomplete="off"
                />
                <label for="password">Password</label>
              </div>
              <button
                class="login-btn btn btn-lg text-dark w-100 mt-3 border-double"
                type="submit"
                id="login"
              >
                登入
              </button>
            </form>
          </div>
        </div>
        <small class="mt-5 mb-3 text-light">
          &copy; 2021~∞ -
          <a
            class="text-light text-decoration-none"
            href="https://www.hexschool.com/"
            target="_blank"
            >六角學院</a
          >
        </small>
      </div>
    </article>
  </main>
  <Footer></Footer>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
export default {
  data() {
    // 一律使用 function return 資料定義初始化都在這
    // 使用this.即可呼叫此處資料內容
    return {
      loginData: {},
    };
  },
  components: {
    Navbar,
    Footer,
  },
  methods: {
    showAlert(res) {
      this.$swal({
        title: res.data.message,
        icon: "error",
      });
    },
    login() {
      const url = `${process.env.VUE_APP_API}admin/signin`;
      this.$http
        .post(url, this.loginData)
        .then((res) => {
          if (res.data.success) {
            // const token = res.data.token;
            // const expired = res.data.expired;
            // 使用解構
            const { token, expired } = res.data;
            document.cookie = `hexToken=${token}; expires=${new Date(
              expired
            )}; path=/`;
            // 跳轉至 products.html 頁面
            this.$router.push("/admin");
          } else {
            // 輸入資料錯誤報錯提醒
            this.showAlert(res);
            this.loginData = {};
          }
        })
        // axios報錯
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    console.clear();
  },
};
</script>

<style lang="scss">
@import "../assets/css/common";
</style>
