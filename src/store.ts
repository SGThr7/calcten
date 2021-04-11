import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

type TOpsData = {
	[operator: string]: {
		priority: number
		func: (a: number, b: number) => number
	}
}
const enum Operator {
	none = '',
	plus = '+',
	minus = '−',
	times = '×',
	div = '÷',
}

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state: {
		opsCount: 3,
		ops: [] as number[],
		opsData: {
			[Operator.none]: {
				priority: 100,
				func: (a, b) => a,
			},
			[Operator.plus]: {
				priority: 1,
				func: (a, b) => a + b,
			},
			[Operator.minus]: {
				priority: 1,
				func: (a, b) => a - b,
			},
			[Operator.times]: {
				priority: 2,
				func: (a, b) => a * b,
			},
			[Operator.div]: {
				priority: 2,
				func: (a, b) => a / b,
			},
		} as TOpsData,
		opsSample: [
			Operator.none,
			Operator.plus,
			Operator.minus,
			Operator.times,
			Operator.div,
		],
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
	getters: {
		opsString(state) {
			return state.ops.map((id: number) => state.opsSample[id])
		},
	},
	actions: {},
})
