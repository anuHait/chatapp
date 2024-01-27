"use client";
import React from 'react'
import { useSession } from 'next-auth/react'
const page = () => {
    const { data: session, status } = useSession();
    console.log(session);
  return (
    <div>
      Hello chats page
    </div>
  )
}

export default page
