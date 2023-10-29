import * as yup from "yup";
const RegisterSchema = yup.object().shape({
  name: yup.string().min(5).max(25).required("Name is Required !"),
  username: yup.string().min(5).max(25).required("UsserName is Required !"),
  email: yup.string().email().required("Email is Required !"),
  password: yup.string().min(5).max(25).required("Password is Required !"),
  bio: yup.string().min(10).required("Bio is Required !"),
});

export default RegisterSchema;
