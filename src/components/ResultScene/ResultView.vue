<template>
	<div class="result-view">
		<div class="title">Result</div>
		<div class="score">
			<label for="val-score">Score</label>
			<span class="value" id="val-score">{{ score }}</span>
		</div>
		<menu>
			<menu-button @click="exit" bindKey="KeyE"> Exit </menu-button>
		</menu>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import MenuButton from '@/components/UIParts/MenuButton.vue'

export default Vue.extend({
	components: { MenuButton },
	computed: {
		...mapGetters('score', ['score']),
	},
	methods: {
		...mapActions('scene', { setScene: 'set' }),
		exit() {
			this.setScene({ scene: 'Title' })
		},
	},
})
</script>

<style lang="sass" scoped>
.result-view
	height: 100%
	width: 100%
	display: flex
	flex-direction: column
	justify-content: space-around

.title
	font-family: 'Kanit', sans-serif
	font-size: 3em

label
	&::after
		content: ": "

menu
	padding: 0
</style>