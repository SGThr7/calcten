import { FormulaTree } from '@/modules/calculate'
import { BracketList, OperatorList } from '@/modules/operator'

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

		it('convert to RPN', () => {
			const f = FormulaTree.fromIN('(1 + 2) *  4 - 3 ')
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
			const f = FormulaTree.fromIN('(1 + 2) *  4 - 3 ')
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
