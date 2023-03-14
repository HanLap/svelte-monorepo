export function getCalendarWeek(date: Date): number {
	const startDate: any = new Date(date.getFullYear(), 0, 1);
	const days = Math.floor(((date as any) - startDate) / (24 * 60 * 60 * 1000));

	return Math.ceil(days / 7);
}

export function getMonday(date: Date) {
	var day = date.getDay(),
		diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
	return new Date(date.setDate(diff));
}

export function getMondayOfCalendarWeek(w: number) {
	const startDate = new Date(new Date().getFullYear(), 0, 0);
	const time = w * (7 * 24 * 60 * 60 * 1000);

	console.log(startDate.getTime() + time);

	return getMonday(new Date(startDate.getTime() + time));
}

export function daysBetween(d1: Date, d2: Date): number {
	return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
}
