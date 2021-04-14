<template>
	<div class="display">
		<div class="calc-area" :style="styleVars">
			<template v-for="(token, i) in formula">
				<div class="nums" :key="token.id" v-if="i % 2 === 0">
					{{ token }}
				</div>
				<div class="ops" :key="token.id" v-if="i % 2 === 1">
					{{ token }}
				</div>
			</template>
		</div>
		<div class="answer-area">
			<span class="equal">=</span>
			<span class="answer">{{ answer }}</span>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
	data: () => ({
		nums: [] as number[],
	}),
	computed: {
		...mapGetters('input', {
			numsCount: 'count',
			formula: 'formula',
			answer: 'answer',
		}),
		styleVars() {
			return { '--numsCount': this.numsCount }
		},
	},
	methods: {
		...mapMutations('input', ['refresh']),
		refreshNums(numsCount: number): void {
			let res = []
			for (let i = 0; i < numsCount; i++) {
				res[i] = Math.floor(Math.random() * 10)
			}
			this.nums = res
		},
		setOpID(operatorID: number) {
			return this.$store.commit('setOpID', operatorID)
		},
		toRPN(nums: number[], ops: string[]) {
			const rpn: (number | string)[] = []
			const opStack: string[] = []
			const opspart = (op: string) => {
				const lastStack = opStack[opStack.length - 1]
				if (
					lastStack &&
					this.opsData[lastStack].priority >= this.opsData[op].priority
				) {
					rpn.push(opStack.pop())
					opspart(op)
				} else {
					opStack.push(op)
				}
			}
			for (let i = 0; i < this.inputOpsCount; i++) {
				// nums part
				rpn.push(nums[i])
				// ops part
				opspart(ops[i] ?? '')
			}
			// last num
			rpn.push(nums[this.inputOpsCount])
			while (opStack.length > 0) {
				rpn.push(opStack.pop())
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
		this.refresh()
		this.refreshNums(this.numsCount)
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

.answer-area
	align-self: start
	padding-top: 1em

	.equal
		font-size: 2em

	.answer
		font-size: 3em
</style>