<template>
	<div class="game-area">
		<display></display>
		<controller></controller>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Display from './components/Display.vue'
import Controller from './components/Controler.vue'

export default Vue.extend({
	components: { Display, Controller },
})
</script>

<style lang="sass">
// text memo: 0123456789(＋−×÷=)
@import url('https://fonts.googleapis.com/css2?family=New+Tegomin&display=swap')

html, body
	height: 100%
	width: 100%
	margin: 0

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

	font-size: min(1rem, 4vw)
	text-align: center

	display: grid
	grid-template-rows: 6fr 5fr
	place-items: center

	border: 1px solid
</style>