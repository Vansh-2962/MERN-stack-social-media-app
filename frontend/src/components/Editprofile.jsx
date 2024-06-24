import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MdEdit } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { setAuthUser } from '../redux/userSlice';

const Editprofile = () => {
  const [bio, setBio] = useState('');
  const [file, setFile] = useState();
  const [user, setUser] = useState();

  const navigate = useNavigate();
  const { id } = useParams();
  const authUser = useSelector(store => store.authUser).authUser.user;

  useEffect(() => {
    if (authUser) {
      setBio(authUser.bio || '');
    }
  }, [authUser]);

  const edit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', bio);
    if(file){
      formData.append('file', file);
    }

    try {
      const res = await axios.put(`http://localhost:8080/api/v1/user/edit/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setBio('');
      setUser(res.data.user);
      toast.success('Profile updated');
      navigate('/profile', { state: user});
    } catch (error) {
      console.error(error);
      toast.error('Error updating profile');
    }
  };

  return (
    <div className='w-3/4'>
      <form className='h-full bg-gradient-to-r from-purple-500 to-purple-900 flex flex-col gap-3' onSubmit={edit} encType="multipart/form-data">
        <div className='w-full py-3 flex flex-col gap-3 items-center justify-center'>
          <div className='h-[9rem] bg-black w-[9rem] rounded-full cursor-pointer flex items-center text-zinc-600 justify-center'>
            {/* Add image preview here if needed */}
            <img src={``} alt="" />
          </div>
          <input
            className='text-[0.8rem] cursor-pointer w-37 font-bold bg-white rounded-full'
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className='flex flex-col items-center'>
            <h1 className='text-xl text-white'>{authUser?.fullname}</h1>
            <small className='text-zinc-300'>@{authUser?.username}</small>
          </div>
        </div>
        <textarea
          cols="30"
          rows="5"
          className='w-[95%] border-b-2 bg-purple-200 border-zinc-400 rounded-lg ml-3 p-3'
          placeholder='Add your bio..'
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <div className='w-full flex justify-end px-6'>
          <button type='submit' className='bg-purple-500 px-3 rounded-full text-white border-purple-600 border flex items-center gap-1'>
            Edit <MdEdit />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Editprofile;
