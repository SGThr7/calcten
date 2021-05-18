import { computed, defineComponent, h } from 'vue'
import { FormulaTree } from '@/modules/calculate'
import Controller from './Controller.vue'
import manageFormula from './Formula'
import './play.sass'

export default defineComponent({
	name: 'Play',
	components: { Controller },
	setup() {
		const { formula, refresh, addOperator, removeOperator, allowAddOperator } =
			manageFormula(4)
		const ftree = computed(() => FormulaTree.fromIN(formula.value.join('')))

		return () =>
			h('div', { class: 'play' }, [
				h('div', [
					formula.value,
					'=',
					ftree.value.calculate(),
					h('div', { onClick: refresh }, 'refresh'),
				]),
				h(Controller, { addOperator, removeOperator, allowAddOperator }),
			])
	},
})
