import { InjectionKey } from 'vue'
import {
	Commit as _Commit,
	CommitOptions,
	createStore,
	Store as _Store,
	useStore as _useStore,
} from 'vuex'

import { defaultScene, Scene } from '@/components/Scenes'

export interface State {
	scene: Scene
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
	readonly getters: { scene: Scene }
	commit: CommitTree<{ setScene: { scene: Scene } }>
}

export const key: InjectionKey<_Store<State>> = Symbol()

export const store = createStore<State>({
	state: {
		scene: defaultScene,
	},
	getters: {
		scene(state): Scene {
			return state.scene
		},
	},
	mutations: {
		setScene(state, payload: { scene: Scene }): Scene {
			return (state.scene = payload.scene)
		},
	},
	actions: {},
	modules: {},
})

export function useStore(): Store {
	return _useStore(key)
}
