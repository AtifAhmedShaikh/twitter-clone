import { useContext } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/AuthContext";
import { userLogOut } from "../../Services/authService";
const Header = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  //handle the  logOut and Redirect Login page
  const handleLogOut = async () => {
    const {error} = await userLogOut();
    if(!error){
      context.setUserState({
        email: "",
        name: "",
        username: "",
        _id: "",
        auth: false,
      });
      navigate("/auth/login");
    }
  };
  const test=()=>{
    console.log(context.userState)
  }
  return (
    <>
      <header>
        <div className="d-flex justify-content-between align-items-center">
          <div onClick={()=>test()}>
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="r-vlxjld r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"
            >
              <g>
                <path
                  d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  fill="white"
                ></path>
              </g>
            </svg>
          </div>
          {context.userState.auth && (
            <div className="logout-btton-wrapper">
              <button className="btn rounded-1" onClick={() => handleLogOut()}>
                Log Out
              </button>
            </div>
          )}
          {!context.userState.auth && (
            <div className="d-flex gap-1">
              <button
                className="btn rounded-1"
                onClick={() => navigate("/auth/login")}
              >
                LOGIN
              </button>
              <button
                className="btn rounded-1"
                onClick={() => navigate("/auth/signUp")}
              >
                SIGN UP
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
