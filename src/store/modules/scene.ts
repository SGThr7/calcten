import { Module } from 'vuex'
import rootState from '@/store'

type SceneState = {
	currentSceneKey: string
}
const state: SceneState = {
	currentSceneKey: 'Title',
}

const store: Module<typeof state, typeof rootState> = {
	namespaced: true,
	state,
	getters: {
		currentSceneKey: (state) => state.currentSceneKey,
	},
	mutations: {
		setScene(state, payload: { scene: typeof state.currentSceneKey }) {
			state.currentSceneKey = payload.scene
		},
	},
	actions: {
		title({ commit }) {
			commit('setScene', { scene: 'Title' })
		},
		play({ commit }) {
			commit('setScene', { scene: 'Play' })
		},
		result({ commit }) {
			commit('setScene', { scene: 'Result' })
		},
	},
}

export default store
