<template>
	<div class="controller-area button-grid" :style="styleVars">
		<template v-for="bracket in bracketList">
			<div class="input-wrapper" :key="bracket.id">
				<input
					type="button"
					:value="bracket"
					class="bracket-button"
					@click="add({ sign: bracket })"
				/>
			</div>
		</template>
		<div class="empty"></div>
		<div class="input-wrapper">
			<input
				type="button"
				class="delete-button"
				value="←"
				@click="remove()"
			/>
		</div>
		<template v-for="op in opList">
			<div class="input-wrapper" :key="op.id" v-if="op">
				<input
					type="button"
					class="ops"
					:value="op"
					@click="add({ sign: op })"
				/>
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
	computed: {
		...mapGetters('input', ['count', 'opList', 'bracketList']),
		styleVars() {
			return {
				'--opsCount': 4,
			}
		},
	},
	methods: {
		...mapMutations('input', ['add', 'remove']),
	},
})
</script>

<style lang="sass" scoped>
.empty
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