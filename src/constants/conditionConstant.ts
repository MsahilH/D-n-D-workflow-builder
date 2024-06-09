export enum Conditions {
  INCLUDES = "includes",
  DOES_NOT_INCLUDE = "does not include",
  IS_EQUAL_TO = "is equal to",
  IS_NOT_EQUAL_TO = "is not equal to",
}

export const conditionOptions = Object.values(Conditions).map((condition) => ({
  value: condition,
  label: condition,
}));
