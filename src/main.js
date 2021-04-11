import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Traffic from './components/Traffic.vue'
Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Traffic,
		},
		{
			path: '/:color',
			name: 'color',
			component: Traffic,
			props: true,
		},
	],
});
export default router

new Vue({
	el: '#app',
	render: h => h(App),
	router
});