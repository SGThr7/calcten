import { FormulaTree } from '@/modules/calculate'
import { BracketList, OperatorList } from '@/modules/operator'

function checkFormula(f: string) {
	const ft = new FormulaTree(f)
	expect(ft.calculate()).toBe(eval(f))
}

describe('caluclate.ts', () => {
	it('none', () => {
		const ft = new FormulaTree('2 _ 3')
		expect(ft.calculate()).toBe(2)
	})
	it('add', () => {
		checkFormula('1 + 2')
	})
	it('sub', () => {
		checkFormula('1 - 2')
	})
	it('times', () => {
		checkFormula('1 * 2')
	})
	it('div', () => {
		checkFormula('1 / 2')
	})
	it('respect calculate priority', () => {
		checkFormula('1 + 2 * 3 - 4 / 2')
	})
	it('with parentheses', () => {
		checkFormula('(1 + 2) * ( 4 - 3 )')
	})
	it('convert to RPN', () => {
		const f = new FormulaTree('(1 + 2) *  4 - 3 ')
		const spacer = ','
		const ans = [
			1,
			2,
			OperatorList.plus,
			4,
			OperatorList.times,
			3,
			OperatorList.minus,
		].join(spacer)
		expect(f.toRPNString(spacer)).toBe(ans)
	})
	it('convert to IN', () => {
		const f = new FormulaTree('(1 + 2) *  4 - 3 ')
		const spacer = ','
		const ans = [
			BracketList.lparen + '1',
			OperatorList.plus,
			'2' + BracketList.rparen,
			OperatorList.times,
			4,
			OperatorList.minus,
			3,
		].join(spacer)
		expect(f.toINString(spacer)).toBe(ans)
	})
})
