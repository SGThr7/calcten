<template>
	<div class="wrapper">
		<input
			type="button"
			class="key"
			:value="label"
			:disabled="disabled"
			@click="clickHandler"
		/>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Key } from '@/modules/keybinding'

export default Vue.extend({
	props: {
		label: {
			type: String,
			required: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		bindKey: {
			type: Key,
			required: false,
		},
	},
	methods: {
		clickHandler(event: MouseEvent) {
			this.$emit('click', event)
		},
		keyHandler(event: KeyboardEvent) {
			if (this.bindKey?.cmpEvent(event)) {
				this.$el.querySelector<HTMLInputElement>('input.key')?.click()
			}
		},
	},
	mounted() {
		window.addEventListener('keypress', this.keyHandler)
	},
	beforeDestroy() {
		window.addEventListener('keypress', this.keyHandler)
	},
})
</script>

<style lang="sass" scoped>
.wrapper
	width: 100%
	position: relative

	&::before
		content: ""
		display: block
		padding-top: 100%

	.key
		height: 100%
		width: 100%
		-webkit-appearance: none
		position: absolute
		top: 0
		left: 0

		font-size: 2em
</style>