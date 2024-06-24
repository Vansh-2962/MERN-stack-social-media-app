import React from 'react'
import Leftsidebar from './Leftsidebar'
import Rightsidebar from './Rightsidebar'
import { Outlet } from 'react-router'
const Homepage = () => {
  return (
    <>
      <div className='h-screen w-full  flex justify-between'>
          <Leftsidebar />
          <Outlet/>
          <Rightsidebar />
      </div>
    </>
  )
}

export default Homepage