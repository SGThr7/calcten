import { InjectionKey } from 'vue'
import {
	Commit as _Commit,
	CommitOptions,
	createStore,
	Store as _Store,
	useStore as _useStore,
} from 'vuex'
import { defaultScene, Scene } from '@/components/Scenes'
import { FormulaTree } from '@/modules/formula'

export interface State {
	scene: Scene
	formulas: FormulaTree[]
}

interface Commit<T, P> extends _Commit {
	(type: T, payload?: P, options?: CommitOptions): void
	(
		payloadWithType: {
			type: T
			payload?: P
		},
		options?: CommitOptions
	): void
}
type CommitTree<T> = {
	[key in keyof T]: Commit<key, T[key]>
}[keyof T]

declare class Store extends _Store<State> {
	readonly getters: { scene: Scene; formulas: FormulaTree[] }
	commit: CommitTree<{
		setScene: { scene: Scene }
		pushFormula: { formula: FormulaTree }
		popFormula: never
		clearFormulas: never
	}>
}

export const key: InjectionKey<_Store<State>> = Symbol()

export const store = createStore<State>({
	state: {
		scene: defaultScene,
		formulas: [],
	},
	getters: {
		scene(state): Scene {
			return state.scene
		},
		formulas(state): FormulaTree[] {
			return state.formulas
		},
	},
	mutations: {
		setScene(state, payload: { scene: Scene }) {
			state.scene = payload.scene
		},
		pushFormula(state, payload: { formula: FormulaTree }) {
			state.formulas.push(payload.formula)
		},
		popFormula(state) {
			state.formulas.pop()
		},
		clearFormulas(state) {
			state.formulas.length = 0
		},
	},
	actions: {},
	modules: {},
})

export function useStore(): Store {
	return _useStore(key)
}
