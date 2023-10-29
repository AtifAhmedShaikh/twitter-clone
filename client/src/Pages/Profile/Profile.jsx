import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import Card from "../../Components/TweetCard/Card";
import { useNavigate, useParams } from "react-router-dom";
import { fetchUserProfile, followUserById } from "../../Services/profileService";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";
import AuthContext from "../../Context/AuthContext/AuthContext";
import Footer from "../../layouts/Footer/Footer";
import EditProfile from "../../Components/Modal/EditProfile";
const Profile = () => {
  const { userId } = useParams();//Extract user ID from URL params
  const navigate = useNavigate();//to naviagting on over routes
  const context = useContext(AuthContext);//Access the authentication context for the currently logged-in user.
  const [tweets, setTweets] = useState([]); //Initianlize for all tweets of this user
  const [userData, setUserData] = useState({});//User complete Info
  const [loaded, setLoaded] = useState(false);//for loading profile data
  const [isShowModal,setIsShow]=useState(false);//show the Edit profile modal box
  const [isFollowed, setIsFollowed] = useState(false);//check is already followed or not
  const isMyProfile = userData._id === context.userState._id; //check is this current user logined profile
  // handle follow button click event to follow the user
  const handleFollowButton = async () => {
    setIsFollowed(true);
    const { data, error } = await followUserById(userId);
    if (error) {
      toast(error.response.data.message);
      return;
    }
    setIsFollowed(false);
    toast(data.message);
  };
  const handleshowModal=()=>{
    setIsShow(true);
  }
  useEffect(() => {
    // fetch and render the user profile or Info
    const renderProfileInfo = async () => {
      const { data, error } = await fetchUserProfile(userId);
      if (error) return;
     // Update the state with the fetched data.
      setTweets(data.profile.tweets); //user tweets
      setUserData(data.profile.user); //user Info
      setIsFollowed(data.profile.user.followers.includes(context.userState._id));
      setLoaded(true);
    };
    renderProfileInfo();
  }, [userId, context.userState._id, userData]);
  if (!loaded) return <Loader />;
  // Destructure the user data for use in the component.
  const {
    bio,
    name,
    username,
    backgroundImage,
    profileImage,
    following,
    followers,
    _id,
  } = userData;
  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="bg-transparent text-white fs-5 ms-1"
      >
        {" "}
        <i className="bx bx-arrow-back"></i>{" "}
      </button>
      <div className="profile-container p-0 d-flex flex-column align-items-center mt-0">
        <div className="account-container d-flex justify-content-center align-item-center w-100 flex-column">
          <img src={backgroundImage} className="cover-photo" alt="" />
          <div className="d-flex mt-2 justify-content-between px-2">
            <div>
              <img src={profileImage} alt="" className="profileImage mb-2" />
            </div>
            <div className="d-flex gap-3 profile-section">
              <div className="d-flex justify-content-start text-center flex-column">
                <span>{tweets.length}</span>
                <span className="">Posts</span>
              </div>
              <div
                className="d-flex justify-content-start text-center flex-column"
                onClick={() => navigate(`/profile/followers/${_id}`)}
              >
                <span>{followers.length}</span>
                <span>Followers</span>
              </div>
              <div
                className="d-flex justify-content-start text-center flex-column"
                onClick={() => navigate(`/profile/following/${_id}`)}
              >
                <span>{following.length}</span>
                <span>Following</span>
              </div>
            </div>
            <div>
              {isMyProfile ? (
                <button className="unfollow-button" onClick={()=>handleshowModal()}>Edit Profile</button>
              ) : isFollowed ? (
                <button className="unfollow-button">following</button>
              ) : (
                <button
                  className="follow-button"
                  onClick={() => handleFollowButton(_id)}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className="profile-content-section d-flex flex-column px-2">
            <span>{name}</span>
            <span className="username">{username}</span>
            <p>{bio}</p>
          </div>
          {tweets.length === 0 && (
            <p className="text-center">Not have Tweets yet this Person !</p>
          )}
          <div className="card-group mt-3">
            {tweets.map((tweet) => {
              return <Card {...tweet} key={tweet._id} />;
            })}
          </div>
        </div>
      </div>
      <div>
    </div>
    <EditProfile isShow={isShowModal} handleCloseModal={() => setIsShow(false)} />

      <Footer/>
    </>
  );
};

export default Profile;
