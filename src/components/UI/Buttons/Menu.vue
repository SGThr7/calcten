<template>
	<base-button :class="$style.menu_button" v-bind="$attrs" tabindex="0">
		<slot></slot>
	</base-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseButton from './Base.vue'

export default defineComponent({
	name: 'MenuButton',
	components: { BaseButton },
})
</script>

<style lang="sass" module>
.menu_button
	cursor: pointer
	font-family: 'Kanit', sans-serif
	border-radius: 15px
	padding: 0 1.5ex

	$button-color: lightgray
	border: 6px solid $button-color
	background-color: $button-color
	transition-property: background-color
	transition-duration: .3s
	&:hover
		background-color: transparent
</style>

<style lang="sass" scoped>
.underline::first-letter
	text-decoration: underline
</style>
