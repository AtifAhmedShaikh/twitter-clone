import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { useContext } from "react";
const PrivateRoute = ({ children }) => {
  const context = useContext(AuthContext);
  if (context.userState.auth) {
    return children;
  } else {
   toast.warn("You need to be logged !", {
      position: "top-center",
      autoClose: 1000,
    });
    return <Navigate to={"/auth/login"} />;
  }
};
export default PrivateRoute;
PrivateRoute.propTypes = {
  children: PropTypes.array,
};
