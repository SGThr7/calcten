<template>
	<preload-font :textList="textList"></preload-font>
	<div :class="$style.game">
		<component :is="scene"></component>
	</div>
	<debug-tools></debug-tools>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import { components } from '@/components/Scenes'
import DebugTools from '@/components/DebugTools'
import PreloadFont, { TextList } from '@/components/PreloadFont'

export default defineComponent({
	name: 'App',
	components: {
		DebugTools,
		PreloadFont,
		...components,
	},
	setup() {
		const store = useStore()

		const scene = computed(() => store.getters.scene)

		const textList: TextList = [
			{
				font: 'New Tegomin',
				text: '0123456789_＿+＋-−×÷()=',
			},
			{
				font: 'Balsamiq Sans',
				text: 'calc10',
			},
			{
				font: 'Kanit',
				text: 'Play Finish Exit Result GotFormulas',
			},
		]

		return {
			scene,
			textList,
		}
	},
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
	flex-direction: column
</style>

<style lang="sass" module>
.game
	height: 100%
	width: 100%
	max-height: 500px
	max-width: 400px
	padding: 10px
	border: 1px solid

	font-size: min(1rem, 4vw)
	text-align: center

	& > *
		height: 100%
</style>
