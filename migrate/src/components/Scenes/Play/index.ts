import { computed, defineComponent, h } from 'vue'
import { FormulaTree } from '@/modules/calculate'
import manageFormula from './Formula'
import './play.sass'

export default defineComponent({
	name: 'Play',
	setup() {
		const { formula, refresh, addOperator } = manageFormula(4)
		addOperator('(')
		addOperator('+')
		addOperator('*')
		addOperator(')')
		const ftree = computed(() => new FormulaTree(formula.value.join('')))

		return () =>
			h('div', { class: 'play' }, [
				ftree.value.toINString(' '),
				'=',
				ftree.value.calculate(),
				h('div', { onClick: refresh }, 'refresh'),
			])
	},
})
