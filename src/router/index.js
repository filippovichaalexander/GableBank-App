// import { createRouter, createWebHistory } from "vue-router";
// import Reg from '../views/Reg.vue';
// const routes = [
//     {
//         path: '/',
//         component: Home,
//         name: "Home"
//     },
//     {
//         path: '/reg',
//         component: Reg,
//         name: "Reg"
//     },
// ]
// const router = createRouter({
//     history: createWebHistory(),
//     routes,
// });

// const app = Vue.createApp({})
// // Make sure to _use_ the router instance to make the
// // whole app router-aware.
// app.use(router)

// app.mount('#app')





import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue';
import Signin from '../views/Signin.vue';
import Events from '../views/Events.vue';
// import Login from '../components/Login.vue';
// import SignIn from '../components/SignIn.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin,
      // children: [
      //   {
      //     path: '/login',
      //     component: Login
      //   },
      //   {
      //     path: '/signin',
      //     component: SignIn
      //   }
      // ]
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
    }
  ]
})

export default router









