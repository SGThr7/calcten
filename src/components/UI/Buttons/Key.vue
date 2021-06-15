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
	font-family: 'New Tegomin', serif
	font-size: 2rem

	&:disabled > .bind
		color: rgba(128, 128, 128, 0.3)

.bind
	position: absolute
	top: 0
	right: 3px
	color: #808080
	font-family: sans-serif
	font-size: 0.7rem
</style>
