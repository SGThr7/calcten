<template>
	<div class="overlay check-result" v-show="checkResult">◯</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { isOperator, Operator, OpList } from '@/modules/operator'

export default Vue.extend({
	data() {
		return {
			timer: null as NodeJS.Timeout | null,
		}
	},
	computed: {
		...mapGetters('input', ['checkResult', 'ops', 'count']),
	},
	methods: {
		...mapMutations('input', ['refresh']),
		...mapActions('score', { addScore: 'add' }),
		scoring() {
			/// # Score Table

			/**
			 * ## Base score
			 *
			 * Base score is defined below.
			 * Therefore, make10 use 4 numbers and 3 operators,
			 * so base score is 30.
			 */
			const baseScore = (this.count - 1) * 10
			this.addScore({ score: baseScore })

			/// ## Bonus score
			const ops = new Set(this.ops.filter((op: unknown) => isOperator(op)))

			/**
			 * ### Include division operator
			 *
			 * ```
			 * 	Division bonus = <base score> * 0.5
			 * ```
			 * Division operator is not easy to use.
			 * So if the formula includes division operator,
			 * get a bonus score that half the base score.
			 */
			const divisionBonus = baseScore * 0.5
			if (ops.has(Operator.div)) this.addScore({ score: divisionBonus })

			/**
			 * ### Use all operators
			 *
			 * ```
			 * 	All operators bonus = <base score> * 0.2
			 * ```
			 * Used all operators formula is beautiful.
			 * So get a bonus 0.2 base score.
			 */
			const allOperatorsBonus = baseScore * 0.2
			const nkind = Math.min(this.count - 1, OpList.length)
			if (ops.size >= nkind) this.addScore({ score: allOperatorsBonus })
		},
	},
	watch: {
		checkResult(res) {
			if (res && this.timer === null) {
				this.scoring()

				this.timer = setTimeout(() => {
					this.refresh()
					this.timer = null
				}, 1000)
			}
		},
	},
})
</script>

<style lang="sass" scoped>
.overlay
	position: absolute
	height: 100%
	width: 100%
	display: flex
	justify-content: center
	align-items: center

.check-result
	font-size: 10em
	color: orangered
</style>