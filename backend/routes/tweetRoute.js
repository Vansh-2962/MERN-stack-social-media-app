import express from 'express'
import {createTweet,deleteTweet,getAllTweets,editTweet,likeTweet,addFollowers} from '../controllers/tweetController.js'
import isAuthenticated from '../middlewares/user.auth.js'

const router = express.Router();
router.route('/createTweet/:id').post(isAuthenticated,createTweet);
router.route('/deleteTweet/:id').delete(deleteTweet);
router.route('/editTweet/:id').post(isAuthenticated,editTweet);
router.route('/getAllTweets').get(getAllTweets);
router.route('/likeTweet/:id/:authUserId').post(likeTweet);
router.route('/follow/:followerId/:personId').post(addFollowers);

export default router;


