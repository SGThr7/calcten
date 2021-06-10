<template>
	<div :class="$style.title">
		<div :class="$style.title_text">calc10</div>
		<div :class="$style.menu">
			<menu-button @click="play" :bindKey="playKey">
				<span :class="$style.underline">P</span>lay
			</menu-button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { Key } from '@/modules/keyBind'
import MenuButton from '@/components/UI/Buttons/Menu.vue'

export default defineComponent({
	name: 'Title',
	components: { MenuButton },
	setup() {
		const store = useStore()
		const play = () => {
			store.commit('setScene', { scene: 'Play' })
		}
		const playKey = new Key('KeyP')

		return {
			play,
			playKey,
		}
	},
})
</script>

<style lang="sass" module>
.title
	display: grid
	grid-template-rows: 1fr 3fr
	align-items: center

	.title_text
		font-family: 'Balsamiq Sans'
		font-size: 5em

.menu > button
	font-size: 2em
	width: 100%
	max-width: 180px
	height: 60px

.underline
	text-decoration: underline
</style>
