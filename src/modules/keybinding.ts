import { Bracket, Operator } from '@/modules/operator'

export class Key {
	code: string
	altKey: boolean
	ctrlKey: boolean
	shiftKey: boolean

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
}

export type KeyBindings = {
	[key in Exclude<Operator, typeof Operator.none> | Bracket | 'remove']: Key
}
export const KeyBindings: KeyBindings = {
	[Operator.plus]: new Key('KeyJ'),
	[Operator.minus]: new Key('KeyK'),
	[Operator.times]: new Key('KeyL'),
	[Operator.div]: new Key('Semicolon'),
	[Bracket.lparen]: new Key('KeyU'),
	[Bracket.rparen]: new Key('KeyI'),
	remove: new Key('KeyO'),
}
