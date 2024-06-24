import React, { useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useDispatch} from 'react-redux'
import { setAuthUser } from '../redux/userSlice'

const Login = () => {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler =async (e)=>{
    e.preventDefault()
   
      try {
        if(!username || !password){
          toast.error("Please fill all the fields")
          return
        }
        const res = await axios.post('http://localhost:8080/api/v1/user/login',{
          username,password
        },{
            withCredentials:true,
            method:'POST',
            headers: {
              'Content-Type': 'application/json'
          }})
        // console.log(res)
        
        toast.success("Welcome " + res.data.user.fullname.toUpperCase())
        setUsername('');
        setPassword('');
        dispatch(setAuthUser(res.data))
        navigate("/")
        
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error("Incorrect username or password");
        } else {
          // Log and handle other errors (like network issues)
          console.error(error);
          toast.error("An error occurred. Please try again.");
        }
    }
  }

  return (
    <>
      <form onSubmit={submitHandler} >
            <div className='h-screen  w-full flex items-center  justify-center'>
                <div className='w-[20rem] h-[20rem] left-[45rem] top-[20rem] opacity-55 bg-blue-400 rounded-full absolute z-[-1]'>
                  <div className='w-[18rem] h-[18rem] bg-purple-500 rounded-full'></div>
                </div>
                <div className='p-4  border-r-2 border-b-2 border-purple-100 bg-zinc-100 opacity-85 box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25) flex-col gap-4 bg-transparent  rounded-md flex items-start justify-center '>
                    <h1 className='font-bold text-3xl text-zinc-800 p-2 rounded-full'>Log<span className='text-purple-500'>In</span></h1>
                    <hr/>
                   
                    <input type="text" placeholder='User name' name='username' className='py-1 px-3 outline-none w-full' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    
                    <input type="password" placeholder='Password' name='password' className='py-1 px-3 outline-none w-full' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                   
                    <button type='submit' className='w-full p-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold mt-3' >Login</button>
                    <Link className='text-sm' to={'/signup'}>Want to create a new account?  <span className='text-purple-600'>Create here</span> </Link>

                </div>
            </div>
        </form>
    </>
  )
}

export default Login