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

export type OperatorList = {
	none: Operator
	plus: Operator
	minus: Operator
	times: Operator
	div: Operator
	[key: string]: Operator | null
}
export const OperatorList: OperatorList = {
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
} as const
export function* OperatorsIter(): Generator<Operator> {
	yield OperatorList.plus
	yield OperatorList.minus
	yield OperatorList.times
	yield OperatorList.div
}

export class Bracket extends FormulaSign {}

export type BracketList = {
	lparen: Bracket
	rparen: Bracket
	[key: string]: Bracket | null
}
export const BracketList: BracketList = {
	lparen: new Bracket('('),
	rparen: new Bracket(')'),

	get ['(']() {
		return this.lparen
	},
	get ['（']() {
		return this.lparen
	},
	get [')']() {
		return this.rparen
	},
	get ['）']() {
		return this.rparen
	},
} as const

export function* BracketsIter(): Generator<Bracket> {
	yield BracketList.lparen
	yield BracketList.rparen
}
