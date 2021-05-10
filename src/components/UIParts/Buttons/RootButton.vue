<template>
	<button ref="el" v-on="$listeners" v-bind="$attrs" tabindex="0">
		<slot></slot>
	</button>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Key } from '@/modules/keybinding'

export default Vue.extend({
	props: {
		bindKey: {
			type: [Key, String] as PropType<Key | string>,
			required: false,
		},
	},
	computed: {
		key(): Key | null {
			if (this.bindKey instanceof Key) {
				return this.bindKey
			} else if (typeof this.bindKey === 'string') {
				return new Key(this.bindKey)
			}
			return null
		},
	},
	methods: {
		keyHandler(event: KeyboardEvent) {
			if (this.key?.cmpEvent(event)) {
				const bt = this.$refs.el as HTMLButtonElement
				bt.click()
			}
		},
	},
	mounted() {
		window.addEventListener('keypress', this.keyHandler)
	},
	beforeDestroy() {
		window.removeEventListener('keypress', this.keyHandler)
	},
})
</script>