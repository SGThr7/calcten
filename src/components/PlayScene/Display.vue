<template>
	<div class="display">
		<div class="main" v-show="isShow">
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
			<div class="result-area">
				<span class="equal">=</span>
				<span class="result">{{ Math.floor(result * 100) / 100 }}</span>
			</div>
		</div>
		<effects></effects>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import { Mode } from '@/store/modules/status/play'

import Effects from '@/components/Effects/EffectManager.vue'

export default Vue.extend({
	components: { Effects },
	computed: {
		...mapGetters('input', ['count', 'formula', 'result', 'checkResult']),
		...(mapGetters('status/play', {
			playStatus: 'status',
		}) as { playStatus: () => Mode }),
		styleVars(): Record<string, any> {
			return { '--numsCount': this.count }
		},
		isShow() {
			return this.playStatus !== 'BeforePlay'
		},
	},
	methods: {
		...mapMutations('input', ['refresh']),
	},
	created() {
		this.refresh()
	},
})
</script>

<style lang="sass" scoped>
.display, .main
	height: 100%
	width: 100%

.display
	font-family: 'New Tegomin'
	position: relative

.main
	display: grid
	grid-template-rows: 1.5fr 1fr

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