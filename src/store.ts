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
		inputOpsCount: 3,
		inputOpsID: [] as number[],
		opData: {
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
		opList: [
			Operator.none,
			Operator.plus,
			Operator.minus,
			Operator.times,
			Operator.div,
		],
	},
	mutations: {
		setOpID(state, operatorID) {
			let index = state.inputOpsID.length
			if (index < state.inputOpsCount) {
				Vue.set(state.inputOpsID, index, operatorID)
			} else {
				Vue.set(state.inputOpsID, state.inputOpsCount - 1, operatorID)
			}
		},
		removeOp(state) {
			state.inputOpsID.pop()
		},
	},
	getters: {
		inputOpsString(state) {
			return state.inputOpsID.map((id: number) => state.opList[id])
		},
	},
	actions: {},
})
