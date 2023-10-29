import { useState } from "react";
import "./Input.css";
import PropTypes from "prop-types";
const Input = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordType = () => {
    // handle the show and hide password
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="form-box position-relative">
        <label htmlFor="inputAddress" className="form-label">
          {props.label}
        </label>
        <input
          {...props}
          autoComplete="off"
          type={props.type === "password" && showPassword ? "text" : props.type}
        />
        {props.error && <p className="errormessage">{props.errormessage}</p>}
        {props.type === "password" && (
          <i
            className={`bx ${showPassword ? "bx-show" : "bx-hide"}`}
            onClick={() => handlePasswordType()}
          ></i>
        )}
      </div>
    </>
  );
};
Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.number,
  errormessage: PropTypes.string,
  type: PropTypes.string,
};
export default Input;
