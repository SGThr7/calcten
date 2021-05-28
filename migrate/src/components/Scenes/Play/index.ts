import { computed, defineComponent, h, onBeforeUnmount, watch } from 'vue'
import { FormulaTree } from '@/modules/calculate'
import Display from './Display.vue'
import Controller from './Controller.vue'
import manageFormula from './manageFormula'
import './play.sass'

export default defineComponent({
	name: 'Play',
	setup() {
		const {
			formula,
			refresh,
			addOperator,
			removeOperator,
			allowAddOperator: _allowAddOperator,
			isInputFinish,
		} = manageFormula(4, 10)
		const result = computed(() =>
			FormulaTree.fromIN(formula.value.join('')).calculate()
		)
		const correctResult = computed<boolean>(
			() => isInputFinish.value && result.value === 10
		)
		const allowAddOperator = (operator: string) =>
			_allowAddOperator(operator) && !correctResult.value

		// correct effect
		let timer: number | null = null
		const stop = watch(correctResult, (isCorrect) => {
			if (isCorrect) {
				if (timer === null)
					timer = setTimeout(() => {
						refresh()
						timer = null
					}, 1000)
			}
		})

		onBeforeUnmount(() => {
			stop()
		})

		return () =>
			h('div', { class: 'play' }, [
				h(Display, {
					formula: formula.value,
				}),
				h(Controller, {
					addOperator,
					removeOperator,
					allowAddOperator,
				}),
			])
	},
})
