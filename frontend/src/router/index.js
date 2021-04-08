import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Quizzes from '../views/quizzes.vue'
import QuizDetail from '../views/quiz-detail.vue'
import UserList from '../views/user-list.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'



Vue.use(VueRouter)

export default function init(store) {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/quizzes',
        component: Quizzes,
        // name: 'start',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: 'about' */ '../views/quizzes.vue')
      },
      {
        path: '/quizzes/:id',
        component: QuizDetail,
        component: () => import(/* webpackChunkName: 'about' */ '../views/quiz-detail.vue')
      },
      {
        path: '/',
        name: 'UserList',
        component: UserList
      },
      {
        path: '/users/:id',
        name: 'UserDetail',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/user-detail.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter(to, from, next) {
          if (store.state.user) return next('/profile')
          return next()
        }
      },
      {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter(to, from, next) {
          if (store.state.user) return next('/profile')
          return next()
        }
      },
      {
        path: '/profile',
        name: 'profile',
        component: UserList,
        beforeEnter(to, from, next) {
          if (!store.state.user) return next('/login')
          return next()
        }
      }
    ]
  })
}
