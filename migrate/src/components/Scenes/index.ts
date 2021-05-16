import {} from 'vue'

import Title from './Title.vue'
import Play from './Play'

export const components = { Title, Play }
export type Scene = keyof typeof components
export const defaultScene: Scene = 'Title'
