<script lang="ts">
import { h, VNodeArrayChildren, defineComponent } from 'vue'
import { BracketsIter, OperatorsIter } from '@/modules/operator'
import Key from '@/components/UI/Buttons/Key.vue'

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
	},
	render() {
		const children: VNodeArrayChildren = []
		for (const bracket of BracketsIter())
			children.push(
				h(Key, { onClick: () => this.addOperator(bracket.toString()) }, () =>
					bracket.toString()
				)
			)
		children.push(
			h(
				Key,
				{ onClick: () => this.removeOperator(), class: 'remove-key' },
				() => '←'
			)
		)
		for (const operator of OperatorsIter())
			children.push(
				h(Key, { onClick: () => this.addOperator(operator.toString()) }, () =>
					operator.toString()
				)
			)
		return h('div', { class: 'controller' }, children)
	},
})
</script>

<style lang="sass" scoped>
$col-count: 4

.controller
	width: 100%

	display: grid
	grid-template-columns: repeat($col-count, 1fr)
	gap: 10px

	.remove-key
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
