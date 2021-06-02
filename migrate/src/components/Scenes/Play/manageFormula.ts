import { computed, ComputedRef, reactive, readonly, ref } from 'vue'
import { Brackets, Operators } from '@/modules/operator'
import { FormulaTree } from '@/modules/formula'

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
	const nlparen = Array<number>(numbersCount - 1).fill(0)
	const nrparen = reactive(Array<number>(numbersCount - 1).fill(0))

	const solve = (numbers: number[], answer: number) => {
		if (numbers.length < 2)
			throw new Error('numbers length must be grater than 2')
		const nums = numbers.map(
			(number) => new FormulaTree({ type: 'number', number })
		)
		const ops = [...Operators]
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
		nlparen.fill(0)
		nrparen.fill(0)
	}
	refresh()

	const allowAddOperator = (token: string): boolean => {
		const nlpsum = nlparen.reduce((p, v) => p + v, 0)
		const nrpsum = nrparen.reduce((p, v) => p + v, 0)
		if (Operators.get(token))
			if (noperator.value < numbersCount - 1)
				// Operator limit is `numbersCount - 1`
				return true
			else;
		else if (Brackets.cmp('lparen', token))
			if (
				numbersCount - 1 > nlpsum &&
				numbersCount - 1 - noperator.value > nlparen[noperator.value] &&
				!Brackets.cmp('rparen', operators[operators.length - 1])
			)
				// Disallow waste left paren
				return true
			else;
		else if (Brackets.cmp('rparen', token))
			if (
				nlpsum > nrpsum &&
				nlparen.reduce((p, v) => p + Number(v >= 1), 0) >
					nrparen[noperator.value] &&
				noperator.value < numbersCount - 1 &&
				!Brackets.cmp('lparen', operators[operators.length - 1])
			)
				// `nlparen > nrparen`
				return true
			else;
		// Unknown operator
		else return true

		return false
	}
	const countOperator = (token: string, count: number): void => {
		if (Operators.get(token)) {
			noperator.value += count
		} else if (Brackets.cmp('lparen', token)) {
			nlparen[noperator.value] += count
		} else if (Brackets.cmp('rparen', token)) {
			nrparen[noperator.value] += count
		}
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
		while (inum < numbersCount - 1) {
			let n = numbers[inum].toString()
			for (; Brackets.cmp('lparen', operators[iop]); iop += 1) {
				n = Brackets.lparen + n
				nbrace += 1
			}
			for (; Brackets.cmp('rparen', operators[iop]); iop += 1) {
				n += Brackets.rparen
				nbrace -= 1
			}
			yield n

			if (inum < numbersCount - 1)
				yield Operators.get(operators[iop])?.toString() ??
					Operators.none.toString()

			inum += 1
			iop += 1
		}
		yield numbers[inum].toString() + Brackets.rparen.toString().repeat(nbrace)
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
