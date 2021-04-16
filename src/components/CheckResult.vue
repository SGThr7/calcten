<template>
	<div class="overlay check-result" v-show="checkResult">◯</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
	computed: {
		...mapGetters('input', ['checkResult']),
	},
})
</script>

<style lang="sass" scoped>
.overlay
	position: absolute
	height: 100%
	width: 100%
	display: flex
	justify-content: center
	align-items: center

.check-result
	font-size: 10em
	color: orangered
</style>