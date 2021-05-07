<template>
	<div class="overlay">
		<template v-for="key in keys">
			<component :is="key" :key="key" class="overlay"></component>
		</template>
	</div>
</template>

<script lang="ts">
import Vue, { AsyncComponent, Component } from 'vue'

const files = require.context('.', false, /\.vue$/)
const components: Record<string, Component | AsyncComponent> = {}
for (const key of files.keys()) {
	if (key === './EffectManager.vue') continue
	const name = key.replace(/(^\.\/|\.vue$)/g, '')
	components[name] = files(key).default
}

export default Vue.extend({
	components,
	computed: {
		keys: () => Object.keys(components),
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
</style>