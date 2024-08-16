import PropTypes from "prop-types";

const Input = ({
  label,
  name,
  register,
  type = "text",
  required = false,
  validation = {},
  error,
  ...rest
}) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium text-sm">
      {label}{" "}
      {required && <span className="text-red-500 text-xs">(Required)</span>}
    </label>
    <input
      {...register(name, {
        ...(required && {
          required: `${label} is required`,
        }),
        ...validation,
      })}
      type={type}
      {...(type === "number" && { step: "any" })}
      className="w-full p-2 border border-black border-1 rounded"
      {...rest}
    />
    {error && (
      <p className="text-red-500 font-semibold text-sm pt-1">{error}</p>
    )}
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  type: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  validation: PropTypes.object,
};

export default Input;
