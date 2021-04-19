import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/play',
			name: 'play-view',
			component: require('@/components/PlayView.vue').default,
		},
		{
			path: '*',
			redirect: '/play',
		},
	],
})
