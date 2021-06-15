<template>
	<div class="finish" v-show="isShow">Finish!</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Mode } from '@/store/modules/status/play'

export default Vue.extend({
	computed: {
		...(mapGetters('status/play', ['status']) as { status: () => Mode }),
		isShow() {
			return this.status === 'Finish'
		},
	},
})
</script>

<style lang="sass" scoped>
.finish
	font-family: 'Kanit'
	font-size: 3em
</style>