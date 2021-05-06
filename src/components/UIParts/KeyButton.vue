<template>
	<div class="wrapper">
		<r-button class="key" v-on="$listeners" v-bind="$attrs">
			<slot></slot>
		</r-button>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import RButton from '@/components/UIParts/RootButton.vue'

export default Vue.extend({
	components: { RButton },
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