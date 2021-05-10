<template>
	<div class="status-bar">
		<div class="timer">
			<div class="status-title">Time</div>
			<div class="timer status-value">
				<timer
					ref="timer"
					:time="time"
					v-model="timerMethods"
					v-slot="{ totalSeconds, milliseconds }"
					@start="$emit('timer-start')"
					@end="$emit('timer-end')"
				>
					<i class="far fa-clock"></i>
					{{ formatSec(totalSeconds) }}.{{ formatMS(milliseconds) }}
				</timer>
			</div>
		</div>
		<div class="score">
			<div class="status-title">Score</div>
			<div class="score status-value">
				{{ animatedScore }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import Timer from '@/components/Helpers/Timer.vue'
import gsap from 'gsap'

export default Vue.extend({
	components: { Timer },
	data() {
		return {
			time: 60 * 1000,
			tmpScore: 0,
			timerMethods: {} as Record<string, () => void>,
		}
	},
	computed: {
		...mapGetters('score', ['score']),
		...mapGetters('status/play', {
			playStatus: 'status',
		}),
		animatedScore(): string {
			return this.tmpScore.toFixed(0)
		},
	},
	methods: {
		...mapActions('score', {
			addScore: 'add',
		}),
		formatSec(seconds: number) {
			return seconds.toString(10).padStart(2, '0')
		},
		formatMS(milliseconds: number) {
			return Math.floor(milliseconds / 10)
				.toString(10)
				.padEnd(2, '0')
		},
	},
	watch: {
		score(newVal) {
			gsap.to(this.$data, { duration: 0.5, tmpScore: newVal })
		},
		playStatus(newVal) {
			if (newVal === 'Playing') {
				this.timerMethods.start()
			}
		},
	},
})
</script>

<style lang="sass" scoped>
.status-bar
	position: absolute
	z-index: 1
	box-sizing: border-box
	$padding-size: 10px
	top: $padding-size
	left: $padding-size
	right: $padding-size

	display: flex
	justify-content: space-between

	.status-value
		padding-top: 3px
</style>