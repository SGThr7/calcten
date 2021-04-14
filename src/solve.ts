import { OpData, Operator } from '@/modules/operator'

function genRPN(nums: number[], ops: Operator[]) {
	const fn = (now: (number | Operator)[], nums: number[], ops: Operator[]) => {
		const nnums = now.filter((t) => typeof t === 'number').length
		const nops = now.length - nnums
		if (!(nums.length > 0) && !(nnums - 1 > nops)) return [now.join('')]
		const res: Array<string> = []

		if (nums.length > 0) {
			res.push(...fn(now.concat(nums[0]), nums.slice(1), ops))
		}
		if (ops.length > 0) {
			if (nnums - 1 - nops > 0) {
				for (let i = 0; i < ops.length; i++) {
					res.push(...fn(now.concat(ops[i]), nums, ops))
				}
			}
		}
		return res
	}
	return Array.from(new Set(fn([], nums, ops))).map(toRPN)
}

export function calc(rpn: (number | Operator)[]) {
	rpn = rpn.slice()
	const stack: number[] = []
	let token = rpn.shift()
	while (token !== undefined) {
		if (typeof token === 'number') {
			stack.push(token)
		} else if (typeof token === 'string') {
			const rhs = stack.pop()
			const lhs = stack.pop()
			const ans = OpData[token].fn(lhs, rhs)
			stack.push(ans)
		}
		token = rpn.shift()
	}
	return stack.pop()
}

function toRPN(strRPN: string) {
	return strRPN
		.split('')
		.map((t) => (isNaN(parseInt(t, 10)) ? (t as Operator) : parseInt(t, 10)))
}

export function isSolvable(nums: number[]) {
	const ops: Array<Operator> = Object.values(Operator).filter(
		(t) => t !== Operator.none
	)
	const rpns = genRPN(nums, ops)
	const res = rpns.filter((rpn) => calc(rpn) === 10)
	console.log(res)
	const ans = rpns.some((rpn) => calc(rpn) === 10)
	return ans
}
