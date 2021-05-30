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

export class Operator extends FormulaSign {
	readonly priority: number
	readonly fn: OpFunc

	constructor(text: string, priority: number, fn: OpFunc) {
		super(text)
		this.priority = priority
		this.fn = fn
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

export const Operators = {
	none: new Operator('＿', 100, (a) => a),
	plus: new Operator('＋', 1, (a, b) => a + b),
	minus: new Operator('−', 1, (a, b) => a - b),
	times: new Operator('×', 2, (a, b) => a * b),
	div: new Operator('÷', 2, (a, b) => a / b),

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

export const Brackets = {
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
