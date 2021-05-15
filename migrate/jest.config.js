module.exports = {
	preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'^.+\\.tsx?$': 'ts-jest',
	},
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.json',
			diagnostics: {
				ignoreCodes: ['TS7006'],
			},
		},
	},
}
