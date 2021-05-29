import { FormulaTree } from '@/modules/calculate'
import { BracketList, OperatorList } from '@/modules/operator'

type FormulaSign = string | number
type Formula = (FormulaSign | FormulaSign[])[]
function joinFormula(formula: Formula, separator = ''): string {
	return formula.reduce<string>((res, token, i) => {
		if (i !== 0) res += separator
		if (Array.isArray(token))
			res +=
				BracketList.lparen + joinFormula(token, separator) + BracketList.rparen
		else if (typeof token === 'number') res += token.toString()
		else res += OperatorList[token]
		return res
	}, '')
}

describe('caluclate.ts', () => {
	describe('from Infix Notation', () => {
		it.each([['2 _ 3', 2]])('formula "%s"', (f, ans) => {
			const ft = FormulaTree.fromIN(f)
			expect(ft.calculate()).toBe(ans)
		})

		it.each([
			'1 + 2',
			'1 - 2',
			'1 * 2',
			'1 / 2',
			'1 + 2 * 3 - 4 / 2',
			'(1 + 2) * ( 4 - 3 )',
			'((1 + 2)) * 3',
		])('formula "%s"', (f) => {
			const ft = FormulaTree.fromIN(f)
			expect(ft.calculate()).toBe(eval(f))
		})

		it.each([
			['(1 + 2) *  4 - 3 ', [1, 2, '+', 4, '*', 3, '-']],
			['2 - (1 - 4) - 3', [2, 1, 4, '-', '-', 3, '-']],
		])('convert to RPN "%s"', (fstr, ansar) => {
			const f = FormulaTree.fromIN(fstr)
			const spacer = ','
			const ans = joinFormula(ansar, spacer)
			expect(f.toRPNString(spacer)).toBe(ans)
		})
		it.each([
			['(1 + 2) *  4 - 3 ', [[1, '+', 2], '*', 4, '-', 3]],
			['2 - (1 - 4) - 3', [2, '-', [1, '-', 4], '-', 3]],
		])('convert to IN "%s"', (fstr, ansar) => {
			const f = FormulaTree.fromIN(fstr)
			const spacer = ','
			const ans = joinFormula(ansar, spacer)
			expect(f.toINString(spacer)).toBe(ans)
		})
	})

	describe('from Reverse Polish Notation', () => {
		it.each([
			['2 3 _', 2],
			['1 2 +', 3],
			['1 2 -', -1],
			['1 2 *', 2],
			['1 2 /', 1 / 2],
			['1 2 + 2 3 + *', (1 + 2) * (2 + 3)],
			['1 2 + 3 + 1 2 3 + + *', (1 + 2 + 3) * (1 + 2 + 3)],
		])('formula "%s"', (f, ans) => {
			const ft = FormulaTree.fromRPN(f.split(' '))
			expect(ft.calculate()).toBe(ans)
		})
	})
})