"use client";
import React from 'react'
import Contacts from '@components/Contacts';
import ChatList from '@components/ChatList';
import { useSession } from 'next-auth/react'
const page = () => {
    const { data: session, status } = useSession();
    console.log(session);
  return (
    <div className='m-5 flex flex-row gap-5'>
     <div className='w-1/3 max-lg:w-1/2 max-md:w-full border-2'>
      
      <ChatList/>
     </div>

     <div className='w-1/3 max-lg:w-1/2 max-md:w-full border-2'>
     <Contacts/>     </div>
    </div>
  )
}

export default page
