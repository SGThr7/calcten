<template>
	<div class="display">
		<div class="calc-area" :style="styleVars">
			<template v-for="n in numsCount - 1">
				<div class="nums" :key="n.id">{{ nums[n - 1] }}</div>
				<div class="ops" :key="n.id">{{ opsSample[ops[n - 1]] }}</div>
			</template>
			<div class="nums">{{ nums[numsCount - 1] }}</div>
		</div>
		<div class="result-area">
			<span class="equal">=</span>
			<span class="result">{{ result }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	data: () => ({
		numsCount: 4,
		nums: [] as number[],
	}),
	computed: {
		styleVars() {
			return { '--numsCount': this.numsCount }
		},
		ops() {
			return this.$store.state.ops
		},
		opsSample() {
			return this.$store.state.opsSample
		},
		opsFunc() {
			return this.$store.state.opsFunc
		},
		result() {
			let res = this.nums[0]
			for (let i = 1; i < this.numsCount; i++) {
				res = this.opsFunc[this.ops[i - 1] ?? 0](res, this.nums[i])
			}
			return res
		},
	},
	methods: {
		refreshNums(numsCount: number): void {
			let res = []
			for (let i = 0; i < numsCount; i++) {
				res[i] = Math.floor(Math.random() * 10)
			}
			this.nums = res
		},
		inputOps(operatorID: number) {
			return this.$store.commit('inputOps', operatorID)
		},
	},
	created() {
		this.refreshNums(this.numsCount)
		this.inputOps(1)
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
	grid-template-columns: repeat(calc(var(--numsCount) * 2 - 1), 1fr)
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