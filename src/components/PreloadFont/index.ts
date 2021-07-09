import { defineComponent, h, PropType } from 'vue'
import style from './style.module.sass'

export type TextList = { font: string; text: string }[]

export default defineComponent({
	name: 'PreloadText',
	props: {
		textList: {
			require: true,
			type: Array as PropType<TextList>,
		},
	},
	render() {
		return h(
			'div',
			{ class: style.preload },
			this.textList?.map((v) =>
				h('span', { style: `font-family: ${v.font};` }, v.text)
			)
		)
	},
})
