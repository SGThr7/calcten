<template>
	<div class="title-view">
		<div class="title">calc10</div>
		<div class="select-menu">
			<router-link to="/play" custom v-slot="{ navigate }">
				<div
					class="menu-button"
					@click="navigate"
					@keypress.enter="navigate"
					role="link"
					tabindex="0"
				>
					Play
				</div>
			</router-link>
			<div class="spacer"></div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	//
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

.menu-button
	font-family: 'Kanit'
	font-size: 2.3em
	cursor: pointer

	width: 190px
	box-sizing: border-box
	border-radius: 15px

	$button-color: lightgray
	border: 6px solid $button-color
	background-color: $button-color

	transition-property: background-color
	transition-duration: .3s

	&:hover, &:focus
		background-color: transparent
</style>