<template>
	<div class="overlay check-result" v-show="checkResult">◯</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

export default Vue.extend({
	data() {
		return {
			timer: null,
		}
	},
	computed: {
		...mapGetters('input', ['checkResult']),
	},
	methods: {
		...mapMutations('input', ['refresh']),
	},
	watch: {
		checkResult(res) {
			if (res && this.timer === null) {
				this.timer = setTimeout(() => {
					this.refresh()
					this.timer = null
				}, 1000)
			}
		},
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