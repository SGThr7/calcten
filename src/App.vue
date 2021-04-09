<template>
	<div class="game-area">
		<display :operators="operators"></display>
		<controller :operators="operators.slice(1)"></controller>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Display from './components/Display.vue'
import Controller from './components/Controler.vue'

export default Vue.extend({
	components: { Display, Controller },
	computed: {
		operators: () => ['', '+', '−', '×', '÷'],
	},
})
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=New+Tegomin&display=swap&text=%2B%E2%88%92%C3%97%C3%B7%3D0123456789')

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

	font-size: min(1rem, 4vw)
	text-align: center

	display: grid
	grid-template-rows: 6fr 5fr
	place-items: center

	border: 1px solid
</style>