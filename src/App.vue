<template>
	<div class="game-area">
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Display from '@/components/PlayScene/Display.vue'
import Controller from '@/components/PlayScene/Controler.vue'

import { render } from '@/modules/icon'

export default Vue.extend({
	components: { Display, Controller },
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
@import url('https://fonts.googleapis.com/css2?family=Kanit:wght@600&display=swap&text=play')

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