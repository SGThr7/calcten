import { Module } from 'vuex'
import rootState from '@/store'

const Operator = {
	none: '',
	plus: '＋',
	minus: '−',
	times: '×',
	div: '÷',
} as const
type Operator = typeof Operator[keyof typeof Operator]
const Bracket = {
	lparen: '(',
	rparen: ')',
} as const
type Bracket = typeof Bracket[keyof typeof Bracket]
type FormulaSign = Operator | Bracket
type OpData = {
	[op in Operator]: {
		priority: number
		fn: (a: number, b: number) => number
	}
}

const state = {
	count: 4,
	nums: [] as number[],
	ops: [] as FormulaSign[],
}
type state = typeof state

const store: Module<state, typeof rootState> = {
	namespaced: true,
	state,
	mutations: {
		refresh(state) {
			const res = []
			for (let i = 0; i < state.count; i++) {
				res[i] = Math.floor(Math.random() * 10)
			}
			state.nums = res
			state.ops = []
		},
		add(state, { sign }: { sign: FormulaSign }) {
			if (sign === Bracket.lparen) {
				const nop = state.ops.filter((o) =>
					Object.values<Object>(Operator).includes(o)
				).length
				if (nop < state.count - 1) {
					return state.ops.push(sign)
				}
			} else if (sign === Bracket.rparen) {
				const nlparen = state.ops.filter((o) => o === Bracket.lparen).length
				const nrparen = state.ops.filter((o) => o === Bracket.rparen).length
				if (nlparen - nrparen > 0) {
					return state.ops.push(sign)
				}
			} else {
				return state.ops.push(sign)
			}
			return state.ops.push()
		},
		remove(state) {
			return state.ops.pop()
		},
	},
	getters: {
		count: ({ count }) => count,
		opList: () => [
			Operator.none,
			Operator.plus,
			Operator.minus,
			Operator.times,
			Operator.div,
		],
		bracketList: () => [Bracket.lparen, Bracket.rparen],
		opData: (): OpData => ({
			[Operator.none]: {
				priority: 100,
				fn: (a, b) => a,
			},
			[Operator.plus]: {
				priority: 1,
				fn: (a, b) => a + b,
			},
			[Operator.minus]: {
				priority: 1,
				fn: (a, b) => a - b,
			},
			[Operator.times]: {
				priority: 2,
				fn: (a, b) => a * b,
			},
			[Operator.div]: {
				priority: 2,
				fn: (a, b) => a / b,
			},
		}),
		formula(state) {
			const nums = state.nums.slice(0)
			const ops = state.ops.slice(0)
			const res: string[] = []
			let o = ops.shift()
			let n = nums.shift()?.toString(10)
			const rbracket = ['']
			while (n) {
				rbracket.push('')
				while (o === Bracket.lparen) {
					n = o + n
					o = ops.shift()
				}
				while (o === Bracket.rparen) {
					rbracket[1] += o
					o = ops.shift()
				}

				if (n[0] === Bracket.lparen) {
					const tmp = rbracket.shift()
					rbracket[0] += tmp
					res.push(n)
				} else {
					res.push(n + rbracket.shift())
				}
				if (Object.values<Object>(Operator).includes(o)) {
					res.push(o)
				} else {
					res.push(Operator.none)
				}
				o = ops.shift()
				n = nums.shift()?.toString(10)
			}
			res.pop()
			res.push(res.pop() + rbracket.shift())
			return res
		},
		rpn(state, { formula, opData }: { formula: string[]; opData: OpData }) {
			const tmptoken = '_'
			const f = formula
				.map((token) => (token === Operator.none ? tmptoken : token))
				.join('')
				.split('')
				.map((token) =>
					isNaN(parseInt(token, 10))
						? (token as FormulaSign | typeof tmptoken)
						: parseInt(token, 10)
				)
				.map((token) => (token === tmptoken ? Operator.none : token))
			const nlparen = f.filter((token) => token === Bracket.lparen).length
			const nrparen = f.filter((token) => token === Bracket.rparen).length
			for (let i = 0; i < nlparen - nrparen; i++) {
				f.push(Bracket.rparen)
			}
			const rpn: (number | Operator)[] = []
			const stack: FormulaSign[] = []
			const stackTop = () => stack[stack.length - 1]
			let token = f.shift()
			while (token !== undefined) {
				if (typeof token === 'number') {
					rpn.push(token)
				} else {
					if (token === Bracket.lparen) {
						stack.push(token)
					} else if (token === Bracket.rparen) {
						while (stackTop() !== Bracket.lparen) {
							rpn.push(stack.pop() as Operator)
						}
						stack.pop()
					} else {
						while (
							Object.values<FormulaSign>(Operator).includes(
								stackTop()
							) &&
							opData[token].priority <=
								opData[stackTop() as Operator]?.priority
						) {
							rpn.push(stack.pop() as Operator)
						}
						stack.push(token)
					}
				}

				token = f.shift()
			}
			while (stack.length > 0) {
				if (stackTop() !== Bracket.lparen) {
					rpn.push(stack.pop() as Operator)
				}
			}
			return rpn
		},
		answer(
			state,
			{ rpn, opData }: { rpn: (number | Operator)[]; opData: OpData }
		) {
			const stack: number[] = []
			let token = rpn.shift()
			while (token !== undefined) {
				if (typeof token === 'number') {
					stack.push(token)
				} else if (typeof token === 'string') {
					const fn = opData[token].fn
					const rhs = stack.pop()
					const lhs = stack.pop()
					const ans = fn(lhs, rhs)
					stack.push(ans)
				}
				token = rpn.shift()
			}
			return stack.pop()
		},
	},
}

export default store
