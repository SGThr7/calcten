<template>
	<div class="title">
		<div class="title-text">calc10</div>
		<div class="menu">
			<menu-button @click="play">Play</menu-button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useStore } from '@/store'
import MenuButton from '@/components/UI/Buttons/Menu.vue'

export default defineComponent({
	name: 'Title',
	components: { MenuButton },
	setup() {
		const store = useStore()
		const play = () => {
			store.commit('setScene', { scene: 'Play' })
		}

		return {
			play,
		}
	},
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
