<template>
	<button v-bind="$attrs">
		<slot></slot>
	</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Key } from '@/modules/keyBind'

export default defineComponent({
	name: 'BaseButton',
	props: {
		bindKey: {
			type: Key,
			required: false,
		},
	},
	data() {
		return {
			keyStr: '',
		}
	},
	computed: {
		button(): HTMLButtonElement {
			return this.$el as HTMLButtonElement
		},
	},
	watch: {
		bindKey(v) {
			this.keyStr = v.code
		},
	},
	methods: {
		keyHandler(event: KeyboardEvent) {
			if (this.bindKey?.cmp(event)) this.button.click()
		},
	},
	mounted() {
		window.addEventListener('keydown', this.keyHandler)
	},
	unmounted() {
		window.removeEventListener('keydown', this.keyHandler)
	},
})
</script>
