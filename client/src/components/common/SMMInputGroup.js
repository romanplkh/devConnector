import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SMMInputGroup = props => {
  const { name, placeholder, value, error, onChangeInput, icon, type } = props;
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChangeInput}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SMMInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChangeInput: PropTypes.func.isRequired
};

SMMInputGroup.defaultProps = {
  type: "text"
};

export default SMMInputGroup;
