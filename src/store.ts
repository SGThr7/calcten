import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		opscount: 4,
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
			if (index < state.opscount) {
				state.ops[index] = operatorID
			} else {
				state.ops[state.opscount - 1] = operatorID
			}
		},
	},
	actions: {},
})
