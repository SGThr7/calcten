<template>
	<div class="countdown" v-show="isShow">
		<timer
			:time="time"
			:autoStart="true"
			@end="countdownEnd"
			v-slot="{ totalSeconds }"
			v-show="isShow"
		>
			{{ formatSec(totalSeconds) }}
		</timer>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'

import Timer from '@/components/Helpers/Timer.vue'

export default Vue.extend({
	components: { Timer },
	data() {
		return {
			time: 3 * 1000 - 1,
			isShow: true,
		}
	},
	methods: {
		...mapMutations('status/play', ['startPlay']),
		startGame(): void {
			this.startPlay()
		},
		formatSec(seconds: number): number {
			return seconds + 1
		},
		countdownEnd() {
			this.isShow = false
			this.startGame()
		},
	},
})
</script>

<style lang="sass" scoped>
.countdown
	font-family: 'Kanit'
	font-size: 4em
</style>