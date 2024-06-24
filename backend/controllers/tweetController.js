import { User } from "../models/userModel.js";
import { Tweet } from "../models/tweetModel.js";

//creating a tweet
export const createTweet = async (req, res) => {
  try {
    const { post } = req.body;
    const createdBy = req.params.id;

    const checkUser = await User.findById(createdBy);
    if (!checkUser) {
      return res.status(400).json({ msg: "User doesn't exists" });
    }
    if (post.length === 0) {
      return res.status(400).json({ msg: "Content is required" });
    }
    const newTweet = await Tweet.create({
      content: post,
      likes: [],
      createdBy,
    });
    if (newTweet) {
      return res.status(200).json({ newTweet, checkUser });
    } else {
      return res.status(400).json({ msg: "Tweet couldn't be created!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server error!" });
  }
};

//deleting a tweet
export const deleteTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const tweet = await Tweet.findByIdAndDelete(tweetId);
    if (tweet) {
      return res.status(200).json({ msg: "Tweet deleted", tweet });
    }
    return res.status(400).json({ msg: "Tweet couldn't be deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server error" });
  }
};

//get all tweets
export const getAllTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find().populate(
      "createdBy",
      "username profilePic fullname"
    );
    if (tweets) {
      return res.status(200).json(tweets);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//edit a tweet
export const editTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const { content } = req.body;
    if (!tweetId) {
      return res.status(400).json({ msg: "Tweet id is required!" });
    }
    const tweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { content },
      { new: true }
    );
    if (!tweet) {
      return res.status(400).json({ msg: "Tweet not found!" });
    }
    return res.status(200).json(tweet);
  } catch (error) {
    console.log(error);
  }
};

//like a tweet
export const likeTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const userId = req.params.authUserId;
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(400).json({ msg: "Tweet not found!" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ msg: "User not found!" });
    }

    const isLiked = tweet.likes.find(
      (like) => like.userId.toString() === userId.toString()
    );

    if (isLiked) {
      const updatedTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        { $pull: { likes: userId } },
        { new: true }
      );
      return res.status(200).json(updatedTweet);
    }

    const updatedTweet = await Tweet.findByIdAndUpdate(
      tweetId,
      { $push: { likes: userId } },
      { new: true }
    );

    return res.status(200).json(updatedTweet);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

//add followers and add following
export const addFollowers = async(req,res)=>{
  try {
    const followerId = req.params.followerId;
    const personId = req.params.personId;
    const follower = await User.findById(followerId);
    if(!follower){
      return res.status(400).json({msg:"Follower not found!"})
    }
    
    const person = await User.findById(personId);
    if(!person){
      return res.status(400).json({msg:"Person not found!"})
    }

    //update the person's followers array by adding follower's ID, but first check if the ID is already present or not

    if(person.followers.includes(followerId) && follower.following.includes(personId)){
        await User.findByIdAndUpdate(followerId,{$pull:{following:personId}})
        await User.findByIdAndUpdate(personId,{$pull:{followers:followerId}})
        return res.status(400).json({msg:"Unfollowed"});
    }
    else{
      //now push the ID's in their respective followers and following arrays
        await User.findByIdAndUpdate(followerId,{$push:{following:personId}})
        await User.findByIdAndUpdate(personId,{$push:{followers:followerId}})
    }
 
    return res.status(200).json(person);
  } catch (error) {
    console.log(error);
    res.status(400).json({msg:"Internal Server Error!"});
  }
}


