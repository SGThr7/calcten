import Vue from 'vue'
import Router from 'vue-router'

import TitleView from '@/components/TitleScene/TitleView.vue'
import PlayView from '@/components/PlayScene/PlayView.vue'
import ResultView from '@/components/ResultScene/ResultView.vue'

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
			path: '/result',
			name: 'result-view',
			component: ResultView,
		},
		{
			path: '*',
			redirect: '/',
		},
	],
})
