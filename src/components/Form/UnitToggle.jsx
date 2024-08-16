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
    <div>
      <div className="flex items-center space-x-4">
        <label className="text-lg font-medium w-24">{label}</label>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-l transition-transform transform hover:scale-110 active:scale-90"
            onClick={handleDecrease}
          >
            -
          </button>
          <span
            name={name}
            className="text-lg font-medium bg-white border border-gray-200 px-4 py-2 rounded"
          >
            {value}
          </span>
          <button
            type="button"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-r transition-transform transform hover:scale-110 active:scale-90"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
      </div>
      {error && (
        <div className="text-red-600 text-sm mt-1 ml-28 animate-fadeIn">
          {error}
        </div>
      )}
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
