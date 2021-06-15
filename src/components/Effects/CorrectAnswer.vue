<template>
	<div class="correct-answer" v-show="isShow">{{ sign }}</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default Vue.extend({
	data() {
		return {
			timer: null as NodeJS.Timeout | null,
			effectTime: 1000,
		}
	},
	computed: {
		...mapGetters('input', ['checkResult']),
		isShow(): boolean {
			return this.checkResult
		},
		sign: () => '○',
	},
	methods: {
		...mapActions('score', ['scoring']),
		...mapMutations('input', ['refresh']),
	},
	watch: {
		checkResult(res) {
			if (res && this.timer === null) {
				this.scoring()

				this.timer = setTimeout(() => {
					this.refresh()
					this.timer = null
				}, this.effectTime)
			}
		},
	},
})
</script>

<style lang="sass" scoped>
.correct-answer
	font-size: 10em
	color: orangered
</style>