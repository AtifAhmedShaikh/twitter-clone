import { useRef, useState } from "react";
import "./PostTweet.css";
import { postTweet } from "../../Services/tweetService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../../layouts/Header/Header";
import Footer from "../../layouts/Footer/Footer";
const PostTweet = () => {
  const [tweetText, setTweetText] = useState("");
  const navigate = useNavigate();
  const textInput = useRef(null);
  const handlePostTweet = async () => {
    const {error} = await postTweet({ tweetText: tweetText });
    if(error){
      toast.error("something wents wrong !");
      return;
    }
    toast.success("Tweet Posted Successfully !");
    setTweetText("");
    textInput.current.value = "";
  };
  return (
    <>
    <Header/>
      <button
        onClick={() => navigate(-1)}
        className="bg-transparent text-white fs-5 ms-1"
      >
        {" "}
        <i className="bx bx-arrow-back"></i>{" "}
      </button>
      <div className="postTweet">
        <p>Whats Going on Today Share with the World!</p>
        <div className="text-container">
          <textarea
            name=""
            value={tweetText}
            onChange={(e) => setTweetText(e.target.value)}
            ref={textInput}
            className="rounded-2"
          ></textarea>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-success rounded-1"
              onClick={() => handlePostTweet()}
              disabled={!tweetText}
            >
              Post Tweet
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default PostTweet;
