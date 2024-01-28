
"use client"

import ChatDetails from "@components/ChatDetails"
import ChatList from "@components/ChatList"
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { useEffect } from "react"

const ChatPage = () => {
  const {chatId}=useParams();
  const {data:session}=useSession();
  const currentUser=session?.user;
  return (
    <div className="flex flex-row gap-10 m-5">
      <div className="w-1/3 max-lg:hidden"><ChatList currentChatId={chatId}/></div>
      <div className="w-2/3 max-lg:w-full border-2 p-4 rounded-lg shadow-md bg-gray-200"><ChatDetails chatId={chatId}/></div>
    </div>
  )
}

export default ChatPage
