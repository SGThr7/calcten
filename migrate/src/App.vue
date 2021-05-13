<template>
	<div class="game">Game Area</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'App',
})
</script>

<style lang="sass">
html, body, #app
	height: 100%
	width: 100%
	margin: 0

html
	user-select: none
	-webkit-user-select: none
	-moz-user-select: none
	-ms-user-select: none

#app
	display: flex
	justify-content: center
	align-items: center

.game
	height: 100%
	width: 100%
	max-height: 500px
	max-width: 400px
	padding: 10px
	border: 1px solid

	font-size: min(1rem, 4vw)
	text-align: center
</style>
