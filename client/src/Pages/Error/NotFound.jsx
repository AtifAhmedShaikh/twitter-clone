import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="text-center">
      Opps! Page Not found ! Go to <Link to={"/"}>Home</Link>{" "}
    </div>
  );
};

export default NotFound;
