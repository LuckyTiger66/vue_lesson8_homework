import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    //404
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/404.vue"),
    meta: { title: "找不到頁面", desc: "" },
  },
  {
    //登入介面
    path: "/login",
    component: () => import("@/views/Login.vue"),
    meta: { title: "後台登入介面", desc: "" },
  },
  {
    //前台介面
    path: "/",
    component: () => import("@/views/Index.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/front/Top.vue"),
        meta: {
          title: "",
          desc: "WeCard微卡爾德，集換式卡牌相關的商品，追蹤最新消息",
        },
      },
      {
        path: "articles",
        component: () => import("@/views/front/Articles.vue"),
        meta: {
          title: "最新消息",
          desc: "集換式卡牌的最新消息",
        },
      },
      {
        path: "article/:id",
        component: () => import("@/views/front/Article.vue"),
      },
      {
        path: "products",
        component: () => import("@/views/front/Products.vue"),
        meta: {
          title: "商品列表",
          desc: "專門販集換式卡牌商品與周邊",
        },
      },
      {
        path: "product/:id",
        component: () => import("@/views/front/Product.vue"),
      },
      {
        path: "favorite",
        component: () => import("@/views/front/Favorite.vue"),
        meta: {
          title: "收藏清單",
        },
      },
      {
        path: "cart",
        component: () => import("@/views/cart/Cart.vue"),
        children: [
          {
            path: "",
            component: () => import("@/views/cart/CartTop.vue"),
            meta: {
              title: "確認購物車",
              desc: "距離獲得心愛的卡牌只差臨門一腳了",
            },
          },
          {
            path: "/cartcheck",
            component: () => import("@/views/cart/CartCheck.vue"),
            meta: {
              title: "填寫訂單",
              desc: "距離獲得心愛的卡牌只差臨門一腳了",
            },
          },
          {
            path: "/cartconfirm",
            component: () => import("@/views/cart/CartConfirm.vue"),
            meta: {
              title: "確認訂單",
              desc: "距離獲得心愛的卡牌只差臨門一腳了",
            },
          },
          {
            path: "/cartpayment",
            component: () => import("@/views/cart/CartPayment.vue"),
            meta: {
              title: "完成下訂",
            },
            children: [
              {
                path: "/cartpayment/:id",
                component: () => import("@/views/cart/CartOrder.vue"),
              },
            ],
          },
          {
            path: "/cartcompleted",
            component: () => import("@/views/cart/CartCompleted.vue"),
            meta: {
              title: "完成付款",
            },
            children: [
              {
                path: "/cartcompleted/:id",
                component: () => import("@/views/cart/CartFinished.vue"),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    //後台介面
    path: "/admin",
    component: () => import("@/views/admin/Admin.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/admin/AdminTop.vue"),
        meta: { title: "後台管理介面", desc: "" },
      },
      {
        path: "products",
        component: () => import("@/views/admin/AdminProducts.vue"),
        meta: { title: "商品列表", desc: "" },
      },
      {
        path: "orders",
        component: () => import("@/views/admin/AdminOrders.vue"),
        meta: { title: "訂單列表", desc: "" },
      },
      {
        path: "coupon",
        component: () => import("@/views/admin/AdminCoupons.vue"),
        meta: { title: "優惠券設定", desc: "" },
      },
      {
        path: "articles",
        component: () => import("@/views/admin/AdminArticles.vue"),
        meta: { title: "文章列表", desc: "" },
      },
      {
        path: "article/:id",
        component: () => import("@/views/admin/AdminArticle.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

export default router;
