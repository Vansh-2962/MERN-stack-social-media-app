import React, { useEffect, useState } from 'react'
import { PiHeart } from "react-icons/pi";
import { FaComment } from "react-icons/fa6";
import { AiTwotoneDelete } from "react-icons/ai";
import axios from 'axios';
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux';
const Post = ({post,user}) => {
    const [time,setTime] = useState(null);
    const [deletedPost,setdeletedPost] = useState(post);
    const authUser = useSelector(store=>store.authUser).authUser.user
    
    const deletePost = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.delete(`http://localhost:8080/api/v1/tweet/deleteTweet/${post?._id}`)
            // window.location.reload()
            // setdeletedPost()
            console.log(res);
            toast.success(res.data.msg)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        console.log(deletedPost);
        console.log(post);
    },[deletedPost])


    // to set time in seconds
    useEffect(()=>{
        const tweetCreationTime = post?.createdAt;
        const date = new Date(tweetCreationTime);
        const seconds = date.getTime()/1000;
        // const elapsedTime = Math.floor((Date.now() - date.getTime())/1000);
        const elapsedTime = `${date.getHours()}:${date.getMinutes()}`
        // console.log(date.getTime())
        setTime(elapsedTime);
    },[])


  return (
   <>
        <div className='w-full pt-3 px-2 flex gap-3 justify-start border-t-2'>
            <div className='md:h-10 md:w-11 sm:h-7 sm:w-8 bg-black overflow-hidden rounded-full '>
                <img src={`http://localhost:8080/${user?.profilePic}`} alt="" />
            </div>
            <div className='flex w-full flex-col gap-2 '>
                <p className='font-semibold text-sm'>{user?.fullname}<small className='text-zinc-500'> @{user?.username} . </small> <span className='text-sm text-zinc-400'>{time}</span> </p>
                <p className='text-sm text-zinc-700'>{post?.content}</p>
                <div className='w-full py-2 flex gap-8 justify-between '>
                    <div className='flex gap-8'>
                        <p className='flex items-center gap-1 text-zinc-800 hover:bg-pink-300 rounded-full px-2 cursor-pointer'><PiHeart /><small>0</small></p>
                        <p className='flex items-center gap-1 text-zinc-800 hover:bg-yellow-300 px-3 rounded-full cursor-pointer'><FaComment /><small>0</small></p>
                       
                    </div>
                    <span onClick={deletePost} className='hover:bg-red-500 p-1 rounded-full cursor-pointer'>{
                        authUser?._id === user?._id ? <AiTwotoneDelete /> : ''
                    }</span>
                </div>
            </div>
        </div>
   
   </>
  )
}

export default Post