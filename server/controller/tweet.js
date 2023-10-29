const Tweet = require("../models/Tweet");
const Comment = require("../models/Comments");
const tweetController = {
  async fetchTweets(req, res, next) {
    try {
      const tweets = await Tweet.find().populate(
        "userId",
        "username profilePicture name profileImage"
      );
      res.status(201).json({ tweets });
    } catch (error){
      res.status(500).json({ message:"Internal Server Error Not fetched !" });
    }
  },
  async fetchTweetById(req, res, next) {
    try {
      const { tweetId } = req.params;
      const tweet = await Tweet.findOne({ _id: tweetId }).populate(
        "userId",
        "username profilePicture name"
      );
      res.json({ tweet });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error Not fetched !" });
    }
  },
  async likePostById(req, res, next) {
    try {
      const { postId } = req.params;
      const post = await Tweet.findById(postId);
      if (!post) {
        res.status(404).json({ message: "post not found!" });
      }
      post.likes.push(req.userId);
      await post.save();
      res.status(200).json({ message: "succesfully Liked !"});
    } catch (error) {
      res.status(500).json({ message: "unathorized" });
    }
  },
  async dislikePostById(req, res, next) {
    try {
      const { postId } = req.params;
      const post = await Tweet.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Post not found!" });
      }
      // Find the index of the user's ID in the likes array
      const userIndex = post.likes.indexOf(req.userId);
      // Check if the user has already liked the post
      if (userIndex === -1) {
        return res.status(400).json({ message: "You haven't liked this post." });
      }
      // Remove the user's ID from the likes array
      post.likes.splice(userIndex, 1);
      await post.save();
      return res.status(200).json({ message: "Successfully Disliked!" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async unLikePostById(req, res, next) {
    try {
      const { postId } = req.params;
      const post = await Tweet.findById(postId);
      if (!post) {
        res.status(404).json({ message: "Post not found!" });
      }
      const userLiked = post.likes.includes(req.userId);
      if (!userLiked) res.status(404).json({ message: "user not found from list of list !"});
        // User has already liked the post, so unlike it.
        // post.likes = post.likes.filter((userId) => userId !== req.userId);
        // await post.save();
        const elementToRemove = req.userId;
        const filteredArr = post.likes.filter(item => item !== elementToRemove);
        res.status(200).json({list:post.likes,filteredArr,elementToRemove});
    } catch (error) {
      res.status(500).json({ message: "Unauthorized" });
    }
  },

  async postTweet(req, res, next) {
    try {
      const { tweetText } = req.body;
      const abc = req.userId;
      const newTweet = new Tweet({ userId: abc, tweetText });
      console.log(abc, "user Id for Tweeting");
      const tweet = await newTweet.save();
      res.json({ tweet });
    } catch (error) {
      return res.status(500).json({ mesage: "Error ! Tweet not posted " });
    }
  },
  async postNewComment(req, res, next) {
    try {
      const { postId } = req.params;
      const { commentText } = req.body;
      const userId = req.userId;
      const post=await Tweet.findById(postId);
      post.comments.push(userId);
      const newComment = new Comment({
        commentText,
        userId: userId,
        postId: postId,
      });
      //update comment array in Tweet
     
      const comment = await newComment.save();
      await post.save()
      res.status(200).json({ comment });
    } catch (error) {
      res.status(500).json({ message: "Internal Error!", error: error });
    }
  },
  async fetchCommentsByPostId(req,res,next) {
    try {
      const { postId } = req.params;
      const comments = await Comment.find({ postId }).populate("userId");
      res.status(200).json({ comments });
    } catch (error) {
      res.status(404).json({ error });
    }
  },
};
module.exports = tweetController;
