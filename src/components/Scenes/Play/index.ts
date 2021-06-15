import { computed, defineComponent, h, onBeforeUnmount, watch } from 'vue'
import { FormulaTree } from '@/modules/formula'
import StatusBar from './Parts/StatusBar.vue'
import Display from './Parts/Display.vue'
import Controller from './Parts/Controller.vue'
import manageFormula from './manageFormula'
import style from './play.module.sass'
import { useStore } from '@/store'

export default defineComponent({
	name: 'Play',
	setup() {
		const store = useStore()

		const {
			formula,
			refresh,
			addOperator,
			removeOperator,
			allowAddOperator: _allowAddOperator,
			isInputFinish,
		} = manageFormula(4, 10)

		const formulaTree = computed(() =>
			FormulaTree.fromIN(formula.value.join(''))
		)
		store.commit('pushFormula', { formula: formulaTree.value })
		const result = computed(() => formulaTree.value.calculate())
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
						store.commit('popFormula')
						store.commit('pushFormula', { formula: formulaTree.value })
						refresh()
						store.commit('pushFormula', { formula: formulaTree.value })
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
