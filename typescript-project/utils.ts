// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNotNaN(arg: any): boolean {
	return !isNaN(Number(arg));
}
