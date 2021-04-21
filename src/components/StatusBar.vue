<template>
	<div class="status-bar">
		<div class="timer">
			<div class="status-title">Time</div>
			<div class="timer status-value">
				<i class="far fa-clock"></i> 41.20
			</div>
		</div>
		<div class="score">
			<div class="status-title">Score</div>
			<div class="score status-value">283</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	//
})
</script>

<style lang="sass" scoped>
.status-bar
	position: absolute
	box-sizing: border-box
	$padding-size: 10px
	left: $padding-size
	right: $padding-size

	display: flex
	justify-content: space-between

	.status-value
		padding-top: 3px
</style>