<template>
	<div class="title">
		<div class="title-text">calc10</div>
		<div class="menu">Play</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Title',
})
</script>

<style lang="sass" scoped>
.title
	height: 100%
	display: grid
	grid-template-rows: 1fr 3fr
	align-items: center

	.title-text
		font-family: 'Balsamiq Sans'
		font-size: 5em
</style>
