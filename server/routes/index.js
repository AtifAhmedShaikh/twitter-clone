const express = require("express");
const router = express.Router();
const authentication = require("../controller/auth"); //authentication functions from auth controller
const { fetchCurrentUser } = require("../middleware/index"); //Get current user by middleware
const userController = require("../controller/user"); //Get user Registeration login logout functions from user controller
const tweetController = require("../controller/tweet"); //Get tweet function from  tweet controller
//Get Request to Render the Home Page of App
router.get("/", (req, res) => {
  res.json("Welcome To My Twitter Clone App with MERN stack !");
});

//Post Request for User Registration
router.post("/register", authentication.register);
//Post Request for Login
router.post("/login", authentication.login);
//Post Request for Log Out
router.post("/logout", authentication.logout);
//Post Request for Refresh Route for when user Refresh the page
router.post("/refresh", authentication.refresh);
//Post Request for follow  Any User's Account or Profile....
router.post(
  "/follow/:userId",
  fetchCurrentUser,
  userController.followToUserById
);
//Post Request for like the Post by post ID
router.post(
  "/likepost/:postId",
  fetchCurrentUser,
  tweetController.likePostById
);
//Post Request for unlike the Post by post ID
router.post(
  "/unlike/:postId",
  fetchCurrentUser,
  tweetController.dislikePostById
);
//Post Request for follow  Any User's Account or Profile....
router.post(
  "/unfollow/:userId",
  fetchCurrentUser,
  userController.unfollowUserById
);
//Post Request for write a New Tweet of current Logined User by checking in Middleware
router.post("/tweet", fetchCurrentUser, tweetController.postTweet);
//Get Requets for Getting Followers of Specific User By Id
router.get("/api/v1/users/followers/:userId",userController.fetchUserFollowers);
//Get Requets for Getting Following of Specific User By Id
router.get("/api/v1/users/following/:userId",userController.fetchUserFollowing);
//Get Request for All Tweets
router.get("/api/v1/tweets", tweetController.fetchTweets);
//Get Request for Specific  Tweet By Id
router.get("/api/v1/tweets/:tweetId", tweetController.fetchTweetById);
//Get Request for All Users
router.get("/api/v1/users", userController.fetchUsers);
//Get Request for Specific User By Id
router.get("/api/v1/users/:userId", userController.fetchUserById);
//Get Request for Specific User Profile by user Id
router.get("/api/v1/profiles/:profileId", userController.fetchUserProfile);
//Post Request post new comment on specific post by given postId
router.post("/comment/:postId",fetchCurrentUser,tweetController.postNewComment);
//Get Request for fetching post comments by post Id
router.get("/api/v1/comments/:postId", tweetController.fetchCommentsByPostId);
//Request for update profile
router.post("/api/v1/users/updateUser/:userId",userController.updateUser)
module.exports = router;