import Vue from 'vue'
import Router from 'vue-router'

import TitleView from '@/components/TitleView.vue'
import PlayView from '@/components/PlayView.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'title-view',
			component: TitleView,
		},
		{
			path: '/play',
			name: 'play-view',
			component: PlayView,
		},
		{
			path: '*',
			redirect: '/',
		},
	],
})
