import React, { useEffect, useState } from 'react'
import { GrGallery } from 'react-icons/gr'
import { BiSolidWinkSmile } from 'react-icons/bi'
import Post from './Post'
import axios from 'axios'
import { useSelector,useDispatch } from 'react-redux'
import setTweetPost from '../redux/userSlice'
import Tweets from './Tweets'
import toast from 'react-hot-toast'
import { TbHomeFilled } from "react-icons/tb";
import { useNavigate } from 'react-router'
const Home = () => {
  const [post, setPost] = useState('');
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [tweets,setTweets] = useState([]);
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authUser = useSelector((store) => store.authUser).authUser.user
   //getting all tweets 
   useEffect(()=>{
    const getTweets = async()=>{
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:8080/api/v1/tweet/getAllTweets');
        // console.log(res.data);
        setTweets(res.data)
        console.log(tweets);
      } catch (error) {
        console.log(error)
      }finally{
        setLoading(false);
      }
    }
    getTweets();
  },[authUser])


  useEffect(() => {
    const getUser = async () => {
      try {
        // Get my updated profile data back from db
        const res = await axios.get(`http://localhost:8080/api/v1/user/getUser/${authUser._id}`);
        setUser(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [authUser]);

  async function postHandler(e) {
    e.preventDefault()
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/tweet/createTweet/${authUser._id}`,
        { post },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      console.log(res.data)
      setPosts((prevPosts) => [res.data.newTweet, ...prevPosts])
      setPost('')
      setUser(res.data.checkUser)
      console.log(posts)
      console.log(post)
      dispatch(setTweetPost(res.data))
    } catch (error) {
      console.error(error)
      toast.error(error.response.data.msg)
    }
  }

  const openProfile = ()=>{
    navigate('/profile');
  }

  return (
    <>
      <div className="w-3/4 border h-screen bg-purple-100 overflow-auto">
        <div className="w-full flex flex-col bg-zinc-200 ">
          
          <h1 className="w-full p-2  bg-gradient-to-b flex items-center gap-2 from-purple-800 to-violet-500 text-white">
            <TbHomeFilled/>
            Home
          </h1>

          <div className="bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  flex p-3 gap-3 items-center bg-gradient-to-b from-purple-900 to-zinc-100">
           
            <div className="md:h-20 md:w-[5.8rem] sm:h-7 sm:w-9 overflow-hidden border-2  border-purple bg-black rounded-full hover:scale-150 duration-500" onClick={openProfile}>
              <img src={`http://localhost:8080/${user?.profilePic}`} alt="" />
            </div>
            
            <form onSubmit={postHandler} className="w-full ">
              <textarea name="" id=""  placeholder="What's Going on?"
                className="w-full p-3 border-zinc-300 outline-none border-2 bg-zinc-100 rounded-lg"
                value={post}
                onChange={(e) => setPost(e.target.value)}></textarea>
              <div className="flex px-3 mt-3 items-center gap-2 justify-between">
                <div className="flex px-3 mt-0 items-center gap-2 ">
                  
                  <input type="file" name="file" id="file" className='opacity-0 w-[0.1px] h-[0.1px] overflow-hidden absolute -z-[-1]' />
                  <label htmlFor="file"><GrGallery className="text-zinc-800 hover:text-purple-500 cursor-pointer" /></label>
                  
                  <BiSolidWinkSmile className="text-zinc-800 text-xl hover:text-purple-500 cursor-pointer" />
                </div>
                <button className="text-white  border-2 rounded-xl px-4  bg-gradient-to-r from-purple-900 to-violet-500 py-2 ">
                  POST
                </button>
              </div>
            </form>
          </div>

          {
            loading === true ? 
          <div className='w-full h-screen flex items-start justify-center'>
             <div role="status">
                <svg aria-hidden="true" className="inline w-16 h-16 text-gray-200 animate-spin dark:text-gray-300 fill-purple-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div> 
            : 
            (
              tweets.reverse().map((tweet)=>(
              <Tweets key={tweet?._id} tweet={tweet} user={user}/>
              ))
            
            )
            
           
          }


          {
          posts.reverse().map((post) => (
            <Post key={post?._id} post={post} user={user} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
