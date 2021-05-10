<template>
	<div class="title-view">
		<div class="title">calc10</div>
		<div class="select-menu">
			<menu-button @click="play" bindKey="KeyP"> Play </menu-button>
			<div class="spacer"></div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

import MenuButton from '@/components/UIParts/Buttons/MenuButton.vue'

export default Vue.extend({
	components: { MenuButton },
	methods: {
		...mapActions('scene', { setScene: 'set' }),
		...mapActions('score', { setScore: 'set' }),
		play() {
			this.setScore({ score: 0 })
			this.setScene({ scene: 'Play' })
		},
	},
})
</script>

<style lang="sass" scoped>
.title-view
	height: 100%
	display: grid
	grid-template-rows: 2fr 3fr
	align-items: center

.title
	font-family: 'Balsamiq Sans'
	font-size: 5em

.select-menu
	display: grid
	grid-template-rows: repeat(1, 1fr) 1fr
	justify-content: center
</style>