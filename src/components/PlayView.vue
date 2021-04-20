<template>
	<div class="play-view">
		<display></display>
		<controller></controller>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Display from '@/components/Display.vue'
import Controller from '@/components/Controler.vue'

export default Vue.extend({
	components: { Display, Controller },
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