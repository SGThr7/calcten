<template>
	<div class="display">
		<div class="calc-area" :style="styleVars">
			<template v-for="n in numsCount - 1">
				<div class="nums" :key="n.id">{{ n }}</div>
				<div class="ops" :key="n.id">{{ ops[n] }}</div>
			</template>
			<div class="nums">{{ numsCount }}</div>
		</div>
		<div class="result-area">
			<span class="equal">=</span>
			<span class="result">10</span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data: () => ({
		numsCount: 4,
	}),
	computed: {
		styleVars() {
			return { '--numsCount': this.numsCount }
		},
		ops() {
			return this.$store.state.ops
		},
		},
	},
})
</script>

<style lang="sass" scoped>
.display
	height: 100%
	width: 100%
	display: grid
	grid-template-rows: 1.5fr 1fr
	font-family: 'New Tegomin'

.calc-area
	display: grid
	grid-template-columns: repeat(calc(var(--numCount) * 2 - 1), 1fr)
	place-items: center
	align-self: end

	.nums
		font-size: 3em

	.ops
		font-size: 2em

.result-area
	align-self: start
	padding-top: 1em

	.equal
		font-size: 2em

	.result
		font-size: 3em
</style>