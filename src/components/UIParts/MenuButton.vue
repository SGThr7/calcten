<template>
	<button class="menu-button" tabindex="0" ref="button" v-on="$listeners">
		<slot></slot>
	</button>
</template>

<style lang="sass" scoped>
.menu-button
	font-family: 'Kanit'
	font-size: 2em
	cursor: pointer

	width: 180px
	height: 60px
	// aspect-ratio: 5 / 2
	padding: 0
	border-radius: 15px

	$button-color: lightgray
	border: 6px solid $button-color
	background-color: $button-color
	transition-property: background-color
	transition-duration: .3s
	&:hover, &:focus
		background-color: transparent
</style>