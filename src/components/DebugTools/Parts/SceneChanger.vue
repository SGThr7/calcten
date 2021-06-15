<script lang="ts">
import { defineComponent, h, VNode } from 'vue'
import { useStore } from '@/store'
import { components, Scene } from '@/components/Scenes'
import BaseButton from '@/components/UI/Buttons/Base.vue'
import { Key } from '@/modules/keyBind'

export default defineComponent({
	render() {
		const store = useStore()
		return h(
			'div',
			Object.keys(components).reduce(
				(ar, key) =>
					ar.concat(
						h(
							BaseButton,
							{
								onClick: () =>
									store.commit('setScene', { scene: key as Scene }),
								bindKey: new Key('Key' + key[0], { shiftKey: true }),
							},
							() => key
						)
					),
				[] as VNode[]
			)
		)
	},
})
</script>
