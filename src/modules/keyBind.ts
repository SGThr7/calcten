import { Operators, Brackets } from '@/modules/operator'

export class Key {
	code: string
	altKey: boolean
	ctrlKey: boolean
	shiftKey: boolean
	key?: string

	set modifier(arg: Partial<KeyModifier>) {
		this.altKey = arg.altKey ?? this.altKey
		this.ctrlKey = arg.ctrlKey ?? this.ctrlKey
		this.shiftKey = arg.shiftKey ?? this.shiftKey
	}
	get modifier(): KeyModifier {
		return {
			altKey: this.altKey,
			ctrlKey: this.ctrlKey,
			shiftKey: this.shiftKey,
		}
	}

	constructor(keyCode: string, modifier?: Partial<KeyModifier>, key?: string) {
		this.code = keyCode
		this.altKey = modifier?.altKey ?? false
		this.ctrlKey = modifier?.ctrlKey ?? false
		this.shiftKey = modifier?.shiftKey ?? false
		this.key = key?.toLowerCase()
	}

	toJSON(): string {
		return `${this.constructor.name}{"code": "${
			this.code
		}", "modifier": ${JSON.stringify(this.modifier)}}`
	}

	static reviver<T>(key: string, value: T): Key | T {
		if (
			typeof value === 'string' &&
			value.startsWith(this.name + '{') &&
			value.endsWith('}')
		) {
			const obj: KeyJSON = JSON.parse(value.slice(this.name.length))
			return new this(obj.code, obj.modifier)
		}

		return value
	}

	cmp(e: KeyboardEvent): boolean {
		return (
			this.code === e.code &&
			this.altKey === e.altKey &&
			this.ctrlKey === e.ctrlKey &&
			this.shiftKey === e.shiftKey
		)
	}

	static readonly keyCodeList = {
		Backquote: '`',
		Backslash: '\\',
		BracketLeft: '[',
		BracketRight: ']',
		Comma: ',',
		Equal: '=',
		IntlBackslash: '\\',
		IntlRo: '\\',
		IntlYen: '¥',
		Minus: '-',
		Period: '.',
		Quote: "'",
		Semicolon: ';',
		Slash: '/',
	}

	toString(): string {
		let res =
			this.key ??
			Key.keyCodeList[<keyof typeof Key.keyCodeList>this.code] ??
			this.code.replace(/^(Key|Digit)/, '').toLowerCase()
		if (this.altKey) res = '⎇' + res
		if (this.ctrlKey) res = '^' + res
		if (this.shiftKey) res = '⇧' + res
		return res
	}
}

export type KeyJSON = {
	code: string
	modifier: KeyModifier
}

export type KeyModifier = {
	altKey: boolean
	ctrlKey: boolean
	shiftKey: boolean
}

class KeyBind {
	#bindList: BindList = {
		remove: new Key('KeyO'),
		[Operators.plus.toString()]: new Key('KeyJ'),
		[Operators.minus.toString()]: new Key('KeyK'),
		[Operators.times.toString()]: new Key('KeyL'),
		[Operators.div.toString()]: new Key('Semicolon'),
		[Brackets.lparen.toString()]: new Key('KeyU'),
		[Brackets.rparen.toString()]: new Key('KeyI'),
	}

	get list(): BindList {
		return this.#bindList
	}

	constructor(bindList?: BindList) {
		this.#bindList = {
			...this.#bindList,
			...KeyBind.getStorage(),
			...bindList,
		}
	}

	static storageKey = 'keybinding'

	static getStorage(): Record<string, Key> {
		const item = localStorage.getItem(this.storageKey)
		const json = JSON.parse(<string>item, Key.reviver)
		return typeof json === 'object' ? json : {}
	}
}

export const keyBind = new KeyBind()

type BindList = {
	[key: string]: Key
}
