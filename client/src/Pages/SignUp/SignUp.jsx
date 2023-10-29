import { useState, useContext } from "react";
import "./SignUp.css";
import Input from "../../Components/FormInput/Input";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { userRegister } from "../../Services/authService";
import AuthContext from "../../Context/AuthContext/AuthContext";
import RegisterSchema from "../../Schema/RegisterSchema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [errormessage, setErrorMessge] = useState("");
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const { values, touched, handleBlur, handleChange, errors, isValid, dirty } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        name: "",
        bio: "",
        profileImage:"https://images.unsplash.com/photo-1574722772849-7b249c18a2fd?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGJveXN8ZW58MHx8MHx8fDA%3D",
        backgroundImage:"https://media.istockphoto.com/id/1460853312/photo/abstract-connected-dots-and-lines-concept-of-ai-technology-motion-of-digital-data-flow.webp?b=1&s=170667a&w=0&k=20&c=WUSwLiSmeKNLdzCcIQyeCXnOXooAC4cVjwLbKFPPiU0=",
      },
      validationSchema: RegisterSchema,
    });
  // handle the User Registration and form validations
  const handleRegisterUser = async () => {
    const {data,error} = await userRegister(values);
    if(error){
      toast.error(error.response.data.message);
      setErrorMessge(error.response.data.message);
      return;
    }
    context.setUserState({...data.user, auth: true });
    navigate("/");
    toast.success("Registration Successfully !");
  };
  return (
    <>
     <div className="signUp-container d-flex align-items-center flex-column justify-content-center">
        <Input
          type={"text"}
          name={"name"}
          id={"nameId"}
          placeholder={"Enter The Name "}
          label={" Name "}
          value={values.name}
          onBlur={handleBlur}
          onChange={handleChange}
          errormessage={errors.name}
          error={errors.name && touched.name ? 1 : undefined}
          className={
            errors.name && touched.name
              ? "form-control errorInput "
              : "form-control"
          }
        />
        <Input
          type={"text"}
          name={"username"}
          id={"usernameId"}
          placeholder={"Enter The UserName "}
          label={" UserName"}
          value={values.username}
          onBlur={handleBlur}
          onChange={handleChange}
          errormessage={errors.username}
          error={errors.username && touched.username ? 1 : undefined}
          className={
            errors.username && touched.username
              ? "form-control errorInput "
              : "form-control"
          }
        />
        <Input
          type={"email"}
          name={"email"}
          id={"emailId"}
          placeholder={"Enter The Email "}
          label={" Email "}
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
          label={"Password"}
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
        <Input
          type={"text"}
          name={"bio"}
          id={"bio"}
          placeholder={"Enter The Your Twitter  Bio "}
          label={"Bio"}
          value={values.bio}
          onBlur={handleBlur}
          onChange={handleChange}
          errormessage={errors.bio}
          error={errors.bio && touched.bio ? 1 : undefined}
          className={
            errors.bio && touched.bio
              ? "form-control errorInput "
              : "form-control"
          }
        />
        <div className="btn-wrapper mt-3">
          <button
            className="btn btn-primary rounded-1"
            onClick={() => handleRegisterUser()}
            disabled={!(dirty && isValid)}
          >
            SIGN UP
          </button>
          <p style={{ color: "red" }}>
            {errormessage !== "" ? errormessage : ""}
          </p>
        </div>
        <div className="btn-wrapper mt-3">
          <span className="me-3"> Already have an Account !</span>
          <Link to={"/auth/login"}> Login</Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
