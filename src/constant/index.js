export const APARTMENT_TYPES = [
  { label: "1BHK", value: "1bhk" },
  { label: "2BHK", value: "2bhk" },
  { label: "3BHK", value: "3bhk" },
];

export const COMMON_OPTIONS = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

export const PER_SQ_FT_COST = 350;

export const validateNumeric = () => ({
  pattern: {
    value: /^([1-9]\d*)$/,
    message: "Please enter a valid number",
  },
});

export const validateFloat = () => ({
  pattern: {
    value: /^([1-9]\d*)\.?\d*$/,
    message: "Please enter a valid number",
  },
});

export const validateMin = (min) => ({
  minLength: {
    value: min,
    message: `Please enter a number greater than or equal to ${min}`,
  },
});
