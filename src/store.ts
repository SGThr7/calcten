import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		opsCount: 3,
		ops: [] as number[],
		opsSample: ['', '+', '−', '×', '÷'],
		opsFunc: [
			(a, b) => a,
			(a, b) => a + b,
			(a, b) => a - b,
			(a, b) => a * b,
			(a, b) => a / b,
		] as ((a: number, b: number) => number)[],
	},
	mutations: {
		inputOps(state, operatorID) {
			let index = state.ops.length
			if (index < state.opsCount) {
				Vue.set(state.ops, index, operatorID)
			} else {
				Vue.set(state.ops, state.opsCount - 1, operatorID)
			}
		},
	},
	actions: {},
})
