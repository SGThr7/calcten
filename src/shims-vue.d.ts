declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
	const component: DefineComponent<{}, {}, any>
	export default component
}

declare module '*.module.sass' {
	const modules: Record<string, string>
	export default modules
}
