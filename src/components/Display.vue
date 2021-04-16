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
			<span class="answer">{{ Math.floor(answer * 100) / 100 }}</span>
		</div>
		<div class="overlay check-result" v-show="checkResult">◯</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
	computed: {
		...mapGetters('input', ['count', 'formula', 'answer', 'checkResult']),
		styleVars() {
			return { '--numsCount': this.count }
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
.display
	height: 100%
	width: 100%
	display: grid
	grid-template-rows: 1.5fr 1fr
	font-family: 'New Tegomin'
	position: relative

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