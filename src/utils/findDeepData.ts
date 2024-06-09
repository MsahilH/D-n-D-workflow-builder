export const findDeepestData = (obj: any): any => {
  if (obj && typeof obj === "object" && "data" in obj) {
    return findDeepestData(obj.data);
  }
  return obj;
};

export const findAllFilters = (obj: any, filters: any[]): any[] => {
  if (obj && typeof obj === "object" && "data" in obj) {
    filters.push(obj.filterData);
    return findAllFilters(obj.data, filters);
  }
  return filters;
};
