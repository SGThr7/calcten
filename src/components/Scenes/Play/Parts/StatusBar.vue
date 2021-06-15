<template>
	<div :class="$style.status_bar">
		<menu-button :class="$style.exit" @click="exit">Finish</menu-button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import MenuButton from '@/components/UI/Buttons/Menu.vue'

export default defineComponent({
	name: 'StatusBar',
	components: { MenuButton },
	setup() {
		const store = useStore()
		const exit = () => {
			store.commit('setScene', { scene: 'Result' })
		}

		return {
			exit,
		}
	},
})
</script>

<style lang="sass" module>
.status_bar
	width: 100%
	display: flex
	justify-content: space-between

.exit
	// height: 25px
	// width: 50px
	// padding: 0
	border-width: 3px !important
	border-radius: 7px !important
</style>
