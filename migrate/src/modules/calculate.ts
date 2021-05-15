import CustomError from 'extensible-custom-error'
import { BracketList, Operator, OperatorList } from '@/modules/operator'

export class FormulaTree {
	readonly data:
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

	constructor(formula: string) {
		formula = formula.trim()

		// Remove outside pair parentheses
		if (
			BracketList[formula[0]] === BracketList.lparen &&
			BracketList[formula[formula.length - 1]] === BracketList.rparen &&
			formula.indexOf(formula[formula.length - 1]) === formula.length - 1
		)
			formula = formula.slice(1, -1)

		// If number
		const n = Number(formula)
		if (!isNaN(n)) {
			this.data = { type: 'number', number: n }
			return
		}

		// If formula
		let i = -1
		let d = Infinity
		let depth = 0
		for (let k = 0; k < formula.length; k += 1) {
			const t = formula[k]
			const b = BracketList[t]
			const o = OperatorList[t]
			if (b === BracketList.lparen) {
				depth += 1
			} else if (b === BracketList.rparen) {
				depth -= 1
				if (depth < 0)
					throw new FormulaSyntaxError('Too many right parentheses')
			} else if (d > depth && o) {
				i = k
				d = depth
			} else if (
				d === depth &&
				(o?.priority ?? NaN) <= (OperatorList[formula[i]]?.priority ?? Infinity)
			) {
				i = k
			}
		}

		const operator = OperatorList[formula[i]]
		if (i === -1 || depth === Infinity || !(operator instanceof Operator))
			throw new FormulaSyntaxError(`Invalid formula (got: "${formula}")`)

		this.data = {
			type: 'operator',
			operator,
			left: new FormulaTree(formula.slice(0, i)),
			right: new FormulaTree(formula.slice(i + 1)),
		}
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
				const priority = this.data.operator.priority
				const _left = this.data.left._toINString(spacer)
				const left =
					_left.priority < priority
						? BracketList.lparen + _left.formula + BracketList.rparen
						: _left.formula
				const _right = this.data.right._toINString(spacer)
				const right =
					_right.priority < priority
						? BracketList.lparen + _right.formula + BracketList.rparen
						: _right.formula
				return {
					priority,
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
