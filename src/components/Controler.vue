<template>
	<div class="controller-area button-grid" :style="styleVars">
		<template v-for="bracket in bracketList">
			<key-button
				:key="bracket.id"
				:label="bracket"
				:disabled="checkResult"
				:bindKey="KeyBindings[bracket]"
				@click="add({ sign: bracket })"
			></key-button>
		</template>
		<div class="spacer"></div>
		<key-button
			label="←"
			:disabled="checkResult"
			:bindKey="KeyBindings.remove"
			@click="remove()"
		></key-button>
		<template v-for="op in opList">
			<key-button
				:key="op.id"
				:label="op"
				:disabled="checkResult"
				:bindKey="KeyBindings[op]"
				@click="add({ sign: op })"
			></key-button>
		</template>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import { KeyBindings } from '@/modules/keybinding'
import KeyButton from '@/components/KeyButton.vue'

export default Vue.extend({
	components: { KeyButton },
	computed: {
		...mapGetters('input', ['count', 'opList', 'bracketList', 'checkResult']),
		styleVars() {
			return {
				'--opsCount': 4,
			}
		},
		KeyBindings: () => KeyBindings,
	},
	methods: {
		...mapMutations('input', ['add', 'remove']),
	},
})
</script>

<style lang="sass" scoped>
.spacer
	grid-column: 3 / span calc(var(--opsCount) - 3)

.controller-area
	width: 100%

	display: grid
	grid-template-columns: repeat(var(--opsCount), 1fr)
	place-items: center
	--gap-size: 10px
	grid-gap: var(--gap-size)
	gap: var(--gap-size)

	.delete-button
		align-self: end

	.input-wrapper
		width: 100%
		position: relative

		&::before
			content: ""
			display: block
			padding-top: 100%

	input
		height: 100%
		width: 100%
		position: absolute
		top: 0
		left: 0
		-webkit-appearance: none
		font-size: 2em
		padding: 0
</style>