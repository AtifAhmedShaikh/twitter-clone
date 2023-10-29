import { useState, useContext } from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext/AuthContext";

const Footer = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [userId, setUserId] = useState(context.userState._id);
  const navigateManu = [
    { icon: "bx bx-home", path: "/" },
    { icon: "bx bx-search-alt-2", path: "/users" },
    { icon: "bx bxl-twitter", path: "/postNewTweet" },
    { icon: "bx bx-user-circle", path: `/profile/${userId}` },
  ];
  // handle the navigation and checking Authentication for protected Routes
  const handleNavigateion = (pageUrl, index) => {
    setUserId(context.userState._id);
    navigate(pageUrl);
    context.setActiveIconIndex(index);
  };
  return (
    <>
      <div className="footer">
        {navigateManu.map((item, index) => {
          return (
            <button
              className={index == context.activeIconIndex ? "active" : ""}
              key={index}
              onClick={() => handleNavigateion(item.path, index)}
            >
              {" "}
              <i className={item.icon}></i>{" "}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default Footer;
