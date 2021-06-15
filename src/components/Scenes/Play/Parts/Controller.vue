<script lang="ts">
import { h, VNodeArrayChildren, defineComponent, useCssModule } from 'vue'
import { Brackets, Operators } from '@/modules/operator'
import { keyBind } from '@/modules/keyBind'
import KeyButton from '@/components/UI/Buttons/Key.vue'

export default defineComponent({
	name: 'Controller',
	props: {
		addOperator: {
			type: Function,
			required: true,
		},
		removeOperator: {
			type: Function,
			required: true,
		},
		allowAddOperator: {
			type: Function,
			default: () => true,
		},
	},
	render() {
		const style = useCssModule()
		const children: VNodeArrayChildren = []
		for (const bracket of Brackets)
			children.push(
				h(
					KeyButton,
					{
						onClick: () => this.addOperator(bracket.toString()),
						disabled: !this.allowAddOperator(bracket.toString()),
						bindKey: keyBind.list[bracket.toString()],
					},
					() => bracket.toString()
				)
			)
		children.push(
			h(
				KeyButton,
				{
					onClick: () => this.removeOperator(),
					class: style.remove_key,
					disabled: !this.allowAddOperator(),
					bindKey: keyBind.list.remove,
				},
				() => '←'
			)
		)
		for (const operator of Operators)
			children.push(
				h(
					KeyButton,
					{
						onClick: () => this.addOperator(operator.toString()),
						disabled: !this.allowAddOperator(operator.toString()),
						bindKey: keyBind.list[operator.toString()],
					},
					() => operator.toSymbol()
				)
			)
		return h('div', { class: style.controller }, children)
	},
})
</script>

<style lang="sass" module>
$col-count: 4

.controller
	width: 100%

	display: grid
	grid-template-columns: repeat($col-count, 1fr)
	gap: 10px

	.remove_key
		grid-column: $col-count

// square grid
.controller
	grid-auto-rows: 1fr

	&::before
		content: ' '
		width: 0
		grid-row: 1 / 1
		grid-column: 1 / 1
		padding-bottom: 100%

	& > *:first-child
		grid-row: 1 / 1
		grid-column: 1 / 1
</style>
