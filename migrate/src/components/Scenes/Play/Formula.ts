import { computed, ComputedRef, reactive, readonly } from 'vue'
import { BracketList, OperatorList } from '@/modules/operator'

interface ManageFormula {
	numbers: readonly number[]
	operators: readonly string[]
	formula: ComputedRef<string[]>
	refresh: () => void
	addOperator: (operator: string) => void
}

export default function manageFormula(numbersCount = 4): ManageFormula {
	const numbers = reactive<number[]>([])
	const operators = reactive<string[]>([])

	const refresh = () => {
		for (let i = 0; i < numbersCount; i++) {
			numbers[i] = Math.floor(Math.random() * 10)
		}
	}
	refresh()

	const addOperator = (operator: string) => {
		operators[operators.length] = operator
	}

	function* iterFormula() {
		let inum = 0
		let iop = 0
		while (inum < numbersCount) {
			let n = numbers[inum].toString()
			for (; BracketList[operators[iop]] === BracketList.lparen; iop += 1)
				n = BracketList[operators[iop]] + n
			for (; BracketList[operators[iop]] === BracketList.rparen; iop += 1)
				n += BracketList[operators[iop]]
			yield n

			if (inum < numbersCount - 1)
				yield OperatorList[operators[iop]]?.toString() ??
					OperatorList.none.toString()

			inum += 1
			iop += 1
		}
	}
	const formula = computed(() => {
		return [...iterFormula()]
	})

	return {
		numbers: readonly(numbers),
		operators: readonly(operators),
		formula,
		refresh,
		addOperator,
	}
}
