import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/scan",
      name: "scan",
      component: () => import("./components/Scan.vue"),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("loggedIn") === null) {
          next({ name: "home" });
        } else {
          next();
        }
      }
    },
    {
      path: "/search/:userprop?",
      name: "search",
      component: () => import("./components/Search.vue"),
      props: true,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("loggedIn") === null) {
          next({ name: "home" });
        } else {
          next();
        }
      }
    },
    {
      path: "/view/:id",
      component: () => import("./components/View.vue"),
      props: true,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("loggedIn") === null) {
          next({ name: "home" });
        } else {
          next();
        }
      }
    },
    {
      path: "/mail",
      name: "mail",
      component: () => import("./components/SendMail.vue"),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("loggedIn") === null) {
          next({ name: "home" });
        } else {
          next();
        }
      }
    },
    {
      path: "/register",
      name: "register",
      component: () => import("./components/Register.vue"),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("loggedIn") === null) {
          next({ name: "home" });
        } else {
          next();
        }
      }
    },
    {
      path: "/qr",
      name: "qr",
      component: () => import("./components/QR.vue"),
      props: true,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("loggedIn") === null) {
          next({ name: "home" });
        } else {
          next();
        }
      }

    },
    {
      path: "/generate-tag",
      name: "generate-tag",
      component: () => import("./components/GenerateTags.vue"),
      props: true,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("loggedIn") === null) {
          next({ name: "home" });
        } else {
          next();
        }
      }
    },
    {
      path: '/',
      name: "home",
      component: () => import("./components/Login.vue"),
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("loggedIn")) {
          next({ path: "register" })
        } else {
          next()
        }
      }
    },
  ]
})
