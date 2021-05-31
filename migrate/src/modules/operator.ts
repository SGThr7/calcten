type OpFunc = (a: number, b: number) => number

abstract class FormulaSign {
	readonly text: string

	constructor(text: string) {
		this.text = text
	}

	toString(): string {
		return this.text
	}
}

type FormulaMethods<T, K> = {
	[Symbol.iterator](): Generator<T>
	get(key: string): T | undefined
	cmp(key: K, target: string): boolean
}

export class Operator extends FormulaSign {
	readonly priority: number
	readonly fn: OpFunc
	readonly isAssociative: boolean

	constructor(
		text: string,
		priority: number,
		fn: OpFunc,
		isAssociative: boolean
	) {
		super(text)
		this.priority = priority
		this.fn = fn
		this.isAssociative = isAssociative
	}
}

const OperatorKeys = {
	none: ['none', '_', '＿'],
	plus: ['plus', '+', '＋'],
	minus: ['minus', '-', '−'],
	times: ['times', '*', '＊', '×'],
	div: ['div', '/', '／', '÷'],
} as const
type OperatorKeys = typeof OperatorKeys
type OperatorsKey = OperatorKeys[keyof OperatorKeys][number]

export type Operators = { readonly [key in OperatorsKey]: Operator } &
	FormulaMethods<Operator, OperatorsKey>
export const Operators: Operators = {
	none: new Operator('＿', 100, (a) => a, true),
	plus: new Operator('＋', 1, (a, b) => a + b, true),
	minus: new Operator('−', 1, (a, b) => a - b, false),
	times: new Operator('×', 2, (a, b) => a * b, true),
	div: new Operator('÷', 2, (a, b) => a / b, false),

	get ['_'](): Operator {
		return this.none
	},
	get ['＿'](): Operator {
		return this.none
	},
	get ['+'](): Operator {
		return this.plus
	},
	get ['＋'](): Operator {
		return this.plus
	},
	get ['-'](): Operator {
		return this.minus
	},
	get ['−'](): Operator {
		return this.minus
	},
	get ['*'](): Operator {
		return this.times
	},
	get ['＊'](): Operator {
		return this.times
	},
	get ['×'](): Operator {
		return this.times
	},
	get ['/'](): Operator {
		return this.div
	},
	get ['／'](): Operator {
		return this.div
	},
	get ['÷'](): Operator {
		return this.div
	},

	*[Symbol.iterator](): Generator<Operator> {
		for (const key of Object.keys(OperatorKeys) as (keyof OperatorKeys)[]) {
			if (key === 'none') continue
			yield this[key]
		}
	},

	get(key: string): Operator | undefined {
		return this[key as OperatorsKey]
	},

	cmp(operator: OperatorsKey, target: string): boolean {
		return this.get(target) === this[operator]
	},
}

export class Bracket extends FormulaSign {}

const BracketKeys = {
	lparen: ['lparen', '(', '（'],
	rparen: ['rparen', ')', '）'],
} as const
type BracketKeys = typeof BracketKeys
type BracketsKey = BracketKeys[keyof BracketKeys][number]

type Brackets = { readonly [key in BracketsKey]: Bracket } &
	FormulaMethods<Bracket, BracketsKey>
export const Brackets: Brackets = {
	lparen: new Bracket('('),
	rparen: new Bracket(')'),

	get ['('](): Bracket {
		return this.lparen
	},
	get ['（'](): Bracket {
		return this.lparen
	},
	get [')'](): Bracket {
		return this.rparen
	},
	get ['）'](): Bracket {
		return this.rparen
	},

	*[Symbol.iterator](): Generator<Bracket> {
		for (const key of Object.keys(BracketKeys) as (keyof BracketKeys)[]) {
			yield this[key]
		}
	},

	get(key: string): Bracket | undefined {
		return this[key as BracketsKey]
	},

	cmp(bracket: BracketsKey, target: string): boolean {
		return this.get(target) === this[bracket]
	},
}
