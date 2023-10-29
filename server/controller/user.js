const Tweet = require("../models/Tweet");
const User = require("../models/UserSchema");
const userController = {
  //fetch the ALl Users of App
  async fetchUsers(req, res, next) {
    try {
      const users = await User.find();
      res.status(201).json({ users });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error Not fetched !" });
    }
  },
  // fetch the specific User by user Id given parameter of API
  async fetchUserById(req, res, next) {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ _id: userId });
      res.status(201).json({ user });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error Not fetched !" });
    }
  },
  // fetch Specifc User profile which takes its User Info and as well its Tweets
  async fetchUserProfile(req, res, next) {
    try {
      const { profileId } = req.params;
      const user = await User.findOne({ _id: profileId });
      if (!user) return res.status(500).json({ error: "Not" });
      const tweets = await Tweet.find({ userId: user._id }).populate(
        "userId",
        "username profilePicture name profileImage"
      );
      res.json({ profile: { user, tweets } });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },
  // follow to any User account or profile by given userId in API parameter
  async followToUserById(req, res, next) {
    try {
      const { userId: userToFollowId } = req.params; //Get ID of user To Follow
      const currentUser = await User.findById(req.userId); //Get current User
      const userToFollow = await User.findById(userToFollowId); //Get user To Follow
      if (!userToFollow) {
        return res.status(404).json({ message: "User not found" });
      }
      //check user has follow own account
      if(userToFollowId===req.userId){
        return res.status(404).json({message:"you don't follow the own profile !"})
      }
      // Check if the user is already following the target user
      if (currentUser.following.includes(userToFollowId)) {
        return res
          .status(400)
          .json({ message: "You are already following this user" });
      }
      // Update the current user's following list and the target user's followers list
      currentUser.following.push(userToFollowId);
      userToFollow.followers.push(currentUser._id);
      await currentUser.save();
      await userToFollow.save();
      res.status(200).json({ message: "You are now following the user"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // Unfollow a user by their userId
// Unfollow a User by ID
// Unfollow a User by ID
async unfollowUserById(req, res, next) {
  try {
    const { userId: userToUnfollowId } = req.params; // Get ID of the user to unfollow
    const currentUser = await User.findById(req.userId); // Get the current user
    const userToUnfollow = await User.findById(userToUnfollowId); // Get the user to unfollow

    if (!userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current user is already following the target user
    if (!currentUser.following.includes(userToUnfollowId)) {
      return res.status(400).json({ message: "You are not following this user" });
    }

    // Find the index of userToUnfollowId in the current user's following array
    const followingIndex = currentUser.following.indexOf(userToUnfollowId);
    if (followingIndex > -1) {
      // Remove userToUnfollowId from the current user's following array
      currentUser.following.splice(followingIndex, 1);
    }

    // Find the index of the current user's ID in the userToUnfollow's followers array
    const followersIndex = userToUnfollow.followers.indexOf(currentUser._id);
    if (followersIndex > -1) {
      // Remove the current user's ID from the userToUnfollow's followers array
      userToUnfollow.followers.splice(followersIndex, 1);
    }

    await currentUser.save();
    await userToUnfollow.save();

    res.status(200).json({ message: "You have unfollowed the user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
},
  // fetch the followers List of User by given userId
  async fetchUserFollowers(req, res, next) {
    try {
      const { userId } = req.params;
      // Find the user by user ID
      const user = await User.findById(userId).populate("followers");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Extract the followers from the user object
      const followers = user.followers;
      res.status(200).json({ followers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  // fetch Following List of User by given userId
  async fetchUserFollowing(req, res, next) {
    try {
      const { userId } = req.params;
      // Find the user by user ID
      const user = await User.findById(userId).populate("following");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // Extract the followers from the user object
      const following = user.following;
      res.status(200).json({ following });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async updateUser(req,res,next){
    const {userId}=req.params;
    const {name,username,bio}=req.body;
    const user=await User.findById(userId).select("-password");
    const updated=await User.updateOne({_id:user._id},{name,username,bio});
    res.status(200).json({user})
  }
};
module.exports = userController;
