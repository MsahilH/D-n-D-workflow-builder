export const convertToCSV = (data: any[]): string => {
	if (data.length === 0) return '';

	const keys = Object.keys(data[0]);
	const csvRows = [
		keys.join(','),
		...data.map((row) => keys.map((key) => row[key]).join(',')),
	];

	return csvRows.join('\n');
};
