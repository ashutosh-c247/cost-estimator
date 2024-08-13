import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";

const SwitchToggle = ({ name, control, label, defaultValue, error }) => {
  return (
    <div className="flex items-center space-x-4">
      <label className="font-medium">{label}</label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || "no"}
        render={({ field }) => (
          <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
            <input
              type="checkbox"
              id={name}
              checked={field.value === "yes"}
              onChange={(e) => field.onChange(e.target.checked ? "yes" : "no")}
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              htmlFor={name}
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            >
              <span
                className={`toggle-indicator absolute block w-6 h-6 bg-blue-500 rounded-full transition-transform duration-200 ease-in ${
                  field.value === "yes" ? "translate-x-6" : "translate-x-0"
                }`}
              ></span>
            </label>
          </div>
        )}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

SwitchToggle.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  error: PropTypes.string,
};

export default SwitchToggle;
