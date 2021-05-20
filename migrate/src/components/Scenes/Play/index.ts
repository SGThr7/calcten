import { computed, defineComponent, h, onBeforeUnmount, watch } from 'vue'
import { FormulaTree } from '@/modules/calculate'
import Controller from './Controller.vue'
import manageFormula from './Formula'
import './play.sass'

export default defineComponent({
	name: 'Play',
	components: { Controller },
	setup() {
		const {
			formula,
			refresh,
			addOperator,
			removeOperator,
			allowAddOperator: _allowAddOperator,
			isInputFinish,
		} = manageFormula(4)
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
				h('div', [
					formula.value,
					'=',
					result.value,
					h('div', { onClick: refresh }, 'refresh'),
				]),
				h(Controller, {
					addOperator,
					removeOperator,
					allowAddOperator,
				}),
			])
	},
})
