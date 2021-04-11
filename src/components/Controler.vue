<template>
	<div class="controller-area" :style="styleVars">
		<template v-for="op in opsSample">
			<div class="input-wrapper" :key="op.id">
				<input type="button" class="ops" :value="op" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	computed: {
		styleVars() {
			return {
				'--opsCount': 4,
			}
		},
		opsSample() {
			return this.$store.state.opsSample.slice(1)
		},
	},
})
</script>

<style lang="sass" scoped>
.controller-area
	height: 100%
	width: 100%
	display: grid
	grid-template-columns: repeat(var(--opsCount), 1fr)
	place-items: center

	.input-wrapper
		width: 80%
		position: relative

		&::before
			content: ""
			display: block
			padding-top: 100%

		input.ops
			height: 100%
			width: 100%
			position: absolute
			top: 0
			left: 0
			-webkit-appearance: none
			font-size: 2em
			padding: 0
</style>