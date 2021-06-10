import { computed, defineComponent, h, onBeforeUnmount, watch } from 'vue'
import { FormulaTree } from '@/modules/formula'
import StatusBar from './Parts/StatusBar.vue'
import Display from './Parts/Display.vue'
import Controller from './Parts/Controller.vue'
import manageFormula from './manageFormula'
import style from './play.module.sass'

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
			h('div', { class: style.play }, [
				h(StatusBar),
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
