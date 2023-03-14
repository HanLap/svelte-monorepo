export function debounce<F extends (...args: A) => R, A extends any[], R = void>(
	fn: F,
	ms: number
): (...args: Parameters<F>) => Promise<R> {
	let timer: NodeJS.Timeout;

	const debouncedFunc = (...args: Parameters<F>): Promise<R> =>
		new Promise((resolve) => {
			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(() => {
				resolve(fn(...args));
			}, ms);
		});

	return debouncedFunc;
}
