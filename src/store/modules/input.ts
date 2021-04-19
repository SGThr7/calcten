import { Module } from 'vuex'
import rootState from '@/store'
import { calc, isSolvable } from '@/solve'
import {
	Bracket,
	BracketList,
	FormulaSign,
	isOperator,
	OpData,
	Operator,
	OpList,
} from '@/modules/operator'

const state = {
	count: 4,
	answer: 10,
	nums: [] as number[],
	ops: [] as FormulaSign[],
}
type state = typeof state

const store: Module<state, typeof rootState> = {
	namespaced: true,
	state,
	mutations: {
		refresh(state) {
			let res: number[]
			do {
				res = []
				for (let i = 0; i < state.count; i++) {
					res[i] = Math.floor(Math.random() * 10)
				}
			} while (!isSolvable(res))
			state.nums = res
			state.ops = []
		},
		add(state, { sign }: { sign: FormulaSign }) {
			const nop = state.ops.filter((o) => isOperator(o)).length
			const nlparen = state.ops.filter((o) => o === Bracket.lparen).length
			const opTop = state.ops[state.ops.length - 1]
			if (sign === Bracket.lparen) {
				if (
					Math.min(state.count - 1 - nlparen, state.count - 1 - nop) &&
					opTop !== Bracket.rparen
				) {
					return state.ops.push(sign)
				}
			} else if (sign === Bracket.rparen) {
				const nlparen = state.ops.filter((o) => o === Bracket.lparen).length
				const nrparen = state.ops.filter((o) => o === Bracket.rparen).length
				if (nlparen > nrparen && opTop !== Bracket.lparen) {
					return state.ops.push(sign)
				}
			} else {
				if (nop < state.count - 1) {
					return state.ops.push(sign)
				}
			}
			return state.ops.push()
		},
		remove(state) {
			return state.ops.pop()
		},
	},
	getters: {
		count: ({ count }) => count,
		opList: () => OpList,
		bracketList: () => BracketList,
		opData: () => OpData,
		formula(state) {
			const nums = state.nums.slice(0)
			const ops = state.ops.slice(0)
			const res: string[] = []
			let o = ops.shift()
			let n = nums.shift()?.toString(10)
			while (n) {
				while (o === Bracket.lparen) {
					n = o + n
					o = ops.shift()
				}
				while (o === Bracket.rparen) {
					n += o
					o = ops.shift()
				}
				if (o === Bracket.lparen) {
					throw new SyntaxError(
						'Cannot input left paren right after right paren.'
					)
				}

				res.push(n)
				if (isOperator(o)) {
					res.push(o)
				} else {
					res.push(Operator.none)
				}
				o = ops.shift()
				n = nums.shift()?.toString(10)
			}
			// Pop tail Operator.none
			res.pop()
			return res
		},
		rpn(state, { formula, opData }: { formula: string[]; opData: OpData }) {
			const f = formula
				.join('')
				.split('')
				.map((token) =>
					isNaN(parseInt(token, 10))
						? (token as FormulaSign)
						: parseInt(token, 10)
				)
			const nlparen = f.filter((token) => token === Bracket.lparen).length
			const nrparen = f.filter((token) => token === Bracket.rparen).length
			for (let i = 0; i < nlparen - nrparen; i++) {
				f.push(Bracket.rparen)
			}
			const rpn: (number | Operator)[] = []
			const stack: (Operator | typeof Bracket.lparen)[] = []
			let token = f.shift()
			while (token !== undefined) {
				if (typeof token === 'number') {
					rpn.push(token)
				} else {
					if (token === Bracket.lparen) {
						stack.push(token)
					} else if (token === Bracket.rparen) {
						let stackTop = stack.pop()
						while (stackTop !== Bracket.lparen) {
							if (stackTop === undefined)
								throw new Error('Not found left paren.')
							rpn.push(stackTop)
							stackTop = stack.pop()
						}
					} else {
						let stackTop = stack.pop()
						while (
							isOperator(stackTop) &&
							opData[token].priority <= opData[stackTop]?.priority
						) {
							rpn.push(stackTop)
							stackTop = stack.pop()
						}
						if (stackTop !== undefined) stack.push(stackTop)
						stack.push(token)
					}
				}

				token = f.shift()
			}

			let stackTop = stack.pop()
			while (stackTop !== undefined) {
				if (stackTop !== Bracket.lparen) {
					rpn.push(stackTop)
				}
				stackTop = stack.pop()
			}
			return rpn
		},
		result(state, { rpn }: { rpn: (number | Operator)[] }): number {
			return calc(rpn)
		},
		checkResult(state, { result }: { result: number }): boolean {
			const nop = state.ops.filter((o) => isOperator(o)).length
			return nop === state.count - 1 && result === state.answer
		},
	},
}

export default store
