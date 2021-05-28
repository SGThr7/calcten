<script lang="ts">
import { FormulaTree } from '@/modules/calculate'
import { computed, defineComponent, h, PropType, useCssModule } from 'vue'

export default defineComponent({
	name: 'Display',
	props: {
		formula: {
			type: Array as PropType<string[]>,
			required: true,
		},
	},
	setup(props) {
		const style = useCssModule()
		const result = computed(() =>
			FormulaTree.fromIN(props.formula.join('')).calculate()
		)
		return () =>
			h('div', { class: style.display }, [
				h(
					'div',
					{ class: style.formula },
					props.formula.map((v, i) =>
						h(
							'div',
							{
								class: i % 2 === 0 ? style.num : style.op,
							},
							v
						)
					)
				),
				h('div', { class: style.result }, ['=', result.value]),
			])
	},
})
</script>

<style lang="sass" module>
.display
	height: 100%
	width: 100%
	font-family: 'New Tegomin'
	display: grid
	grid-template-rows: 2fr 1fr

	.formula
		align-self: end
		display: grid
		grid-auto-flow: column
		grid-auto-columns: 1fr
		align-items: baseline

		.num
			font-size: 3em

		.op
			font-size: 2em

	.result
		font-size: 2em
		padding-top: .5em
</style>
