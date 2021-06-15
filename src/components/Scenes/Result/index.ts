import { defineComponent, h } from 'vue'
import { useStore } from '@/store'
import MenuButton from '@/components/UI/Buttons/Menu.vue'
import style from './result.module.sass'

export default defineComponent({
	name: 'Result',
	render() {
		const store = useStore()
		const formulas = store.getters.formulas.map((f) =>
			h('span', { class: style.formula }, f.toINString())
		)
		return h('div', { class: style.result }, [
			h('div', { class: style.title }, 'Result'),
			h('div', { class: style.formulas }, [
				h('span', { class: style.title }, 'Got Formulas'),
				...formulas,
			]),
			h('div', { class: style.menu }, [
				h(
					MenuButton,
					{
						class: style.button,
						onClick: () => store.commit('setScene', { scene: 'Title' }),
					},
					() => 'Exit'
				),
			]),
		])
	},
})
