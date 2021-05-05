<template>
	<div class="game-area">
		<component :is="currentScene"></component>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import Title from '@/components/TitleScene/TitleView.vue'
import Play from '@/components/PlayScene/PlayView.vue'
import Result from '@/components/ResultScene/ResultView.vue'

import { render } from '@/modules/icon'

const components = { Title, Play, Result }
type Components = typeof components

export default Vue.extend({
	components,
	computed: {
		...mapGetters('scene', ['currentSceneKey']),
		currentScene(): Components[keyof Components] {
			return components[this.currentSceneKey as keyof Components]
		},
	},
	mounted() {
		render()
	},
})
</script>

<style lang="sass">
// text memo: 0123456789(＋−×÷=)
// font-family: 'New Tegomin', serif
@import url('https://fonts.googleapis.com/css2?family=New+Tegomin&display=swap')
// font-family: 'Balsamiq Sans', cursive
@import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap&text=calc10')
// font-family: 'Kanit', sans-serif
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@600&display=swap&text=PlayResultExit')

html, body
	height: 100%
	width: 100%
	margin: 0

	user-select: none
	-webkit-user-select: none
	-moz-user-select: none
	-ms-user-select: none

body
	display: grid
	place-items: center

.game-area
	height: 100%
	width: 100%
	max-height: 500px
	max-width: 400px
	padding: 10px
	box-sizing: border-box
	position: relative

	font-size: min(1rem, 4vw)
	text-align: center

	border: 1px solid
</style>