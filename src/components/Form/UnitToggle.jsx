import React from "react";
import PropTypes from "prop-types";

const UnitToggle = ({ value, onChange, error, name, label }) => {
  const handleIncrease = () => {
    onChange(value + 1);
  };

  const handleDecrease = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <label className="text-lg font-medium">{label}</label>
      <button
        type="button"
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
        onClick={handleDecrease}
      >
        -
      </button>
      <span name={name} className="text-lg font-medium">
        {value}
      </span>
      <button
        type="button"
        className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
        onClick={handleIncrease}
      >
        +
      </button>
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
};

UnitToggle.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default UnitToggle;
