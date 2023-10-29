import * as yup from "yup";
const LoginSchema = yup.object().shape({
  email: yup.string().email().required("Email is Required !"),
  password: yup.string().min(5).max(25).required("password is Required !"),
});
export default LoginSchema;