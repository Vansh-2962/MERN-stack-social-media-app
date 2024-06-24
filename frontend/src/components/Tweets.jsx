import React from 'react'
import { PiHeart } from "react-icons/pi";
import { FaComment } from "react-icons/fa6";
import { AiTwotoneDelete } from "react-icons/ai";
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
const Tweets = ({tweet,user}) => {
    
    const [time,setTime] = useState(null);
    const [isLike,setIsLike] = useState(false);
    const [likecount,setLikeCount] = useState(0);
    const [isComment,setIsComment] = useState(false);

    const authUser = useSelector(store=>store.authUser).authUser.user
    useEffect(()=>{
        const tweetCreationTime = tweet?.createdAt;
        const date = new Date(tweetCreationTime);
        const elapsedTime = `${date.getHours()}:${date.getMinutes()}`
        setTime(elapsedTime);
    },[])

    const likeTweet = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/tweet/likeTweet/${tweet?._id}/${authUser?._id}`,{},{
                withCredentials:true,
                method:'POST',
                headers: {
                  'Content-Type': 'application/json'
            }})
                if(res){
                    setIsLike(!isLike);
                    setLikeCount(prev => prev+1);
                    console.log(res.data);
                }
        } catch (error) {
            console.log(error)
            // setLikeCount(prevcount=>prevcount-1)
        }
    }

    function addComment(){
        setIsComment(!isComment)
    }
    
  return (
   <>
    <div className='w-full pt-3 px-2 flex gap-3 justify-start border-t-2 border-zinc-300 bg-zinc-200 '>
            
            <div className='md:h-10 md:w-11 sm:h-7 sm:w-8 bg-transparent border-2 border-black overflow-hidden rounded-full' >
                <img src={`http://localhost:8080/${tweet?.createdBy?.profilePic}`} alt="" />
            </div>

            <div className='flex w-full flex-col gap-2 '>
                <p className='font-semibold text-sm'>{tweet?.createdBy?.fullname}<small className='text-zinc-500'> @{tweet?.createdBy?.username} . </small> <span className='text-sm text-zinc-400'>{time}</span> </p>
                <p className='text-sm text-zinc-700'>{tweet?.content}</p>
                <div className='w-full py-2 flex gap-8 justify-between '>
                    
                    <div className='flex gap-8 w-full '>
                       
                        <p onClick={likeTweet} className='flex items-center gap-1 text-zinc-800 hover:bg-pink-300  rounded-full px-2 cursor-pointer'><PiHeart />
                        <small>
                            {likecount
                            || tweet?.likes?.length}
                        </small></p>

                        <p  className='flex items-center gap-1 text-zinc-800 hover:bg-yellow-300 px-3 rounded-full cursor-pointer'><FaComment /><small>0</small></p>
                        <div onClick={addComment} className='flex w-full gap-3'>
                            {
                                isComment ? <div className='flex gap-3 w-full'>
                                    <input type="text" placeholder='Comment..' className={` w-full border-2 border-zinc-400 outline-none rounded-lg px-3`}/>
                                    <button className='bg-purple-400 rounded-full px-3 text-sm'>Comment</button>
                                </div> : ''
                            }
                            

                        </div>
                    </div>
                    
                    <span className='hover:bg-red-500 p-1 rounded-full cursor-pointer'>{
                        authUser?._id === tweet?.createdBy?._id ? <AiTwotoneDelete /> : ''
                    }</span>
                </div>
            </div>
        </div>
   </>
  )
}

export default Tweets