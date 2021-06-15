<template>
	<div class="play-view">
		<status-bar @timer-end="timerEnd"></status-bar>
		<display></display>
		<controller></controller>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapMutations } from 'vuex'
import Display from '@/components/PlayScene/Display.vue'
import Controller from '@/components/PlayScene/Controler.vue'
import StatusBar from '@/components/StatusBar/index.vue'

export default Vue.extend({
	components: { Display, Controller, StatusBar },
	computed: {
		finishTime: () => 1.5 * 1000,
	},
	methods: {
		...mapActions('scene', { setScene: 'set' }),
		...mapMutations('status/play', ['finishPlay', 'beforePlay']),
		timerEnd() {
			this.finishPlay()
			const timer = setTimeout(() => {
				this.beforePlay()
				this.setScene({ scene: 'Result' })
			}, this.finishTime)
		},
	},
})
</script>

<style lang="sass" scoped>
.play-view
	height: 100%
	width: 100%
	box-sizing: border-box

	display: grid
	grid-template-rows: 6fr 5fr
	place-items: center
</style>