import { computed, ComputedRef, reactive, readonly } from 'vue'
import { BracketList, OperatorList } from '@/modules/operator'
import { gets } from '@/modules/helper'

interface ManageFormula {
	numbers: readonly number[]
	operators: readonly string[]
	formula: ComputedRef<string[]>
	refresh: () => void
	addOperator: (operator: string) => void
	removeOperator: () => void
}

export default function manageFormula(numbersCount = 4): ManageFormula {
	const numbers = reactive<number[]>([])
	const operators = reactive<string[]>([])

	const refresh = () => {
		console.log('refresh')
		for (let i = 0; i < numbersCount; i++) {
			numbers[i] = Math.floor(Math.random() * 10)
		}
	}
	refresh()

	const addOperator = (operator: string) => {
		operators[operators.length] = operator
	}
	const removeOperator = () => {
		operators.length -= 1
	}

	function* iterFormula() {
		let inum = 0
		let iop = 0
		while (inum < numbersCount) {
			let n = numbers[inum].toString()
			for (; gets(BracketList)(operators[iop]) === BracketList.lparen; iop += 1)
				n = gets(BracketList)(operators[iop]) + n
			for (; gets(BracketList)(operators[iop]) === BracketList.rparen; iop += 1)
				n += gets(BracketList)(operators[iop])
			yield n

			if (inum < numbersCount - 1)
				yield gets(OperatorList)(operators[iop])?.toString() ??
					OperatorList.none.toString()

			inum += 1
			iop += 1
		}
	}
	const formula = computed(() => [...iterFormula()])

	return {
		numbers: readonly(numbers),
		operators: readonly(operators),
		formula,
		refresh,
		addOperator,
		removeOperator,
	}
}
