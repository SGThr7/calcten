import { Module } from 'vuex'
import rootStore from '@/store'

export type Mode = 'BeforePlay' | 'Playing' | 'Finish'
type State = {
	status: Mode
}

const store: Module<State, typeof rootStore> = {
	namespaced: true,
	state: {
		status: 'BeforePlay',
	},
	getters: {
		status: (status) => status.status,
	},
	mutations: {
		set(state, payload) {
			state.status = payload.mode
		},
		beforePlay(state) {
			state.status = 'BeforePlay'
		},
		startPlay(state) {
			state.status = 'Playing'
		},
		finishPlay(state) {
			state.status = 'Finish'
		},
	},
	actions: {
		set({ commit }, payload) {
			commit('set', payload)
		},
	},
}

export default store
