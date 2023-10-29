import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../Utils/helper";
import "./CommentCard.css";
import PropTypes from "prop-types";
const CommentCard = ({ data }) => {
  const navigate = useNavigate();
  const {
    commentText,
    createdAt,
    userId: { _id,  name ,profileImage},
  } = data;
  return (
    <div className="comment-card">
      <div className="d-flex gap-2 align-items-center justify-content-between">
        <div className="d-flex gap-2 align-items-center">
          <img
            src={profileImage}
            alt="loading"
            onClick={() => navigate(`/profile/${_id}`)}
          />
          <span className="author-name">{name}</span>
        </div>
        <span className="time-stamp">{timeAgo(createdAt)}</span>
      </div>
      <p className="mt-2">{commentText}</p>
    </div>
  );
};
export default CommentCard;
CommentCard.propTypes = {
  data: PropTypes.object,
};