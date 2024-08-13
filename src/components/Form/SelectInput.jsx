import Select from "react-select";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

const SelectInput = ({ label, name, control, options, isMulti = false }) => (
  <div className="mb-4">
    <label className="block mb-1">{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select {...field} options={options} isMulti={isMulti} />
      )}
    />
  </div>
);

SelectInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  isMulti: PropTypes.bool,
};

export default SelectInput;
