import { Bracket, Operator } from '@/modules/operator'

export class Key {
	code: string
	altKey: boolean
	ctrlKey: boolean
	shiftKey: boolean
	get modifier() {
		return {
			altKey: this.altKey,
			ctrlKey: this.ctrlKey,
			shiftKey: this.shiftKey,
		}
	}

	constructor(
		code: string,
		modifier?: { altKey?: boolean; ctrlKey?: boolean; shiftKey?: boolean }
	) {
		this.code = code
		this.altKey = modifier?.altKey ?? false
		this.ctrlKey = modifier?.ctrlKey ?? false
		this.shiftKey = modifier?.shiftKey ?? false
	}

	static fromKeyboardEvent(event: KeyboardEvent): Key {
		return new Key(event.code, event)
	}

	cmpEvent(event: KeyboardEvent): boolean {
		if (
			this.code === event.code &&
			this.altKey === event.altKey &&
			this.ctrlKey === event.ctrlKey &&
			this.shiftKey === event.shiftKey
		) {
			return true
		} else {
			return false
		}
	}

	toJSON() {
		return `Key{"code": "${this.code}", "modifier": ${JSON.stringify(
			this.modifier
		)}}`
	}
}

export class KeyBind {
	private bindList: BindList = {
		[Operator.plus]: new Key('KeyJ'),
		[Operator.minus]: new Key('KeyK'),
		[Operator.times]: new Key('KeyL'),
		[Operator.div]: new Key('Semicolon'),
		[Bracket.lparen]: new Key('KeyU'),
		[Bracket.rparen]: new Key('KeyI'),
		remove: new Key('KeyO'),
	}
	get [Operator.plus]() {
		return this.bindList[Operator.plus]
	}
	get [Operator.minus]() {
		return this.bindList[Operator.minus]
	}
	get [Operator.times]() {
		return this.bindList[Operator.times]
	}
	get [Operator.div]() {
		return this.bindList[Operator.div]
	}
	get [Bracket.lparen]() {
		return this.bindList[Bracket.lparen]
	}
	get [Bracket.rparen]() {
		return this.bindList[Bracket.rparen]
	}
	get remove() {
		return this.bindList['remove']
	}

	static storageKey = 'keybinding'

	constructor(bindList?: BindList) {
		this.bindList = {
			...this.bindList,
			...this.getStorage(),
			...bindList,
		}
	}

	saveStorage(): void {
		localStorage.setItem(KeyBind.storageKey, JSON.stringify(this.bindList))
	}

	getStorage(): Partial<BindList> {
		const item = localStorage.getItem(KeyBind.storageKey)
		return item ? JSON.parse(item, KeyBind.reviver) : {}
	}

	static reviver(key: string, value: unknown) {
		if (
			typeof value === 'string' &&
			value.startsWith('Key{') &&
			value.endsWith('}')
		) {
			const obj: ParsedKey = JSON.parse(value.slice(3))
			return new Key(obj.code, obj.modifier)
		}

		return value
	}
}
export const keyBind = new KeyBind()
type Keys = Operator | Bracket | 'remove'
type BindList = {
	[key in Keys]: Key
}

type ParsedKey = {
	code: string
	modifier?: { altKey?: boolean; ctrlKey?: boolean; shiftKey?: boolean }
}
