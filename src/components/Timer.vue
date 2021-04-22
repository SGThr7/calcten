<template>
	<span>
		<slot
			:milliseconds="milliseconds"
			:seconds="seconds"
			:minutes="minutes"
			:hours="hours"
			:days="days"
		></slot>
	</span>
</template>

<script lang="ts">
import Vue from 'vue'

const Event = {
	start: 'start',
	end: 'end',
	abort: 'abort',
	progress: 'progress',
}
const MSSecond = 1000
const MSMinute = 60 * MSSecond
const MSHour = 60 * MSMinute
const MSDay = 24 * MSHour

export default Vue.extend({
	props: {
		time: {
			type: Number,
			validator: (val) => val >= 0,
		},
		now: {
			type: Function,
			default: function () {
				return Date.now()
			},
		},
	},
	data() {
		return {
			requestID: null as number | null,
			isCounting: false,
			totalMilliseconds: 0,
		}
	},
	computed: {
		milliseconds(): number {
			return this.totalMilliseconds % MSSecond
		},
		seconds(): number {
			return Math.floor((this.totalMilliseconds % MSMinute) / MSSecond)
		},
		minutes(): number {
			return Math.floor((this.totalMilliseconds % MSHour) / MSMinute)
		},
		hours(): number {
			return Math.floor((this.totalMilliseconds % MSDay) / MSHour)
		},
		days(): number {
			return Math.floor(this.totalMilliseconds / MSDay)
		},
		totalSeconds(): number {
			return Math.floor(this.totalMilliseconds / MSSecond)
		},
		totalMinutes(): number {
			return Math.floor(this.totalMilliseconds / MSMinute)
		},
		totalHours(): number {
			return Math.floor(this.totalMilliseconds / MSHour)
		},
		totalDays(): number {
			return Math.floor(this.totalMilliseconds / MSDay)
		},
	},
	watch: {
		$props: {
			immediate: true,
			handler() {
				this.start()
			},
		},
	},
	methods: {
		start() {
			if (this.isCounting) return

			this.$emit(Event.start)
			this.isCounting = true
			this.totalMilliseconds = this.time
			this.continue()
		},
		continue() {
			if (!this.isCounting) return

			if (this.totalMilliseconds > 0) {
				let prev: number
				const update: FrameRequestCallback = (time: number) => {
					if (!prev) prev = time

					const diff = time - prev

					if (this.totalMilliseconds - diff > 0) {
						this.$emit(Event.progress, {
							milliseconds: this.milliseconds,
							seconds: this.seconds,
							minutes: this.minutes,
							hours: this.hours,
							days: this.days,
						})
						this.totalMilliseconds -= diff
						this.requestID = requestAnimationFrame(update)
					} else {
						this.end()
					}
					prev = time
				}

				this.requestID = requestAnimationFrame(update)
			} else {
				this.end()
			}
		},
		pause() {
			if (this.requestID) {
				cancelAnimationFrame(this.requestID)
				this.requestID = null
			}
		},
		end() {
			this.pause()
			this.isCounting = false
			this.totalMilliseconds = 0
			this.$emit(Event.end)
		},
		abort() {
			if (!this.isCounting) return

			this.pause()
			this.isCounting = false
			this.$emit(Event.abort)
		},
	},
	beforeDestroy() {
		this.pause()
	},
})
</script>