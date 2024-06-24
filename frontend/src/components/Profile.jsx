import React, { useState, useEffect } from 'react'
import {useSelector} from 'react-redux'
import { FaRegEdit } from "react-icons/fa";
import { Link,useLocation } from 'react-router-dom';
import Editprofile from './Editprofile';
import axios from 'axios'
import { setAuthUser } from '../redux/userSlice';

const Profile = () => {
  const [user,setUser] = useState({});
  const location = useLocation();
  const stateData = location.state;
  
  const authUser = useSelector(store=>store.authUser).authUser.user
  try {
    
    useEffect(()=>{
      const getUser = async ()=>{
        //get my updated profile data back from db
        const res = await axios.get(`http://localhost:8080/api/v1/user/getUser/${authUser._id}`)
        setUser(res.data)
      }
      getUser();
    },[authUser,user])

  } catch (error) {
    console.log(error)
  }
  

  return (
    <div className="w-3/4 border border-y-0 relative">
      <div className="h-1/3 w-full bg-gradient-to-r from-purple-500 to-purple-900 ">
        {/* image */}

        <div className="h-[7rem] w-[7rem] rounded-full  mt-[9rem] ml-4 border-white border-2 absolute bg-black overflow-hidden bg-center object-center">
          <img src={`http://localhost:8080/${user?.profilePic}`} />
        </div>
      </div>
      
      <div className='mt-[5rem] p-4 flex flex-col gap-4'>
        <div className='flex flex-col -gap-2 leading-3'>
          <span className='text-semibold text-xl font-bold'>{user?.fullname}</span>
          <small className='text-zinc-500 '>@{user?.username}</small>
        </div>

       <div className='flex items-end justify-between '>
         <p className='text-zinc-700'>{user?.bio}</p>
         <span className='cursor-pointer rounded-full text-xl  bg-gradient-to-r from-purple-500 to-purple-900hover:bg-cyan-600 p-2' >
         <Link to={{pathname:`/editprofile/${user._id}`,state:user}}><FaRegEdit />
         </Link>
         </span>  
       </div>

        <div className='w-full flex gap-8 pt-4'>
          <p className='text-zinc-800 border-b-2 border-purple-500'><span className='text-black font-bold'>{user?.followers?.length}</span> Followers</p>
          <p className='text-zinc-800 border-b-2 border-purple-500'><span className='text-black font-bold'>{user?.following?.length}</span> Following</p>
        </div>
      </div>

    </div>
  )
}

export default Profile
