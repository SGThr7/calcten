<template>
	<div class="game">
		<component :is="'Title'"></component>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Title from '@/components/Scenes/Title.vue'

export default defineComponent({
	name: 'App',
	components: { Title },
})
</script>

<style lang="sass">
// font-family: 'Balsamiq Sans', cursive
// font-family: 'Kanit', sans-serif
// font-family: 'New Tegomin', serif

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
