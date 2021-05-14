<template>
	<button v-bind="$attrs">
		<slot></slot>
	</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'BaseButton',
	props: {
		bindKey: {
			type: String,
			required: false,
		},
	},
})
</script>
