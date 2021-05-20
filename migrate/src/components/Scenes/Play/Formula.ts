import { computed, ComputedRef, reactive, readonly, ref } from 'vue'
import { BracketList, OperatorList } from '@/modules/operator'
import { gets } from '@/modules/helper'
import { FormulaTree } from '@/modules/calculate'

interface ManageFormula {
	numbers: readonly number[]
	operators: readonly string[]
	formula: ComputedRef<string[]>
	refresh: () => void
	addOperator: (operator: string) => void
	removeOperator: () => void
	allowAddOperator: (operator: string) => boolean
	isInputFinish: ComputedRef<boolean>
}

export default function manageFormula(
	numbersCount: number,
	answer: number
): ManageFormula {
	const numbers = reactive<number[]>([])
	const operators = reactive<string[]>([])
	const noperator = ref(0)
	let nlparen = 0

	const solve = (numbers: number[], answer: number) => {
		if (numbers.length < 2)
			throw new Error('numbers length must be grater than 2')
		const nums = numbers.map(
			(number) => new FormulaTree({ type: 'number', number })
		)
		const ops = [
			OperatorList.plus,
			OperatorList.minus,
			OperatorList.times,
			OperatorList.div,
		]
		function* generateFormula(fs: FormulaTree[]): Generator<FormulaTree> {
			if (fs.length === 1) {
				yield fs[0]
				return
			}

			for (const op of ops) {
				for (let i = 0; i < fs.length - 1; i += 1) {
					const nfs = fs
						.slice(0, i)
						.concat(
							new FormulaTree({
								type: 'operator',
								operator: op,
								left: fs[i],
								right: fs[i + 1],
							})
						)
						.concat(fs.slice(i + 2))
					yield* generateFormula(nfs)
				}
			}
		}
		const res: Record<string, FormulaTree> = {}
		for (const g of generateFormula(nums)) {
			if (g.calculate() === answer) res[g.toINString()] = g
		}
		return Object.values(res)
	}

	const refresh = () => {
		const randomize = () => {
			for (let i = 0; i < numbersCount; i++) {
				numbers[i] = Math.floor(Math.random() * 10)
			}
			return numbers
		}
		let ans
		for (;;) {
			ans = solve(randomize(), answer)
			if (ans.length) break
		}
		console.log(ans.map((f) => f.toINString()))
		operators.length = 0
		noperator.value = 0
		nlparen = 0
	}
	refresh()

	const allowAddOperator = (operator: string): boolean => {
		const o = OperatorList[operator]
		const b = BracketList[operator]
		if (o)
			if (noperator.value < numbersCount - 1)
				// Operator limit is `numbersCount - 1`
				return true
			else;
		else if (b)
			if (b === BracketList.lparen)
				if (
					Math.min(
						numbersCount - 1 - nlparen,
						numbersCount - 1 - noperator.value
					) > 0
				)
					// Disallow waste left paren
					return true
				else;
			else if (b === BracketList.rparen)
				if (nlparen > operators.length - noperator.value - nlparen)
					// `nlparen > nrparen`
					return true
				else;
			else;
		// Unknown operator
		else return true

		return false
	}
	const countOperator = (operator: string, count: number): void => {
		const o = OperatorList[operator]
		if (o) {
			noperator.value += count
			return
		}
		const b = BracketList[operator]
		if (b === BracketList.lparen) {
			nlparen += count
			return
		} else if (b === BracketList.rparen) return
	}

	const addOperator = (operator: string) => {
		if (allowAddOperator(operator)) {
			countOperator(operator, 1)
			operators[operators.length] = operator
		}
	}
	const removeOperator = () => {
		countOperator(operators[operators.length - 1], -1)
		if (operators.length > 0) operators.length -= 1
	}

	const isInputFinish = computed<boolean>(
		() => noperator.value === numbersCount - 1
	)

	function* iterFormula() {
		let inum = 0
		let iop = 0
		let nbrace = 0
		while (inum < numbersCount) {
			let n = numbers[inum].toString()
			for (
				;
				gets(BracketList)(operators[iop]) === BracketList.lparen;
				iop += 1
			) {
				n = gets(BracketList)(operators[iop]) + n
				nbrace += 1
			}
			for (
				;
				gets(BracketList)(operators[iop]) === BracketList.rparen;
				iop += 1
			) {
				n += gets(BracketList)(operators[iop])
				nbrace -= 1
			}
			yield n

			if (inum < numbersCount - 1)
				yield gets(OperatorList)(operators[iop])?.toString() ??
					OperatorList.none.toString()

			inum += 1
			iop += 1
		}
		for (let i = 0; i < nbrace; i += 1) yield BracketList.rparen.toString()
	}
	const formula = computed(() => [...iterFormula()])

	return {
		numbers: readonly(numbers),
		operators: readonly(operators),
		formula,
		refresh,
		addOperator,
		removeOperator,
		allowAddOperator,
		isInputFinish,
	}
}
