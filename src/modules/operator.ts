export const Operator = {
	plus: '＋',
	minus: '−',
	times: '×',
	div: '÷',
} as const
export type Operator = typeof Operator[keyof typeof Operator]

export const InputSign = {
	none: '＿',
	...Operator,
} as const
export type InputSign = typeof InputSign[keyof typeof InputSign]

export const Bracket = {
	lparen: '(',
	rparen: ')',
} as const
export type Bracket = typeof Bracket[keyof typeof Bracket]

export type FormulaSign = InputSign | Bracket

export type OpFunc = (a: number, b: number) => number

export type OpData = Record<InputSign, { priority: number; fn: OpFunc }>
export const OpData: OpData = {
	[InputSign.none]: {
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

export function isOperator(arg: unknown): arg is Operator {
	return Object.values<unknown>(Operator).includes(arg)
}

export function isInputSign(arg: unknown): arg is InputSign {
	return Object.values<unknown>(InputSign).includes(arg)
}
