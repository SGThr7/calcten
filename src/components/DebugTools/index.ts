import { defineComponent, h } from 'vue'
import SceneChanger from './Parts/SceneChanger.vue'

export default defineComponent({
	name: 'DebugTools',
	render() {
		const isProduction = process.env.NODE_ENV === 'production'
		return isProduction ? [] : h(SceneChanger)
	},
})
