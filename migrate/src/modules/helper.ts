export const gets =
	<T>(obj: T) =>
	(key: unknown): T[keyof T] | undefined =>
		obj[key as keyof T]
