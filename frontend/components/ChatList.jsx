"use client";

import { useSession } from "next-auth/react";
import { use, useEffect, useState } from "react";
import Loader from './Loader'

const ChatList = () => {
    const { data: sessions } = useSession();
  const currentUser = sessions?.user;

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <div>
    <input
           placeholder="Search chat..."
           className="input-search"
           value={search}
           onChange={(e) => setSearch(e.target.value)}
         />
     {/*
         loading ? <Loader/> : ( <div className="chat-list">
         <input
           placeholder="Search chat..."
           className="input-search"
           value={search}
           onChange={(e) => setSearch(e.target.value)}
         />
   
         <div className="chats">
           {chats?.map((chat, index) => (
             <ChatBox
               chat={chat}
               index={index}
               currentUser={currentUser}
               currentChatId={currentChatId}
             />
           ))}
         </div>
       </div>)
           */} 
    </div>
  )
}

export default ChatList
