<template>
	<div class="status-bar">
		<div class="timer">
			<div class="status-title">Time</div>
			<div class="timer status-value">
				<timer :time="time" v-slot="{ seconds, milliseconds }">
					<i class="far fa-clock"></i>
					{{ formatSec(seconds) }}.{{ formatMS(milliseconds) }}
				</timer>
			</div>
		</div>
		<div class="score">
			<div class="status-title">Score</div>
			<div class="score status-value">283</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Timer from '@/components/Timer.vue'

export default Vue.extend({
	components: { Timer },
	data() {
		return {
			time: 60 * 1000,
		}
	},
	methods: {
		formatSec(seconds: number) {
			return seconds.toString(10).padStart(2, '0')
		},
		formatMS(milliseconds: number) {
			return Math.floor(milliseconds / 10)
				.toString(10)
				.padEnd(2, '0')
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
	left: $padding-size
	right: $padding-size

	display: flex
	justify-content: space-between

	.status-value
		padding-top: 3px
</style>