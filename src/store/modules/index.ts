import { Store } from 'vuex'
const files = require.context('.', false, /\.ts$/)

const modules: Record<string, Store<unknown>> = {}
for (const key of files.keys()) {
	if (key === './index.ts') continue
	modules[key.replace(/(^\.\/|\.ts$)/g, '')] = files(key).default
}

export default modules
