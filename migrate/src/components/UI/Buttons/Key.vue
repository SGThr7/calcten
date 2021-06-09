<template>
	<base-button :class="$style.button" v-bind="$attrs" :bindKey="bindKey">
		<span :class="$style.bind">{{ bindKey?.toString() }}</span>
		<slot></slot>
	</base-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Key } from '@/modules/keyBind'
import BaseButton from './Base.vue'

export default defineComponent({
	name: 'KeyButton',
	components: { BaseButton },
	props: {
		bindKey: {
			type: Key,
			required: false,
		},
	},
})
</script>

<style lang="sass" module>
.button
	position: relative

	&:disabled > .bind
		color: rgba(128, 128, 128, 0.3)

.bind
	position: absolute
	$pad: 3px
	right: $pad
	top: $pad
	color: #808080
	font-size: 0.8em
</style>
