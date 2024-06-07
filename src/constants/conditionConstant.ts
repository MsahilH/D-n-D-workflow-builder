export enum Conditions {
	IS_EQUAL = 'is equal',
	IS_NOT_EQUAL_TO = 'is not equal to',
	INCLUDES = 'includes',
	DOES_NOT_INCLUDE = 'does not include',
}

export const conditionOptions = Object.values(Conditions).map((condition) => ({
	value: condition,
	label: condition,
}));
