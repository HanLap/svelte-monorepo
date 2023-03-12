const oneMinute = 1000 * 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;
const oneWeek = oneDay * 7;
const oneMonth = oneDay * 30;

export function formatTimePast(date: Date) {
	const now = new Date().valueOf();
	const d = date.valueOf();

	if (now > d + oneMonth) {
		return date.toLocaleTimeString();
	}

	if (now > d + oneWeek) {
		return 'a week ago';
	}

    if (now > d + oneDay * 2) {
		return `${Math.round((now - d) / oneDay)} days ago`;
	}

	if (now > d + oneDay) {
		return 'a day ago';
	}

	if (now > d + oneHour * 2) {
		return `${Math.round((now - d) / oneHour)} hours ago`;
	}

	if (now > d + oneHour) {
		return 'an hour ago';
	}

	if (now > d + oneMinute * 2) {
		return `${Math.round((now - d) / oneMinute)} minutes ago`;
	}

	if (now > d + oneMinute) {
		return 'a minute ago';
	}

	return `${Math.round((now - d) / 1000)} seconds ago`;
}

export function formatMonthYear(date:Date) {
	return date.toLocaleString('en-us', {month: "short", year: "2-digit"})
}