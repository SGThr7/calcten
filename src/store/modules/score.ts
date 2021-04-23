import { Module } from 'vuex'
import rootState from '@/store'

const state = {
	score: 0,
}

const store: Module<typeof state, typeof rootState> = {
	namespaced: true,
	state,
	getters: {
		score: ({ score }) => score,
	},
	mutations: {
		set(state, payload: { score: number }) {
			state.score = payload.score
		},
		add(state, payload: { score: number }) {
			state.score += payload.score
		},
	},
	actions: {
		set({ commit }, payload: { score: number }) {
			commit('set', payload)
		},
		add({ commit }, payload: { score: number }) {
			commit('add', payload)
		},
	},
}

export default store
