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
    value: /^\d+$/,
    message: "Please enter a valid number",
  },
});

export const validateFloat = () => ({
  pattern: {
    value: /^\d*\.?\d*$/,
    message: "Please enter a valid number",
  },
});

export const validateMax = (max) => ({
  max: {
    value: max,
    message: `Please enter a value less than or equal to ${max}`,
  },
});
