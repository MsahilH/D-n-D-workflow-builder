export const findDeepestData = (obj: any): any => {
	if (obj && typeof obj === 'object' && 'data' in obj) {
		return findDeepestData(obj.data);
	}
	return obj;
};
