import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import {
  unfollowUserById,
  followUserById,
} from "../../Services/profileService";
import AuthContext from "../../Context/AuthContext/AuthContext";
import PropTypes from "prop-types";
import "./User.css";

const User = ({ name, username, _id, profileImage, followers }) => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDisabled,setIsDisabled]=useState(false);
  const [isFollowing, setIsFollowing] = useState(
    followers.includes(context.userState._id)
  );
  // handle follow the user by given user ID
  const handleFollowButton = async (event, userId) => {
    event.target.disabled = true;
    setIsDisabled(true)
    event.stopPropagation();
    const { error } = await followUserById(userId);
    if (error) {
      toast.error(error.response.data.message); //If successfull response is dos'not return
      setIsFollowing(false);
      event.target.disabled = false;
      setIsDisabled(false)
      return;
    }
    toast.success(`You are now following ${name}`);
    setIsFollowing(true);
  };
  // handle the unfollow user by given user ID
  const handleUnfollowButton = async (event, userId) => {
    event.target.disabled = true;
    event.stopPropagation();
    setIsFollowing(false);
    setIsDisabled(false);
    const { error } = await unfollowUserById(userId);
    if (error) {
      toast.error(error.response.data.message);
      setIsFollowing(true);
      event.target.disabled = false;
      return;
    }
    toast.success(`You have successfully unfollowed ${name}`);
  };
  return (
    <>
      <div
        className="userCard d-flex justify-content-between"
        onClick={() => navigate(`/profile/${_id}`)}
      >
        <div className="d-flex gap-2 align-items-center">
          <img src={profileImage} alt="" />
          <div className="d-flex justify-content-start align-items-start flex-column">
            <span>{name}</span>
            <span className="username">{username}</span>
          </div>
        </div>
        <div>
          {isFollowing ? (
            <button
              className="unfollow-button"
              onClick={(e) => handleUnfollowButton(e, _id)}
            >
              Following
            </button>
          ) : (
            <Button
              variant="primary"
              className="rounded-1 py-1 px-4"
              onClick={(e) => handleFollowButton(e, _id)}
              disabled={isDisabled}
            >
              {isDisabled?<>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
             Loading
              </>:"Follow"}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
User.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  _id: PropTypes.string,
  profileImage: PropTypes.string,
  followers: PropTypes.array,
};
export default User;
