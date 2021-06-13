import {} from 'vue'

import Title from './Title.vue'
import Play from './Play'
import Result from './Result'

export const components = { Title, Play, Result }
export type Scene = keyof typeof components
export const defaultScene: Scene = 'Title'
