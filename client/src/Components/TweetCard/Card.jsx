import { useContext, useState } from "react";
import { timeAgo } from "../../Utils/helper";
import { useNavigate } from "react-router-dom";
import { likePostById, unlikePostById } from "../../Services/tweetService";
import PropTypes from "prop-types";
import AuthContext from "../../Context/AuthContext/AuthContext";
import "./Card.css";
import { toast } from "react-toastify";
const Card = ({
  createdAt,
  _id,
  tweetText,
  comments,
  likes,
  userId: { name, username, profileImage, _id: userId },
}) => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(likes.includes(context.userState._id));
  const [likesCount, setLikesCount] = useState(likes.length); // Initialize the initial likes count
  // Go to User profile By clicks the profileImage of User
  const handleProfileImageClick = (event, profileId) => {
    event.stopPropagation();
    navigate(`/profile/${profileId}`);
  };
  //handle like button to like the post
  const handleLikeButton = async () => {
    setIsLiked(true);
    setLikesCount((prev) => prev + 1); // Update the likes count
    const { error } = await likePostById(_id);
    if (error) toast.error("something wents wrongs !");
  };
  //handle dislike button dislike to the post
  const handleUnlikeButton = async () => {
    setIsLiked(false);
    setLikesCount((prev) => prev - 1); // Update the likes count
    const {error} = await unlikePostById(_id);
    if (error) toast.error("something wents wrongs !");
  };
  //handle comments button to Go Comment page of specific post
  const handleCommentButton = () => {
    navigate(`/comments/${_id}`);
  };
  return (
    <>
      <div className="card mb-3">
        <div className="head d-flex justify-content-between align-items-center">
          <div className="d-flex gap-2 align-items-center mb-2">
            <img
              src={profileImage}
              className="profileImage"
              alt=""
              onClick={(e) => handleProfileImageClick(e, userId)}
            />
            <div className="d-flex flex-column">
              <span>{name}</span>
              <span className="username">{username}</span>
            </div>
          </div>
          <div className="d-flex gap-2">
            <span className="time-stamp">{timeAgo(createdAt)}</span>
          </div>
        </div>
        <div className="body w-100">
          <p>{tweetText}</p>
        </div>
        <div className="bottom d-flex justify-content-between align-items-center">
          {!isLiked ? (
            <button
              className="d-flex gap-2 align-items-center w-auto h-auto px-1 py-2"
              onClick={() => handleLikeButton()}
            >
              <i className="bx bx-heart"></i>
              <span>{likesCount}</span>
            </button>
          ) : (
            <button
              className="d-flex gap-2 align-items-center w-auto h-auto px-1 py-2"
              onClick={() => handleUnlikeButton()}
            >
              <i className="bx bxs-heart text-danger"></i>
              <span>{likesCount}</span>
            </button>
          )}
          <button
            className="d-flex gap-2 align-items-center  w-auto h-auto px-1 py-2"
            onClick={() => handleCommentButton()}
          >
            <i className="bx bx-chat"></i>
            <span>{comments.length}</span>
          </button>
          <button
            className=" w-auto h-auto px-1 py-2"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasBottom"
            aria-controls="offcanvasBottom"
          >
            <i className="bx bx-share-alt"></i>
          </button>
        </div>
      </div>
    </>
  );
};
Card.propTypes = {
  createdAt: PropTypes.string,
  _id: PropTypes.string,
  tweetText: PropTypes.string,
  comments: PropTypes.array,
  likes: PropTypes.array,
  userId: PropTypes.object,
  name: PropTypes.string,
  username: PropTypes.string,
};
export default Card;
