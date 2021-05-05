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
		set(state, payload: { scene: typeof state.currentSceneKey }) {
			state.currentSceneKey = payload.scene
		},
	},
	actions: {
		set({ commit }, payload) {
			commit('set', payload)
		},
	},
}

export default store
