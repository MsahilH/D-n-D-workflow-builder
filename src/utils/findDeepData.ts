export const findDeepestData = (obj: any): any => {
	if (obj && typeof obj === 'object' && 'data' in obj) {
		return findDeepestData(obj.data);
	}
	return obj;
};

export const findAllFilters = (obj: any, filters: any[]): any[] => {
	// console.log(obj, " printing_obj")
	if(obj && typeof obj === 'object' && 'data' in obj) {
		console.log(obj, " printing_234234324234234")
		filters.push(obj.filterData);
		return findAllFilters(obj.data, filters)
	}
	console.log("printingin_smitiiiii")
	return filters;
}