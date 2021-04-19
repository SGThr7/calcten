export const Operator = {
	none: '＿',
	plus: '＋',
	minus: '−',
	times: '×',
	div: '÷',
} as const
export type Operator = typeof Operator[keyof typeof Operator]

export const OpList = Object.values(Operator).filter((t) => t !== Operator.none)

export const Bracket = {
	lparen: '(',
	rparen: ')',
} as const
export type Bracket = typeof Bracket[keyof typeof Bracket]

export const BracketList = Object.values(Bracket)

export type FormulaSign = Operator | Bracket

export type OpFunc = (a: number, b: number) => number

export type OpData = Record<Operator, { priority: number; fn: OpFunc }>
export const OpData: OpData = {
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
} as const

export function isOperator(literal: unknown): literal is Operator {
	return Object.values<unknown>(Operator).includes(literal)
}
