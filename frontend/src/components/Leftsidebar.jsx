import React from 'react'
import { SiFurrynetwork } from "react-icons/si";
import { TbHomeFilled } from "react-icons/tb";
import { SiWpexplorer } from "react-icons/si";
import { RiNotification4Fill } from "react-icons/ri"
import { PiChatTeardropText } from "react-icons/pi";
import { HiBookmark } from "react-icons/hi2";
import { MdOutlinePerson3 } from "react-icons/md";
import {Link,NavLink} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux';

const Leftsidebar = () => {
    const navigate = useNavigate();
    const authUser = useSelector(store=>store.authUser).authUser.user;
    const logout = async()=>{
        try {
            const res = await axios.get("http://localhost:8080/api/v1/user/logout");
            toast.success(res.data.msg)
            
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
        <div className='w-1/3 border border-y-0 flex items-center justify-evenly flex-col '>
        <SiFurrynetwork className='text-purple-500 text-3xl '/>
           <div className='flex items-center flex-col -gap-4 w-full bg-gradient-to-r from-purple-800 to-violet-500 text-white py-1'>
                <h1 >{authUser?.fullname.toUpperCase()}</h1>
                <small className='text-zinc-900 -mt-1'>@{authUser?.username}</small>
           </div>
            <div className=''>   
                <ul className='flex flex-col gap-5   p-3'>
                    <NavLink to={'/'} className={`flex items-center gap-3 hover:text-purple-500 w-full`}><TbHomeFilled className='text-xl '/>Home</NavLink>
                    
                    <li className='flex items-center gap-3 hover:text-purple-500'><SiWpexplorer className='text-xl '/>Explore</li>
                    
                    <li className='flex items-center gap-3 hover:text-purple-500'><RiNotification4Fill className='text-xl '/>Notification</li>
                    
                    <li className='flex items-center gap-3 hover:text-purple-500'><PiChatTeardropText className='text-xl '/>Messages</li>
                    
                    <li className='flex items-center gap-3 hover:text-purple-500'><HiBookmark className='text-xl '/>Bookmarks</li>
                    
                    <NavLink to={'/profile'} className='flex items-center gap-3 hover:text-purple-500'><MdOutlinePerson3 className='text-xl '/>Profile</NavLink>
                </ul>
            </div>
            
            <div className='w-full flex justify-center items-center flex-col gap-1'>
                <button onClick={logout} className='w-3/4 bg-gradient-to-r from-purple-800 to-violet-500 rounded-full py-2 mx-3 text-white'>
                    Logout
                </button>
                <small className='text-m text-zinc-500'>created by 💜@VANSH💜</small>
            </div>
            
        </div>
    </>
  )
}

export default Leftsidebar