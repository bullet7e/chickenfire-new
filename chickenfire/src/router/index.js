import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
  },
  {
    path: '/login',
		props: true,
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
	{
	  path: '/regist',
		props: true,
	  name: 'regist',
	  // route level code-splitting
	  // this generates a separate chunk (about.[hash].js) for this route
	  // which is lazy-loaded when the route is visited.
	  component: () => import(/* webpackChunkName: "regist" */ '../views/Regist.vue')
	},
	{
	  path: '/material',
		props: true,
	  name: 'material',
		meta:{needLogin:true},
	  // route level code-splitting
	  // this generates a separate chunk (about.[hash].js) for this route
	  // which is lazy-loaded when the route is visited.
	  component: () => import(/* webpackChunkName: "material" */ '../views/Material.vue')
	},
	{
	  path: '/news',
		props: true,
	  name: 'news',
	  // route level code-splitting
	  // this generates a separate chunk (about.[hash].js) for this route
	  // which is lazy-loaded when the route is visited.
	  component: () => import(/* webpackChunkName: "news" */ '../views/News.vue')
	},
	{
	  path: '/news/detail/:did',
		props: true,
	  name: 'detail',
	  // route level code-splitting
	  // this generates a separate chunk (about.[hash].js) for this route
	  // which is lazy-loaded when the route is visited.
	  component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue')
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
