import { useNavigate, useParams } from "react-router-dom";
import "./Comments.css";
import CommentCard from "../../Components/CommentCard/CommentCard";
import { useEffect, useRef, useState } from "react";
import {
  fetchCommentsByPostId,
  writeComments,
} from "../../Services/commentService";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";
const Comments = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [commentText, setCommentText] = useState(""); //Initialize Input value of commnet Input for new comment
  const textInput = useRef(); // Refrence of Input Element of new comment
  const { postId } = useParams(); //Get post Id from page Url
  //render the All comments on specific post by given post ID
  useEffect(() => {
    const renderPostCommentsById = async () => {
      const { data, error } = await fetchCommentsByPostId(postId);
      if (error) return;
      setComments(data.comments);
      setLoaded(true);
    };
    renderPostCommentsById();
  }, [postId,comments,loaded]);

  //handle the post new comment on given post ID
  const handlePostNewComment = async () => {
    textInput.current.value = "";
    setLoaded(false);
    const { error } = await writeComments(postId, commentText);
    if (error) toast("something wents wrong ");
    setCommentText("");
  };

  return (
    <>
      <div className="comment-container d-flex flex-column align-items-center">
        <div
          className="d-flex justify-content-start py-3"
          style={{ width: "inherit" }}
        >
          <button
            onClick={() => navigate(-1)}
            className="bg-transparent text-white fs-5 ms-1"
          >
            {" "}
            <i className="bx bx-arrow-back"></i>{" "}
          </button>
        </div>
        {comments.length === 0 && loaded && (
          <p className="text-center">
            No comments yet. Be the first to comment
          </p>
        )}
        {comments.map((comment) => {
          return <CommentCard data={comment} key={comment._id} />;
        })}
        {!loaded && <Loader />}
      </div>

      <div className="d-flex justify-content-center align-items-center gap-2 write-comments-container">
        <input
          type="text"
          placeholder="Type new Comment..."
          onChange={(e) => setCommentText(e.target.value)}
          ref={textInput}
        />
        <button onClick={() => handlePostNewComment()} disabled={!commentText}>
          {" "}
          <i className="bx bx-send"></i>{" "}
        </button>
      </div>
    </>
  );
};

export default Comments;
