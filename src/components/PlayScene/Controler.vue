<template>
	<div class="controller-area button-grid" :style="styleVars">
		<template v-for="bracket in brackets">
			<key-button
				:key="bracket.id"
				:disabled="allowController"
				:bindKey="keyBind[bracket]"
				@click="add({ sign: bracket })"
			>
				{{ bracket }}
			</key-button>
		</template>
		<div class="spacer"></div>
		<key-button
			:disabled="allowController"
			:bindKey="keyBind.remove"
			@click="remove()"
		>
			←
		</key-button>
		<template v-for="op in operators">
			<key-button
				:key="op.id"
				:disabled="allowController"
				:bindKey="keyBind[op]"
				@click="add({ sign: op })"
			>
				{{ op }}
			</key-button>
		</template>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import { Bracket, Operator } from '@/modules/operator'
import { Mode } from '@/store/modules/status/play'

import KeyButton from '@/components/UIParts/Buttons/KeyButton.vue'
import { keyBind } from '@/modules/keybinding'

export default Vue.extend({
	components: { KeyButton },
	computed: {
		...mapGetters('input', ['count', 'checkResult']),
		...(mapGetters('status/play', ['status']) as { status: () => Mode }),
		allowController() {
			return this.checkResult || this.status === 'BeforePlay'
		},
		styleVars() {
			return {
				'--opsCount': 4,
			}
		},
		keyBind: () => keyBind,
		operators: () => Object.values(Operator),
		brackets: () => Object.values(Bracket),
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