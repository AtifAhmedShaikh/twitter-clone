import { useState, useContext } from "react";
import Input from "../../Components/FormInput/Input";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { userLogin } from "../../Services/authService";
import AuthContext from "../../Context/AuthContext/AuthContext";
import LoginSchema from "../../Schema/LoginSchema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [errormessage, setErrorMessage] = useState("");
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const { values, touched, handleBlur, handleChange, errors, isValid, dirty } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,
    });
  //handle the user Login functionality and form validations by Yup and formik
  const handleLogin = async () => {
    const {data,error} = await userLogin(values);
    if(error){
      setErrorMessage(error.response.data.error);
      toast.error(error.response.data.error);
      return;
    }
      context.setUserState({ ...data.user, auth: true });
      setErrorMessage("");
      navigate("/");
      toast.success("Logined Successfully !");
  };
  return (
    <>
      <div className="signUp-container d-flex align-items-center flex-column justify-content-center">
        <h2>LOGIN HERE</h2>
        <Input
          type={"text"}
          name={"email"}
          id={"emailId"}
          placeholder={"Enter The Email "}
          label={" Email"}
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          errormessage={errors.email}
          error={errors.email && touched.email ? 1 : undefined}
          className={
            errors.email && touched.email
              ? "form-control errorInput "
              : "form-control"
          }
        />
        <Input
          type={"password"}
          name={"password"}
          id={"password"}
          placeholder={"Enter The Password "}
          label={" Password"}
          value={values.password}
          onBlur={handleBlur}
          onChange={handleChange}
          errormessage={errors.password}
          error={errors.password && touched.password ? 1 : undefined}
          className={
            errors.password && touched.password
              ? "form-control errorInput "
              : "form-control"
          }
        />
        <p className="error-message">
          {errormessage !== "" ? errormessage : ""}
        </p>
        <div className="btn-wrapper mt-2">
          <button
            className="btn btn-primary rounded-1"
            onClick={() => handleLogin(values)}
            disabled={!(dirty && isValid)}
          >
            LOGIN
          </button>
        </div>
        <div className="btn-wrapper mt-3">
          <span className="me-3">{"Don't have Account !"}</span>
          <Link to={"/auth/signUp"}> Register</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
