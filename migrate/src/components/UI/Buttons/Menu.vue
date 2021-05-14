<template>
	<button class="menu-button" v-bind="$attrs" tabindex="0">
		<slot></slot>
	</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'MenuButton',
})
</script>

<style lang="sass" scoped>
.menu-button
	cursor: pointer
	font-family: 'Kanit', sans-serif
	font-size: 2em
	width: 100%
	max-width: 180px
	height: 60px
	border-radius: 15px

	$button-color: lightgray
	border: 6px solid $button-color
	background-color: $button-color
	transition-property: background-color
	transition-duration: .3s
	&:hover
		background-color: transparent
</style>
