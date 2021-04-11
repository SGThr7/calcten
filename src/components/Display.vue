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
		nums: [] as number[],
	}),
	computed: {
		numsCount() {
			return this.$store.state.opsCount + 1
		},
		styleVars() {
			return { '--numsCount': this.numsCount }
		},
		ops() {
			return this.$store.state.ops
		},
		opsString() {
			return this.$store.getters.opsString
		},
		opsLimit() {
			return this.$store.state.opsCount
		},
		opsData() {
			return this.$store.state.opsData
		},
		opsSample() {
			return this.$store.state.opsSample
		},
		opsFunc() {
			return this.$store.state.opsFunc
		},
		result() {
			const rpn = this.toRPN(this.nums, this.opsString)
			const res = this.calcRPN(rpn)
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
		toRPN(nums: number[], ops: string[]) {
			const rpn: (number | string)[] = []
			const opstack: string[] = []
			const opspart = (op: string) => {
				const lastStack = opstack[opstack.length - 1]
				if (
					lastStack &&
					this.opsData[lastStack].priority >= this.opsData[op].priority
				) {
					rpn.push(opstack.pop())
					opspart(op)
				} else {
					opstack.push(op)
				}
			}
			for (let i = 0; i < this.opsLimit; i++) {
				// nums part
				rpn.push(nums[i])
				// ops part
				opspart(ops[i] ?? '')
			}
			// last num
			rpn.push(nums[this.opsLimit])
			while (opstack.length > 0) {
				rpn.push(opstack.pop())
			}
			return rpn
		},
		calcRPN(rpn: (number | string)[]) {
			const stack: number[] = []
			for (let i = 0; i < rpn.length; i++) {
				const tmp = rpn[i]
				if (typeof tmp === 'number') {
					stack.push(tmp)
				} else if (typeof tmp === 'string') {
					const func = this.opsData[tmp].func
					const rhs = stack.pop()
					const lhs = stack.pop()
					const ans = func(lhs, rhs)
					stack.push(ans)
				}
			}
			return stack.pop()
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