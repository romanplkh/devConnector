import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = props => {
  const { name, value, error, info, onChangeInput, options } = props;

  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChangeInput}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChangeInput: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default SelectListGroup;
