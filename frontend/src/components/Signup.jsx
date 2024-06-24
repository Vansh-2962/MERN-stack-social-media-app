import React, { useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Signup = () => {
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate= useNavigate(); 
  const onSubmitHandler = async(e)=>{
    e.preventDefault()
    try {
      if(password === confirmPassword){
        const res = await axios.post('http://localhost:8080/api/v1/user/register',{fullname,username,email,password,confirmPassword},{withCredentials:true})
        // console.log(res);  
        navigate('/login')
        toast.success("Account created successfully")
        setUsername('');
        setFullname('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }
   } catch (error) {
    console.log(error)
   }
}
  return (
    <>
        <form onSubmit={onSubmitHandler}>
            <div className='h-screen w-full flex items-center  justify-center'>
                <div className='w-[25rem] h-[25rem] bg-purple-400 rounded-full absolute z-[-1] opacity-50 left-[20rem] bottom-[15rem] flex items-end justify-end'>
                  <div className='w-[20rem] h-[20rem] bg-blue-300 rounded-full opacity-75 '></div>
                </div>
                <div className='p-4 flex-col gap-4 bg-zinc-100 opacity-85 rounded-md flex items-start justify-center box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)'>
                    <h1 className='font-bold text-3xl text-zinc-800 p-2       rounded-full'>Create new <span className='text-purple-500'>account</span></h1>
                    <hr/>
                    
                    <input type="text" placeholder='Full name' name='fullname' className='py-1 px-3 outline-none w-full' value={fullname} onChange={(e)=>{setFullname(e.target.value)}}/>
                    
                    <input type="text" placeholder='User name' name='username' className='py-1 px-3 outline-none w-full' value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    
                    <input type="email" placeholder='email' name='email' className='py-1 px-3 outline-none w-full' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    
                    <input type="password" placeholder='Password' name='password' className='py-1 px-3 outline-none w-full' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    
                    <input type="password" placeholder='Confirm Password' name='confirmPassword' className='py-1 px-3 outline-none w-full' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    
                    <button type='submit' className='w-full p-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold mt-3' >Create account</button>
                    <Link className='text-sm' to={'/login'}>Already have an account? <span className='text-purple-600'>Go to Login</span> </Link>

                </div>
            </div>
        </form>
    </>
  )
}


export default Signup