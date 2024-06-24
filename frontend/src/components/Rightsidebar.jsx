import React from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'

const Rightsidebar = () => {
  const [otherUsers, setOtherUsers] = useState([])
  const [isFollowing,setIsFollowing] = useState(false);
  const [followedUsers,setFollowedUsers] = useState([]);
  const dispatch = useDispatch()
  const authUser = useSelector((store) => store.authUser).authUser.user

  useEffect(() => {
    const getOtherUsers = async () => {
      try {
        const otherUsers = await axios.get(
          `http://localhost:8080/api/v1/user/${authUser._id}`,
        )
        if (otherUsers) {
          dispatch(setOtherUsers(otherUsers.data));
          setOtherUsers(otherUsers.data)
          console.log(otherUsers)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getOtherUsers()
  }, [authUser])


  const addFollowing = async (user, e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/tweet/follow/${authUser?._id}/${user?._id}`, {}, {
        withCredentials: true
      });
      setIsFollowing(true);
      toast.success(`You are now following ${user?.fullname}`);
      if (res.status === 200) {
        setIsFollowing(true);
        setFollowedUsers([...followedUsers, user?._id])
        console.log(followedUsers);
      }
    } catch (error) {
      // console.log(user);
      toast.success(`You unfollowed ${user?.fullname}`);
      setIsFollowing(false);
      setFollowedUsers(followedUsers.filter((id) => id !== user?._id))
    }
  };

  useEffect(()=>{
    console.log(isFollowing)
  },[isFollowing])

  return (
    <>
      <div className="w-1/3 flex flex-col border border-y-0 items-center justify-start gap-5 overflow-auto">
        <div className="w-[90%] mt-3 ">
          <input
            type="search"
            placeholder="Search"
            className="border-2 border-purple-400 w-full rounded-full p-2 outline-none "
          />
        </div>

        <div className="w-full pt-8 mb-3 flex flex-col items-center justify-center">
          <div className="w-full text-2xl px-3 ">
            <h3 className='md:text-2xl'>
              Who to <span className="text-purple-800 ">follow</span>
            </h3>
          </div>

          {otherUsers?.map((otheruser) => {
            return (
              <div key={otheruser?._id} className="w-full mt-5 pt-2 p-2 flex gap-4 items-start cursor-pointer hover:bg-purple-300 rounded-md  justify-between">
                <div className="flex gap-2">
                  <div className="h-10 w-10 border-2 border-black bg-black rounded-full overflow-hidden">
                    <img src={`http://localhost:8080/${otheruser?.profilePic}`} alt="" />
                  </div>
                  
                  <div className="flex items-start flex-col">
                    <h5 className="text-sm text-nowrap">{otheruser?.fullname}</h5>
                    <small className="text-zinc-500 ">
                      @{otheruser?.username}
                    </small>
                  </div>
                
                </div>
                <button onClick={(e)=>addFollowing(otheruser,e)} className={`border-2 p-1 border-purple-500 rounded-full px-4 hover:bg-gradient-to-r from-purple-800 to-violet-500 hover:text-white text-purple-500 text-sm ${followedUsers?.includes(otheruser?._id) ? 'bg-gradient-to-r from-purple-800 to-violet-500  text-white' : ''}`}>
                  {followedUsers?.includes(otheruser?._id) ? "Following" : "Follow"}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Rightsidebar
