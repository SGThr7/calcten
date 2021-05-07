import { Module } from 'vuex'
import rootState from '@/store'

import { FormulaSign, isOperator, Operator } from '@/modules/operator'

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
		scoring({ dispatch, rootGetters }) {
			const opsCount = rootGetters['input/count'] - 1
			function addScore(score: number) {
				return dispatch('add', { score: score })
			}
			/// # Score Table

			/**
			 * ## Base score
			 *
			 * Base score is defined below.
			 * Therefore, make10 use 4 numbers and 3 operators,
			 * so base score is 30.
			 */
			const baseScore = opsCount * 10
			addScore(baseScore)

			/// ## Bonus score
			const ops = new Set(
				(rootGetters['input/ops'] as FormulaSign[]).filter<Operator>(
					isOperator
				)
			)

			/**
			 * ### Include division operator
			 *
			 * Division operator is not easy to use.
			 * So if the formula includes division operator,
			 * get a bonus score that half the base score.
			 */
			const divisionBonus = baseScore * 0.5
			if (ops.has(Operator.div)) addScore(divisionBonus)

			/**
			 * ### Use all operators
			 *
			 * Used all operators formula is beautiful.
			 * So get a bonus 0.2 base score.
			 */
			const allOperatorsBonus = baseScore * 0.2
			const nkind = Math.min(opsCount, Object.keys(Operator).length)
			if (ops.size >= nkind) addScore(allOperatorsBonus)
		},
	},
}

export default store
