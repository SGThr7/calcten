import CustomError from 'extensible-custom-error'
import { Operator, Brackets, Operators } from '@/modules/operator'

type FormulaData =
	| {
			type: 'operator'
			operator: Operator
			left: FormulaTree
			right: FormulaTree
	  }
	| {
			type: 'number'
			number: number
	  }
export class FormulaTree {
	readonly data: FormulaData

	constructor(data: FormulaData) {
		this.data = data
	}

	// tmp fn name
	static isSurroundedByParen(formula: string): boolean {
		if (
			Brackets.cmp('lparen', formula[0]) &&
			Brackets.cmp('rparen', formula[formula.length - 1])
		) {
			let depth = 0
			for (let i = 0; i < formula.length; i += 1) {
				const token = formula[i]
				if (Brackets.cmp('lparen', token)) depth += 1
				else if (Brackets.cmp('rparen', token)) depth -= 1
				if (depth === 0)
					if (i === formula.length - 1) return true
					else return false
			}
		}
		return false
	}

	static fromIN(formula: string): FormulaTree {
		formula = formula.trim()

		// Remove outside pair parentheses
		if (this.isSurroundedByParen(formula))
			return this.fromIN(formula.slice(1, -1))

		// If number
		const n = Number(formula)
		if (!isNaN(n)) {
			return new FormulaTree({ type: 'number', number: n })
		}

		// If formula
		let i = -1
		let d = Infinity
		let depth = 0
		for (let k = 0; k < formula.length; k += 1) {
			const t = formula[k]
			const o = Operators.get(t)
			if (Brackets.cmp('lparen', t)) {
				depth += 1
			} else if (Brackets.cmp('rparen', t)) {
				depth -= 1
				if (depth < 0)
					throw new FormulaSyntaxError('Too many right parentheses')
			} else if (d > depth && o) {
				i = k
				d = depth
			} else if (
				d === depth &&
				(o?.priority ?? NaN) <=
					(Operators.get(formula[i])?.priority ?? Infinity)
			) {
				i = k
			}
		}

		const operator = Operators.get(formula[i])
		if (i === -1 || depth === Infinity || !(operator instanceof Operator))
			throw new FormulaSyntaxError(`Invalid formula (got: "${formula}")`)

		return new FormulaTree({
			type: 'operator',
			operator,
			left: FormulaTree.fromIN(formula.slice(0, i)),
			right: FormulaTree.fromIN(formula.slice(i + 1)),
		})
	}

	static fromRPN(rpn: (string | number)[]): FormulaTree {
		const res: FormulaTree[] = []
		for (const t of rpn) {
			const n = Number(t)
			if (!isNaN(n)) {
				res.push(
					new FormulaTree({
						type: 'number',
						number: n,
					})
				)
				continue
			} else {
				const operator = Operators.get(t as string)
				if (!(operator instanceof Operator))
					throw new FormulaSyntaxError(`Invalid operator (got: "${operator}")`)

				// !right first
				const right = res.pop()
				const left = res.pop()
				if (!(left && right))
					throw new FormulaSyntaxError(`Invalid RPN (RPN: "${rpn}")`)

				res.push(
					new FormulaTree({
						type: 'operator',
						operator,
						left,
						right,
					})
				)
			}
		}

		if (res.length === 1 && res[0] instanceof FormulaTree) return res[0]
		else throw new FormulaSyntaxError(`Something error (RPN: "${rpn}")`)
	}

	toRPNString(spacer = ' '): string {
		switch (this.data.type) {
			case 'number':
				return this.data.number.toString()
			case 'operator':
				return (
					this.data.left.toRPNString(spacer) +
					spacer +
					this.data.right.toRPNString(spacer) +
					spacer +
					this.data.operator.toString()
				)
		}
	}

	toINString(spacer = ''): string {
		return this._toINString(spacer).formula
	}

	private _toINString(spacer = ''): INObject {
		switch (this.data.type) {
			case 'number':
				return {
					priority: Infinity,
					formula: this.data.number.toString(),
				}
			case 'operator': {
				const operator = this.data.operator
				const _left = this.data.left._toINString(spacer)
				const left =
					_left.priority < operator.priority
						? Brackets.lparen + _left.formula + Brackets.rparen
						: _left.formula
				const _right = this.data.right._toINString(spacer)
				const right =
					_right.priority < operator.priority ||
					(!operator.isAssociative && _right.priority === operator.priority)
						? Brackets.lparen + _right.formula + Brackets.rparen
						: _right.formula
				return {
					priority: operator.priority,
					formula:
						left + spacer + this.data.operator.toString() + spacer + right,
				}
			}
		}
	}

	calculate(): number {
		switch (this.data.type) {
			case 'number':
				return this.data.number
			case 'operator':
				return this.data.operator.fn(
					this.data.left.calculate(),
					this.data.right.calculate()
				)
		}
	}
}
type INObject = {
	priority: number
	formula: string
}

class FormulaSyntaxError extends CustomError {}
